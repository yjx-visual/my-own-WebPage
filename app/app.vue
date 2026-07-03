<script setup>
useHead({
  htmlAttrs: { lang: 'zh-CN' },
  link: [{ rel: 'icon', href: '/favicon.ico' }],
})

useSeoMeta({
  title: '你的名字 - 个人网站',
  description: '个人博客、项目展示与知识库',
  ogTitle: '你的名字 - 个人网站',
  ogDescription: '个人博客、项目展示与知识库',
  twitterCard: 'summary_large_image',
})

const navItems = [
  { label: '首页', to: '/' },
  { label: '博客', to: '/blog' },
  { label: '项目', to: '/projects' },
  { label: '知识库', to: '/knowledge' },
  { label: '关于', to: '/about' },
]
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="font-bold text-lg tracking-tight">
          你的名字
        </NuxtLink>

        <UNavigationMenu :items="navItems" class="ml-8" />
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-neutral-500">
          &copy; {{ new Date().getFullYear() }} 你的名字
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
