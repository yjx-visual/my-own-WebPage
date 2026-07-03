---
title: TypeScript 高级类型技巧
description: 总结日常开发中常用的 TypeScript 高级类型用法，包括条件类型、映射类型、模板字面量类型等。
date: 2026-06-20
tags: [typescript, frontend]
draft: false
---

## 条件类型

条件类型根据条件选择不同的类型：

```ts
type IsString<T> = T extends string ? true : false

type A = IsString<'hello'>  // true
type B = IsString<42>       // false
```

## 映射类型

基于已有类型创建新类型：

```ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

type Partial<T> = {
  [K in keyof T]?: T[K]
}
```

## 模板字面量类型

对字符串字面量类型做模式匹配：

```ts
type EventName<T extends string> = `on${Capitalize<T>}`

type Click = EventName<'click'>  // 'onClick'
```

## 实用工具类型

TypeScript 内置了很多实用的工具类型，如 `Pick`, `Omit`, `Exclude`, `Extract` 等。
