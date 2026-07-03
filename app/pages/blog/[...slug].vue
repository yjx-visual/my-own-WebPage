<template>
  <article>
    <UContainer class="py-12">
      <div class="max-w-3xl mx-auto">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center text-sm text-neutral-500 hover:text-(--ui-primary) transition-colors mb-6"
        >
          ← 返回博客列表
        </NuxtLink>

        <h1 class="text-4xl font-bold tracking-tight">{{ post.title }}</h1>

        <div class="flex items-center gap-3 mt-4 text-sm text-neutral-500">
          <span>{{ formatDate(post.date) }}</span>
          <span v-if="post.tags?.length">·</span>
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            variant="soft"
            size="sm"
          />
        </div>

        <p class="mt-4 text-lg text-neutral-500">{{ post.description }}</p>
      </div>
    </UContainer>

    <UContainer>
      <div class="max-w-3xl mx-auto prose dark:prose-invert pb-16">
        <ContentRenderer :value="post" />
      </div>
    </UContainer>
  </article>
</template>

<script setup>
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('blog').path(route.params.slug).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, message: '文章未找到' })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
