<script setup>
useHead({
  htmlAttrs: { lang: 'zh-CN' },
  link: [{ rel: 'icon', href: '/favicon.ico' }]
})

useSeoMeta({
  title: 'JaceYou — Developer',
  description: '个人博客、项目展示与知识库',
  ogTitle: 'JaceYou — Developer',
  ogDescription: '个人博客、项目展示与知识库',
  twitterCard: 'summary_large_image'
})

const navItems = [
  { label: '首页', to: '/', icon: 'i-lucide-home' },
  { label: '博客', to: '/blog', icon: 'i-lucide-pencil' },
  { label: '项目', to: '/projects', icon: 'i-lucide-code-2' },
  { label: '知识库', to: '/knowledge', icon: 'i-lucide-book-open' },
  { label: '关于', to: '/about', icon: 'i-lucide-user' }
]
</script>

<template>
  <UApp>
    <ParticleBg />
    <!-- 玻璃态导航栏 -->
    <header class="sticky top-0 z-50 glass-sm border-b border-black/5 dark:border-white/5 rounded-none">
      <div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2.5 group"
        >
          <div class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            JY
          </div>
          <span class="font-bold text-base tracking-tight">Jace</span>
        </NuxtLink>

        <!-- 导航 -->
        <nav class="hidden sm:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all font-mono"
            active-class="text-neutral-900 dark:text-white bg-black/5 dark:bg-white/10"
          >
            <UIcon
              :name="item.icon"
              class="w-3.5 h-3.5"
            />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <UColorModeButton />
        </div>
      </div>
    </header>

    <UMain class="min-h-screen">
      <NuxtPage />
    </UMain>

    <footer class="border-t border-black/5 dark:border-white/5 py-8">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <p class="text-xs text-neutral-400 font-mono">
          &copy; {{ new Date().getFullYear() }} JaceYou
        </p>
      </div>
    </footer>
  </UApp>
</template>
