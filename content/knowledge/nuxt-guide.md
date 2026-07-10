---
title: Nuxt 3 项目搭建指南
description: 从零开始搭建 Nuxt 3 项目的完整步骤
date: 2026-06-10
category: frontend
tags: [nuxt, vue, setup]
difficulty: beginner
order: 1
---

## 环境准备

确认 Node.js 版本 >= 18：

```bash
node -v
```

## 创建项目

```bash
npx nuxi@latest init my-app
cd my-app
npm run dev
```

## 目录结构

```
my-app/
├── app.vue          # 入口文件
├── nuxt.config.ts   # 配置文件
├── pages/           # 页面路由
├── components/      # 组件
├── server/          # 服务端 API
└── public/          # 静态资源
```

## 添加模块

```bash
npx nuxi module add ui      # UI 组件库
npx nuxi module add content # 内容管理
npx nuxi module add image   # 图片优化
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |
