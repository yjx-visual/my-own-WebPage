<template>
  <div class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold font-mono tracking-tight">
        知识库
      </h1>
      <p class="text-sm text-neutral-400 mt-2">
        分类整理的知识笔记和参考文档
      </p>
    </div>

    <div
      v-if="grouped?.length"
      class="space-y-8"
    >
      <section
        v-for="{ category, articles } in grouped"
        :key="category"
        class="glass p-6"
      >
        <h2 class="font-mono font-semibold text-sm mb-4 flex items-center gap-2">
          <span>{{ category }}</span>
          <span class="text-xs text-neutral-400 font-normal">{{ articles.length }} 篇</span>
        </h2>
        <div>
          <template
            v-for="(article, i) in articles"
            :key="article.id"
          >
            <div
              v-if="i > 0"
              class="border-b border-black/5 dark:border-white/5"
            />
            <div class="flex items-center justify-between gap-4 py-3 -mx-3 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
              <div class="min-w-0 flex items-center gap-2">
                <span class="glow-dot shrink-0" />
                <NuxtLink
                  :to="`/knowledge/${article.stem.split('/').pop()}`"
                  class="text-sm font-medium link-underline"
                >
                  {{ article.title }}
                </NuxtLink>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <span
                  v-if="article.difficulty"
                  class="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  :class="difficultyClass(article.difficulty)"
                >
                  {{ difficultyLabel(article.difficulty) }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
    <p
      v-else
      class="glass p-12 text-center font-mono text-sm text-neutral-400"
    >
      // 知识库还在建设中
    </p>
  </div>
</template>

<script setup>
useSeoMeta({ title: '知识库', description: '分类整理的知识笔记和参考文档' })
const { data: knowledgeArticles } = await useAsyncData('knowledge-all', () =>
  queryCollection('knowledge').order('order', 'ASC').all()
)
const grouped = computed(() => {
  if (!knowledgeArticles.value?.length) return []
  const map = {}
  for (const a of knowledgeArticles.value) {
    const cat = a.category || '未分类'
    ;(map[cat] ??= []).push(a)
  }
  return Object.entries(map).map(([category, articles]) => ({ category, articles }))
})
function difficultyLabel(d) {
  return { beginner: '入门', intermediate: '进阶', advanced: '高级' }[d] || d
}
function difficultyClass(d) {
  return {
    beginner: 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-300',
    intermediate: 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-300',
    advanced: 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-300'
  }[d] || 'bg-black/5 dark:bg-white/5 text-neutral-400'
}
</script>
