---
title: CLI Task Runner
description: 一个高性能的命令行任务运行器，支持并行执行、文件监听和丰富的日志输出。
date: 2026-05-10
tags: [nodejs, cli, tool]
featured: false
status: completed
repo: https://github.com/jaceyou/task-runner
techStack: [TypeScript, Node.js, zod]
---

## 项目背景

现有工具如 Make、npm scripts 各有不足。我想要一个类型安全、支持并行、有友好日志输出的现代任务运行器。

## 核心功能

- YAML 配置，zod 类型校验
- 任务并行执行（可限制并发数）
- 文件监听 + 变更自动重跑
- 彩色分级日志输出
- 任务依赖解析
