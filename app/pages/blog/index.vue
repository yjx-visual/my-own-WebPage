<template>
  <UContainer class="py-12">
    <div class="max-w-3xl mx-auto mb-12">
      <h1 class="text-4xl font-bold mb-2">博客</h1>
      <p class="text-neutral-500">技术文章、思考和总结</p>
    </div>

    <div class="max-w-3xl mx-auto">
      <div v-if="posts?.length" class="space-y-6">
        <UCard v-for="post in posts" :key="post.id">
          <div class="flex items-center gap-2 text-sm text-neutral-500 mb-2">
            <span>{{ formatDate(post.date) }}</span>
            <span>·</span>
            <UBadge
              v-for="tag in post.tags"
              :key="tag"
              :label="tag"
              variant="soft"
              size="sm"
            />
          </div>
          <NuxtLink
            :to="`/blog/${post.path}`"
            class="font-semibold text-xl hover:underline"
          >
            {{ post.title }}
          </NuxtLink>
          <p class="text-sm text-neutral-500 mt-2 line-clamp-2">
            {{ post.description }}
          </p>
        </UCard>
      </div>

      <p v-else class="text-neutral-500 text-center py-12">
        还没有文章，敬请期待～
      </p>
    </div>
  </UContainer>
</template>

<script setup>
useSeoMeta({ title: '博客', description: '技术文章、思考和总结' })

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .where('draft', '!=', true)
    .order('date', 'DESC')
    .all(),
)

function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
