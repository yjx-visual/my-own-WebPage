---
title: 使用 Nuxt 3 + Nuxt UI 搭建个人网站
description: 一篇完整的教程，带你从零开始用 Nuxt 3 和 Nuxt UI 搭建现代化个人网站，支持暗色模式、响应式布局。
date: 2026-07-10
tags: [nuxt, vue, typescript, tutorial]
featured: true
---

## 为什么选择 Nuxt？

Nuxt 3 是一个基于 Vue 3 的全栈框架，提供了：

- **文件路由**：创建文件即创建路由
- **自动导入**：组件和工具函数无需手动导入
- **SSR/SSG**：灵活的服务端渲染和静态生成
- **模块生态**：丰富的官方和社区模块

## 快速开始

```bash
npx nuxi@latest init my-website -t ui
cd my-website
npm run dev
```

## 核心模块

### @nuxt/ui

内置 100+ 组件，基于 Tailwind CSS，支持暗色模式。

```vue
<template>
  <UButton color="primary">点击我</UButton>
  <UColorModeButton />
</template>
```

### @nuxt/content

Markdown 驱动的内容管理，类型安全的查询。

```ts
const { data } = await useAsyncData(() =>
  queryCollection('blog')
    .where('draft', '!=', true)
    .order('date', 'DESC')
    .all()
)
```

## 小结

Nuxt 3 生态让构建个人网站变得简单高效。
