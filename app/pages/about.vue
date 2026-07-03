<template>
  <UContainer class="py-16">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold">关于我</h1>

      <div class="prose dark:prose-invert mt-8">
        <p>
          你好！我是一名全栈开发者，专注于 Vue 生态和 Node.js 技术栈。
          我热爱开源，喜欢用代码创造有用的工具，也享受分享知识的过程。
        </p>

        <h2>技能</h2>
        <div class="flex flex-wrap gap-2 not-prose">
          <UBadge variant="soft" label="Vue 3" />
          <UBadge variant="soft" label="TypeScript" />
          <UBadge variant="soft" label="Nuxt 3" />
          <UBadge variant="soft" label="Node.js" />
          <UBadge variant="soft" label="Tailwind CSS" />
          <UBadge variant="soft" label="Git" />
        </div>

        <h2>关于本站</h2>
        <p>
          这个网站由 Nuxt 3 + Nuxt UI 构建，内容通过 @nuxt/content 管理，
          部署在 Netlify 上。博客记录我的技术思考，知识库是我的个人笔记。
        </p>

        <h2>联系我</h2>
        <div class="flex gap-3 not-prose">
          <UButton
            to="https://github.com"
            target="_blank"
            variant="outline"
            icon="i-simple-icons-github"
            label="GitHub"
          />
          <UButton
            to="mailto:your@email.com"
            variant="outline"
            icon="i-lucide-mail"
            label="Email"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
useSeoMeta({ title: '关于我' })
</script>
