<template>
  <UContainer class="py-12">
    <div class="mb-8">
      <NuxtLink
        to="/knowledge"
        class="inline-flex items-center text-sm text-neutral-500 hover:text-(--ui-primary) transition-colors mb-2"
      >
        ← 返回知识库
      </NuxtLink>
      <h1 class="text-4xl font-bold capitalize">{{ category }}</h1>
    </div>

    <div v-if="articles?.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UCard v-for="article in articles" :key="article.id">
        <NuxtLink
          :to="`/knowledge/${article.path}`"
          class="font-semibold hover:underline"
        >
          {{ article.title }}
        </NuxtLink>
        <p class="text-sm text-neutral-500 mt-1">{{ article.description }}</p>
        <div class="flex flex-wrap gap-1 mt-2">
          <UBadge
            v-if="article.difficulty"
            :label="difficultyLabel(article.difficulty)"
            variant="soft"
            size="sm"
          />
          <UBadge
            v-for="tag in article.tags"
            :key="tag"
            :label="tag"
            variant="subtle"
            size="sm"
          />
        </div>
      </UCard>
    </div>

    <p v-else class="text-neutral-500 text-center py-12">
      该分类下暂无文章
    </p>
  </UContainer>
</template>

<script setup>
const route = useRoute()
const category = computed(() => route.params.category)

const { data: articles } = await useAsyncData(`knowledge-cat-${category.value}`, () =>
  queryCollection('knowledge')
    .where('category', '=', category.value)
    .order('order', 'ASC')
    .all(),
)

useSeoMeta({ title: `知识库 · ${category.value}` })

function difficultyLabel(d) {
  return { beginner: '入门', intermediate: '进阶', advanced: '高级' }[d] || d
}
</script>
