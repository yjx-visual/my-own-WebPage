<template>
  <article>
    <UContainer class="py-12">
      <div class="max-w-3xl mx-auto">
        <NuxtLink
          to="/knowledge"
          class="inline-flex items-center text-sm text-neutral-500 hover:text-(--ui-primary) transition-colors mb-6"
        >
          ← 返回知识库
        </NuxtLink>

        <div class="flex items-center gap-2 mb-4">
          <UBadge :label="article.category" variant="soft" color="primary" size="sm" />
          <UBadge
            v-if="article.difficulty"
            :label="difficultyLabel(article.difficulty)"
            variant="subtle"
            size="sm"
          />
        </div>

        <h1 class="text-4xl font-bold tracking-tight">{{ article.title }}</h1>

        <p v-if="article.description" class="mt-4 text-lg text-neutral-500">
          {{ article.description }}
        </p>

        <div v-if="article.tags?.length" class="flex flex-wrap gap-2 mt-4">
          <UBadge
            v-for="tag in article.tags"
            :key="tag"
            :label="tag"
            variant="soft"
            size="sm"
          />
        </div>
      </div>
    </UContainer>

    <UContainer>
      <div class="max-w-3xl mx-auto prose dark:prose-invert pb-16">
        <ContentRenderer :value="article" />
      </div>
    </UContainer>
  </article>
</template>

<script setup>
const route = useRoute()

const { data: article } = await useAsyncData(`knowledge-${route.params.slug}`, () =>
  queryCollection('knowledge').path(route.params.slug).first(),
)

if (!article.value) {
  throw createError({ statusCode: 404, message: '文章未找到' })
}

useSeoMeta({
  title: article.value.title,
  description: article.value.description,
})

function difficultyLabel(d) {
  return { beginner: '入门', intermediate: '进阶', advanced: '高级' }[d] || d
}
</script>
