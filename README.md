# Dora

一个基于 `pnpm workspace` 的 Astro 静态个人博客项目，当前发布目标为 [https://studystudyhard-go.github.io/my-lab/](https://studystudyhard-go.github.io/my-lab/)。

项目采用：

- `Astro`
- `React`
- `Tailwind CSS v4`
- `shadcn/ui`
- `Markdown` 内容驱动
- `GitHub Pages` 静态部署

## 项目结构

```text
.
|-- apps/
|   `-- site/                    # 主站 Astro 应用
|-- packages/
|   `-- config/                  # 共享配置
|-- .github/workflows/
|   `-- deploy.yml               # GitHub Pages 部署
|-- package.json                 # 根脚本
|-- pnpm-workspace.yaml
`-- .npmrc                       # 淘宝镜像配置
```

## 当前特性

- 首页为作品展页面
- 顶部全宽 Banner Slider
- 顶部导航覆盖在 Banner 上，滚动后吸顶
- 四个模块页面：作品展、实验室、书籍、关于
- 内容目录采用“一篇内容一个文件夹”
- 作品支持图像拼贴布局和详情页瀑布流展示
- `publishedAt` 未填写时，展示构建当天日期
- 默认 `light` 皮肤，使用 CSS Variables 管理主题
- `pnpm dev` 支持本地实时预览
- `pnpm build` 用于标准 Astro 静态构建
- GitHub Actions push 到 `main` 后自动部署到 GitHub Pages
- 已关闭 Astro telemetry 提示

## 本地使用

```bash
pnpm install
pnpm dev
```

常用命令：

- `pnpm dev`：本地开发预览，监听 Markdown 和代码变更
- `pnpm build`：构建静态站点，输出到 `apps/site/dist`
- `pnpm preview`：本地预览构建结果
- `pnpm check`：运行 Astro 内容和类型检查

## 配置集中管理

站点常用变量集中放在 [packages/config/src/index.js](/Users/timlyu/gitcode/github/my-lab/packages/config/src/index.js)：

- 站点名称
- 页脚名称
- 语言
- GitHub Pages 站点地址和 `base`
- 首页文案
- 导航配置
- 模块标题与描述
- 作品展示相关尺寸参数

当前发布配置为：

- `site`: `https://studystudyhard-go.github.io`
- `base`: `/my-lab`

## 内容目录

内容都放在 [apps/site/src/content](/Users/timlyu/gitcode/github/my-lab/apps/site/src/content) 下：

```text
apps/site/src/content/
|-- about/
|   `-- about/
|       `-- index.md
|-- books/
|   `-- <slug>/
|       `-- index.md
|-- lab/
|   `-- <slug>/
|       `-- index.md
`-- works/
    `-- <slug>/
        |-- index.md
        `-- images...
```

示例：

- [apps/site/src/content/works/quiet-picnic/index.md](/Users/timlyu/gitcode/github/my-lab/apps/site/src/content/works/quiet-picnic/index.md)
- [apps/site/src/content/lab/material-rhythm/index.md](/Users/timlyu/gitcode/github/my-lab/apps/site/src/content/lab/material-rhythm/index.md)
- [apps/site/src/content/books/the-creative-act/index.md](/Users/timlyu/gitcode/github/my-lab/apps/site/src/content/books/the-creative-act/index.md)
- [apps/site/src/content/about/about/index.md](/Users/timlyu/gitcode/github/my-lab/apps/site/src/content/about/about/index.md)

## 作品模块图片布局

作品模块支持两层图片配置：

- `coverLayout`：控制首页卡片拼图和详情页顶部主视觉
- `media`：控制详情页附加图片列表

示例结构：

```text
apps/site/src/content/works/my-work/
|-- index.md
|-- hero-a.svg
|-- hero-b.svg
`-- detail-a.svg
```

示例 Frontmatter：

```md
---
title: My Work
summary: Short introduction
year: "2025"
tags: [Illustration, Poster]
coverLayout:
  direction: row
  gap: 16
  minHeight: 420
  children:
    - type: image
      src: ./hero-a.svg
      flex: 1
      caption: Main visual
      tags: [Hero]
      banner: 1
    - type: group
      flex: 2
      direction: column
      children:
        - type: image
          src: ./hero-b.svg
          flex: 1
          caption: Detail
media:
  - type: image
    src: ./detail-a.svg
    caption: Process image
    tags: [Process]
---
```

说明：

- `banner: 1` 的图片会参与首页 Banner 轮播候选
- 首页 Banner 默认取最多 5 张，可在配置中修改
- `flex` 用于控制图片或分组占比
- `group.direction` 可控制子图片横向或纵向排列
- 如果只写 `media`，图片会在详情页展示

## 页面与组件

核心布局与页面组件位于：

- [apps/site/src/layouts/BaseLayout.astro](/Users/timlyu/gitcode/github/my-lab/apps/site/src/layouts/BaseLayout.astro)
- [apps/site/src/components/app/site-header.tsx](/Users/timlyu/gitcode/github/my-lab/apps/site/src/components/app/site-header.tsx)
- [apps/site/src/components/app/home-banner.tsx](/Users/timlyu/gitcode/github/my-lab/apps/site/src/components/app/home-banner.tsx)
- [apps/site/src/components/app/work-showcase-card.tsx](/Users/timlyu/gitcode/github/my-lab/apps/site/src/components/app/work-showcase-card.tsx)
- [apps/site/src/components/app/work-masonry.tsx](/Users/timlyu/gitcode/github/my-lab/apps/site/src/components/app/work-masonry.tsx)
- [apps/site/src/components/app/detail-shell.tsx](/Users/timlyu/gitcode/github/my-lab/apps/site/src/components/app/detail-shell.tsx)

## 部署

GitHub Actions 文件位于 [deploy.yml](/Users/timlyu/gitcode/github/my-lab/.github/workflows/deploy.yml)。

部署流程：

1. push 到 `main`
2. Actions 执行 `pnpm install --frozen-lockfile`
3. 执行 `pnpm build`
4. 上传 `apps/site/dist`
5. 自动部署到 GitHub Pages

## 说明

- 项目已配置淘宝镜像：见 [.npmrc](/Users/timlyu/gitcode/github/my-lab/.npmrc)
- 如后续迁移到其他仓库，只需要修改 [packages/config/src/index.js](/Users/timlyu/gitcode/github/my-lab/packages/config/src/index.js) 中的 `site` 和 `base`
- 本项目是单一 Astro 应用 + packages 共享层的 monorepo 结构，便于后续复用配置与扩展模块
