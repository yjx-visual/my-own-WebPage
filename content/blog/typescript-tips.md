---
title: TypeScript 实用技巧
description: 分享几个日常开发中常用的 TypeScript 技巧，包括类型推导、工具类型和泛型约束。
date: 2026-06-28
tags: [typescript, javascript, tips]
featured: false
---

## 善用类型推导

TypeScript 能自动推导大多数场景，不必过度声明类型：

```ts
// ❌ 多余的声明
const name: string = 'hello'

// ✅ 自动推导
const name = 'hello'
```

## 工具类型

### Partial&lt;T&gt;

```ts
interface User {
  name: string
  age: number
  email: string
}

function updateUser(id: string, patch: Partial<User>) {
  // patch 的所有字段都是可选的
}
```

### Pick&lt;T, K&gt; & Omit&lt;T, K&gt;

```ts
type UserBasic = Pick<User, 'name' | 'email'>
type UserWithoutEmail = Omit<User, 'email'>
```

## 泛型约束

```ts
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length
}

getLength('hello')  // ✅
getLength([1, 2, 3]) // ✅
getLength(123)       // ❌ number 没有 length
```

## 小结

TypeScript 的类型系统非常强大，掌握这些工具类型能让代码更安全、更简洁。
