<template>
  <article>
    <div class="max-w-3xl mx-auto px-6 py-12">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors mb-6"
      >
        ← 返回博客
      </NuxtLink>

      <div class="glass p-8 mb-8">
        <h1 class="text-3xl font-bold tracking-tight font-mono">
          {{ post.title }}
        </h1>
        <div class="flex items-center gap-3 mt-4 text-xs font-mono text-neutral-400">
          <span>{{ formatDate(post.date) }}</span>
          <span v-if="post.tags?.length">·</span>
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="text-neutral-600 dark:text-neutral-300"
          >#{{ tag }}</span>
        </div>
        <p class="mt-4 text-neutral-400 leading-relaxed">
          {{ post.description }}
        </p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6">
      <div class="glass p-8 prose dark:prose-invert max-w-none pb-12">
        <ContentRenderer :value="post" />
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-12 text-center">
      <NuxtLink
        to="/blog"
        class="glass-sm px-5 py-2 font-mono text-sm text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
      >
        ← 返回博客
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').where('stem', '=', `blog/${slug}`).first()
)
if (!post.value) throw createError({ statusCode: 404, message: '文章未找到' })
useSeoMeta({ title: post.value.title, description: post.value.description })
function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
