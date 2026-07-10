<template>
  <div class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold font-mono tracking-tight">
        关于
      </h1>
    </div>

    <div class="space-y-6">
      <div class="glass p-6">
        <p class="text-sm leading-relaxed">
          你好！我是 <strong>Jace</strong>，一名前端开发者，
          专注于 Vue 生态和 TypeScript 技术栈。
          热爱用代码创造有用的工具，也享受分享知识的过程。
        </p>
      </div>

      <div class="glass p-6">
        <h2 class="font-mono text-xs text-neutral-400 mb-3">
          $ cat skills.json
        </h2>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="skill in skills"
            :key="skill"
            class="text-xs font-mono px-2.5 py-1 rounded-md glass-sm"
          >{{ skill }}</span>
        </div>
      </div>

      <div class="glass p-6">
        <h2 class="font-mono text-xs text-neutral-400 mb-3">
          $ cat stack.txt
        </h2>
        <p class="text-sm text-neutral-500">
          本站由 Nuxt 3 + Nuxt UI 构建，部署在 Netlify 上。
        </p>
      </div>

      <div class="glass p-6">
        <h2 class="font-mono text-xs text-neutral-400 mb-3">
          $ cat contact.txt
        </h2>
        <div class="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            class="glass-sm px-4 py-2 flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            <UIcon
              name="i-simple-icons-github"
              class="w-4 h-4"
            />
            <span class="font-mono text-xs">GitHub</span>
          </a>
          <a
            href="mailto:your@email.com"
            class="glass-sm px-4 py-2 flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            <UIcon
              name="i-lucide-mail"
              class="w-4 h-4"
            />
            <span class="font-mono text-xs">Email</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: '关于' })
const skills = ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'Vite', 'Element Plus', 'pnpm']
</script>
