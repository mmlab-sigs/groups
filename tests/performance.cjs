// Run against a served Jekyll build; add --check to enforce loading/animation budgets.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const url = process.argv[2];
if (!url) throw new Error('Pass the URL of the built group homepage.');

(async () => {
    const browser = await chromium.launch({
        headless: true, channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || undefined,
    });
    try {
        const page = await browser.newPage({
            viewport: { width: Number(process.env.VIEWPORT_WIDTH) || 1280, height: 900 },
        });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.route('**/*', route =>
            new URL(route.request().url()).origin === new URL(url).origin
                ? route.continue() : route.abort());
        await page.addInitScript(() => {
            window.__particleFrames = 0;
            const clear = CanvasRenderingContext2D.prototype.clearRect;
            CanvasRenderingContext2D.prototype.clearRect = function (...args) {
                if (this.canvas.id === 'particle-canvas') window.__particleFrames++;
                return clear.apply(this, args);
            };
        });
        const cdp = await page.context().newCDPSession(page);
        await cdp.send('Performance.enable');
        await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
        const taskTime = async () => (await cdp.send('Performance.getMetrics'))
            .metrics.find(metric => metric.name === 'TaskDuration').value;
        const frames = () => page.evaluate(() => window.__particleFrames);
        async function sample() {
            const before = await taskTime();
            const initialFrames = await frames();
            await page.waitForTimeout(3000);
            return { taskMs: Math.round(((await taskTime()) - before) * 1000),
                particleFrames: (await frames()) - initialFrames };
        }
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1500);
        const hero = await sample();
        const initialMedia = await page.evaluate(() => ({
            bytes: performance.getEntriesByType('resource').reduce((sum, r) => sum + r.transferSize, 0),
            videos: [...document.querySelectorAll('video')].filter(v => !!v.currentSrc).length,
            playing: [...document.querySelectorAll('video')].filter(v => !v.paused).length,
        }));
        await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
        await page.locator('#teamCarousel').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        const offscreen = await sample();
        const offscreenPlaying = await page.locator('video').evaluateAll(videos =>
            videos.filter(v => !v.paused).length);
        console.log(JSON.stringify({ hero, initialMedia, offscreen, offscreenPlaying, errors }, null, 2));

        if (process.argv.includes('--check')) {
            assert.equal(initialMedia.videos, 0, 'Below-fold videos must not load at the hero');
            assert.equal(initialMedia.playing, 0);
            assert.ok(initialMedia.bytes < 1_000_000, 'Initial media must stay under 1 MB');
            assert.equal(offscreen.particleFrames, 0, 'Offscreen canvas must stop drawing');
            assert.equal(offscreenPlaying, 0, 'Offscreen videos must pause');
            assert.deepEqual(errors, []);
            await page.locator('video').first().scrollIntoViewIfNeeded();
            await page.waitForFunction(() => !document.querySelector('video').paused);
            await page.locator('#teamCarousel').scrollIntoViewIfNeeded();
            await page.waitForFunction(() => [...document.querySelectorAll('video')].every(v => v.paused));
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.waitForTimeout(500);
            assert.ok((await sample()).particleFrames > 0, 'Canvas must resume at the hero');
            await page.emulateMedia({ reducedMotion: 'reduce' });
            await page.waitForTimeout(100);
            assert.equal((await sample()).particleFrames, 0, 'Reduced motion must stop the canvas');
            assert.equal(await page.locator('video').evaluateAll(videos => videos.filter(v => !v.paused).length), 0);
            console.log('PASS: initial loading, offscreen pause, viewport resume, reduced motion');
        }
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
