---
title: Git 常用命令速查
description: 日常开发中高频使用的 Git 命令汇总
date: 2026-05-15
category: tools
tags: [git, cheatsheet]
difficulty: beginner
order: 1
---

## 基本操作

```bash
git init                    # 初始化仓库
git clone <url>             # 克隆仓库
git status                  # 查看状态
git add .                   # 暂存所有更改
git commit -m "message"     # 提交

git pull origin main        # 拉取远程
git push origin main        # 推送到远程
```

## 分支操作

```bash
git branch                  # 查看分支
git checkout -b new-branch  # 创建并切换分支
git merge feature-branch    # 合并分支
git branch -d old-branch    # 删除分支
git push origin --delete old-branch  # 删除远程分支
```

## 撤销操作

```bash
git reset --soft HEAD~1     # 撤销 commit，保留更改
git reset --hard HEAD~1     # 撤销 commit，丢弃更改
git checkout -- <file>      # 撤销文件修改
git revert <commit-hash>    # 新建反向 commit
```

## 储藏操作

```bash
git stash                   # 储藏当前修改
git stash pop               # 恢复最近储藏
git stash list              # 列出所有储藏
git stash clear             # 清空所有储藏
```
