# 网站维护工作流 / Website Maintenance Workflow

## 项目概览

本项目是 **Self-Evolving Embodied Agents Group** 的学术主页，基于 Jekyll 构建，部署于 GitHub Pages。

- **线上地址**: https://N50s.github.io/Self-Evolving-Embodied-Agents-Group/
- **仓库地址**: https://github.com/N50s/Self-Evolving-Embodied-Agents-Group

---

## 目录结构

```
├── index.html              # 首页（Hero + About + Research + News + Publications + Team + Join Us）
├── publications.html       # 全部成果页
├── _config.yml             # Jekyll 站点配置（标题、baseurl 等）
├── _layouts/
│   └── default.html        # 页面布局模板（导航栏、样式、语言切换、页脚）
├── _data/
│   ├── news.yml            # 新闻动态数据
│   └── publications.yml    # 论文成果数据
├── assets/images/
│   ├── publications/       # 论文配图
│   └── team/               # 团队成员头像
├── Gemfile                 # Ruby/Jekyll 依赖
├── _site/                  # Jekyll 自动生成的输出（勿手动编辑）
├── _archive/               # 已归档的临时文件（可安全删除）
└── WORKFLOW.md             # 本文件
```

---

## 常见维护操作

### 1. 本地预览

```bash
bundle exec jekyll serve --livereload
```

浏览器访问 http://127.0.0.1:4000/Self-Evolving-Embodied-Agents-Group/，修改文件后页面会自动刷新。

### 2. 添加新闻

编辑 `_data/news.yml`，在文件顶部添加一条：

```yaml
- date: "2026-03"
  en_html: "Your English news content here."
  zh_html: "中文新闻内容。"
```

### 3. 添加论文

**步骤一**：将论文配图放入 `assets/images/publications/`

**步骤二**：编辑 `_data/publications.yml`，添加一个条目：

```yaml
- title: "Paper Title"
  venue_html: "<strong>CVPR</strong> 2026"
  date: "2026-06-01"
  image: "paper_image.png"
  selected: true          # true 则显示在首页精选列表
  abstract: "Abstract text..."
  links:
    - label: "PDF"
      url: "https://arxiv.org/abs/xxxx.xxxxx"
    - label: "Code"
      url: "https://github.com/xxx/xxx"
```

### 4. 添加团队成员

**步骤一**：将成员头像放入 `assets/images/team/`（建议正方形，≥ 300px）

**步骤二**：在 `index.html` 对应的 Team 区块中，参照现有成员格式添加 HTML 代码。

### 5. 修改页面样式

- **全局样式**（导航栏、字体、卡片、论文列表等）→ 编辑 `_layouts/default.html` 中的 `<style>` 标签
- **首页专属样式**（Hero 区域、研究方向卡片等）→ 编辑 `index.html` 顶部的 `<style>` 标签

### 6. 中英文切换

页面内置了语言切换功能。所有双语内容使用 `<span class="lang-en">` 和 `<span class="lang-zh">` 包裹，导航栏右上角的按钮可以切换。

---

## 部署发布

```bash
git add -A
git commit -m "描述本次修改"
git push origin main
```

推送到 `main` 分支后，GitHub Pages 会自动构建并发布。通常 1-2 分钟后线上更新。

---

## 注意事项

- `_site/` 目录是 Jekyll 自动生成的，**不要手动编辑**里面的文件
- `_archive/` 存放了历史临时文件，确认不需要后可以删除
- 图片文件名建议使用英文小写 + 下划线，例如 `my_paper.png`
- 修改 `_config.yml` 后需要**重启** Jekyll 服务器才能生效
