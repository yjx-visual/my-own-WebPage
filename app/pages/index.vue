<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-24 pb-16">
      <div class="max-w-5xl mx-auto px-6 text-center relative">
        <div class="h-16 flex items-center justify-center">
          <h1 class="typewriter text-4xl md:text-5xl font-bold tracking-tight">
            Jace
          </h1>
        </div>
        <p class="hero-sub mt-4 text-neutral-400 max-w-md mx-auto leading-relaxed">
          前端开发者，Vue 生态爱好者。<br>写代码、做设计、分享知识。
        </p>

        <div class="hero-buttons mt-8 flex justify-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            class="glass-sm px-4 py-2 flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            <UIcon
              name="i-simple-icons-github"
              class="w-4 h-4"
            />
            GitHub
          </a>
          <a
            href="mailto:your@email.com"
            class="glass-sm px-4 py-2 flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            <UIcon
              name="i-lucide-mail"
              class="w-4 h-4"
            />
            Email
          </a>
        </div>
      </div>
    </section>

    <!-- 三栏内容 -->
    <section class="pb-24">
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 博客 -->
          <div class="glass p-6 glass-item">
            <div class="flex items-center justify-between mb-5">
              <h2 class="font-mono font-semibold text-sm flex items-center gap-2">
                <UIcon
                  name="i-lucide-pencil"
                  class="w-4 h-4 text-neutral-500"
                />
                <span>博客</span>
              </h2>
              <NuxtLink
                to="/blog"
                class="text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                all →
              </NuxtLink>
            </div>

            <div
              v-if="recentPosts?.length"
              class="space-y-1"
            >
              <div
                v-for="post in recentPosts"
                :key="post.id"
                class="cascade-item flex items-center gap-3 py-2 -mx-2 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
              >
                <span class="glow-dot shrink-0" />
                <div class="min-w-0 flex-1">
                  <NuxtLink
                    :to="`/blog/${post.stem.split('/').pop()}`"
                    class="text-sm link-underline"
                  >
                    {{ post.title }}
                  </NuxtLink>
                  <span class="text-[10px] font-mono text-neutral-400 ml-2">{{ dateShort(post.date) }}</span>
                </div>
              </div>
            </div>
            <p
              v-else
              class="text-xs font-mono text-neutral-400 py-4 text-center"
            >
              -- empty --
            </p>
          </div>

          <!-- 项目 -->
          <div class="glass p-6 glass-item">
            <div class="flex items-center justify-between mb-5">
              <h2 class="font-mono font-semibold text-sm flex items-center gap-2">
                <UIcon
                  name="i-lucide-code-2"
                  class="w-4 h-4 text-neutral-500"
                />
                <span>项目</span>
              </h2>
              <NuxtLink
                to="/projects"
                class="text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                all →
              </NuxtLink>
            </div>

            <div
              v-if="featuredProjects?.length"
              class="space-y-3"
            >
              <NuxtLink
                v-for="project in featuredProjects"
                :key="project.id"
                :to="`/projects/${project.stem.split('/').pop()}`"
                class="block glass-sm p-3 glass-hover"
              >
                <div class="flex items-center gap-2 mb-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span class="text-sm font-medium">{{ project.title }}</span>
                </div>
                <p class="text-xs text-neutral-400 line-clamp-2 mb-2">{{ project.description }}</p>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tech in (project.techStack || []).slice(0, 3)"
                    :key="tech"
                    class="text-[10px] font-mono text-neutral-400 px-1.5 py-0.5 rounded border border-black/10 dark:border-white/10"
                  >
                    {{ tech }}
                  </span>
                </div>
              </NuxtLink>
            </div>
            <p
              v-else
              class="text-xs font-mono text-neutral-400 py-4 text-center"
            >
              -- empty --
            </p>
          </div>

          <!-- 知识库 -->
          <div class="glass p-6 glass-item">
            <div class="flex items-center justify-between mb-5">
              <h2 class="font-mono font-semibold text-sm flex items-center gap-2">
                <UIcon
                  name="i-lucide-book-open"
                  class="w-4 h-4 text-neutral-500"
                />
                <span>知识库</span>
              </h2>
              <NuxtLink
                to="/knowledge"
                class="text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                all →
              </NuxtLink>
            </div>

            <div
              v-if="knowledgeGroups?.length"
              class="space-y-2"
            >
              <NuxtLink
                v-for="group in knowledgeGroups"
                :key="group.category"
                :to="`/knowledge/category/${group.category}`"
                class="flex items-center justify-between glass-sm px-3 py-2.5 glass-hover"
              >
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono">{{ group.category }}</span>
                </div>
                <span class="text-xs font-mono text-neutral-400">{{ group.count }} 篇</span>
              </NuxtLink>
            </div>
            <p
              v-else
              class="text-xs font-mono text-neutral-400 py-4 text-center"
            >
              -- empty --
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryCollection('blog').where('draft', '!=', true).order('date', 'DESC').limit(5).all()
)

const { data: featuredProjects } = await useAsyncData('featured-projects', () =>
  queryCollection('projects').where('featured', '=', true).limit(4).all()
)

const { data: knowledgeArticles } = await useAsyncData('knowledge-groups', () =>
  queryCollection('knowledge').order('order', 'ASC').all()
)

const knowledgeGroups = computed(() => {
  if (!knowledgeArticles.value?.length) return []
  const map = {}
  for (const a of knowledgeArticles.value) {
    const cat = a.category || '未分类'
    ;(map[cat] ??= []).push(a)
  }
  return Object.entries(map).map(([category, articles]) => ({ category, count: articles.length }))
})

function dateShort(date) {
  return new Date(date).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
}
</script>
