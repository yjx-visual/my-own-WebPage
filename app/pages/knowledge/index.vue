<template>
  <UContainer class="py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold mb-2">知识库</h1>
      <p class="text-neutral-500">分类整理的知识笔记和参考文档</p>
    </div>

    <!-- 按分类分组展示 -->
    <div v-if="grouped?.length" class="space-y-16">
      <section v-for="{ category, articles } in grouped" :key="category">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold capitalize">{{ category }}</h2>
          <UButton
            :to="`/knowledge/category/${category}`"
            variant="link"
            trailing-icon="i-lucide-arrow-right"
          >
            查看全部
          </UButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UCard v-for="article in articles" :key="article.id">
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <NuxtLink
                  :to="`/knowledge/${article.path}`"
                  class="font-semibold hover:underline"
                >
                  {{ article.title }}
                </NuxtLink>
                <p class="text-sm text-neutral-500 mt-1">
                  {{ article.description }}
                </p>
                <div class="flex flex-wrap gap-1 mt-2">
                  <UBadge
                    :label="difficultyLabel(article.difficulty)"
                    variant="soft"
                    size="sm"
                    v-if="article.difficulty"
                  />
                  <UBadge
                    v-for="tag in article.tags"
                    :key="tag"
                    :label="tag"
                    variant="subtle"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </section>
    </div>

    <p v-else class="text-neutral-500 text-center py-12">
      知识库还在建设中～
    </p>
  </UContainer>
</template>

<script setup>
useSeoMeta({ title: '知识库', description: '分类整理的知识笔记和参考文档' })

const { data: articles } = await useAsyncData('knowledge-all', () =>
  queryCollection('knowledge').order('order', 'ASC').all(),
)

const grouped = computed(() => {
  if (!articles.value?.length) return []
  const map = {}
  for (const a of articles.value) {
    const cat = a.category || '未分类'
    ;(map[cat] ??= []).push(a)
  }
  return Object.entries(map).map(([category, articles]) => ({ category, articles }))
})

function difficultyLabel(d) {
  return { beginner: '入门', intermediate: '进阶', advanced: '高级' }[d] || d
}
</script>
