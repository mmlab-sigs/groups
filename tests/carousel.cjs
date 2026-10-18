// Run against a served Jekyll build: node tests/carousel.cjs <page-url>
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const url = process.argv[2];
if (!url) throw new Error('Pass the URL of the built group homepage.');

(async () => {
    const browser = await chromium.launch({
        headless: true,
        channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || undefined,
    });
    try {
        for (const width of [1280, 390]) {
            const page = await browser.newPage({ viewport: { width, height: 900 } });
            await page.route('**/*', route =>
                new URL(route.request().url()).origin === new URL(url).origin
                    ? route.continue() : route.abort());
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await page.locator('#teamCarousel').scrollIntoViewIfNeeded();
            await page.waitForFunction(() => [...document.querySelectorAll('#teamCarousel img')]
                .every(image => image.getAttribute('src')));
            await page.locator('#teamCarousel img').evaluateAll(images => {
                images.forEach(image => { image.loading = 'eager'; });
                return Promise.all(images.map(image => image.decode()));
            });

            const position = () => page.locator('#carouselTrack').evaluate(track =>
                new DOMMatrix(getComputedStyle(track).transform).m41);
            const visiblePhoto = () => page.locator('#teamCarousel').evaluate(container => {
                const left = container.getBoundingClientRect().left;
                return [...container.querySelectorAll('img')].find(image =>
                    Math.abs(image.getBoundingClientRect().left - left) < 1)?.getAttribute('src');
            });
            const photos = await page.locator('#carouselTrack img').evaluateAll(images =>
                images.filter(image => image.getAttribute('aria-hidden') !== 'true')
                    .map(image => image.getAttribute('src')));
            assert.equal(photos.length, 3);
            assert.equal(await page.locator('#carouselDots > *').count(), 3);

            async function step(direction, expectedPhoto) {
                const before = await position();
                await page.locator(direction === 1 ? '#carouselNext' : '#carouselPrev').click();
                await page.waitForTimeout(120);
                const during = await position();
                assert.ok(direction === 1 ? during < before : during > before,
                    `${width}px: ${direction === 1 ? 'next' : 'previous'} must keep its direction, ${before} -> ${during}`);
                await page.waitForTimeout(550);
                assert.equal(await visiblePhoto(), photos[expectedPhoto]);
                const activeDot = await page.locator('#carouselDots').evaluate(dots =>
                    [...dots.children].findIndex(dot => dot.style.transform === 'scale(1.2)'));
                assert.equal(activeDot, expectedPhoto);
            }

            // Multiple complete loops exercise both cloned boundary slides.
            for (let i = 1; i <= 6; i++) await step(1, i % 3);
            for (let i = 1; i <= 6; i++) await step(-1, (3 - i % 3) % 3);

            for (const index of [2, 0, 1]) {
                await page.locator('#carouselDots > *').nth(index).click();
                await page.waitForTimeout(650);
                assert.equal(await visiblePhoto(), photos[index]);
            }
            // A burst must settle on a valid slide and leave the controls usable.
            await page.locator('#carouselNext').evaluate(button => {
                for (let i = 0; i < 10; i++) button.click();
            });
            await page.waitForTimeout(650);
            assert.ok(photos.includes(await visiblePhoto()));
            await page.locator('#carouselDots > *').nth(0).click();
            await page.waitForTimeout(650);
            await step(-1, 2);
            await step(1, 0);
            console.log(`PASS: ${width}px, both loop directions, dots and rapid clicks`);
            await page.close();
        }
    } finally {
        await browser.close();
    }
})().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
