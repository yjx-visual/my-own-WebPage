<template>
  <div class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-8">
      <NuxtLink
        to="/knowledge"
        class="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors mb-2"
      >
        ← 返回知识库
      </NuxtLink>
      <h1 class="text-3xl font-bold font-mono tracking-tight capitalize">
        {{ category }}
      </h1>
    </div>

    <div
      v-if="articles?.length"
      class="glass p-6"
    >
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
    <p
      v-else
      class="glass p-12 text-center font-mono text-sm text-neutral-400"
    >
      // 该分类下暂无文章
    </p>
  </div>
</template>

<script setup>
const route = useRoute()
const category = computed(() => route.params.category)
const { data: articles } = await useAsyncData(`knowledge-cat-${category.value}`, () =>
  queryCollection('knowledge').where('category', '=', category.value).order('order', 'ASC').all()
)
useSeoMeta({ title: `知识库 · ${category.value}` })
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
