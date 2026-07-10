<template>
  <article>
    <div class="max-w-3xl mx-auto px-6 py-12">
      <NuxtLink
        to="/knowledge"
        class="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors mb-6"
      >
        ← 返回知识库
      </NuxtLink>
      <div class="glass p-8 mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xs font-mono px-2 py-0.5 rounded-md glass-sm text-neutral-500">{{ article.category }}</span>
          <span
            v-if="article.difficulty"
            class="text-xs font-mono px-2 py-0.5 rounded-md glass-sm text-neutral-500"
          >{{ difficultyLabel(article.difficulty) }}</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight font-mono">
          {{ article.title }}
        </h1>
        <p
          v-if="article.description"
          class="mt-4 text-neutral-400 leading-relaxed"
        >
          {{ article.description }}
        </p>
        <div
          v-if="article.tags?.length"
          class="flex flex-wrap gap-1 mt-4"
        >
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="text-[10px] font-mono text-neutral-400"
          >#{{ tag }}</span>
        </div>
      </div>
    </div>
    <div class="max-w-3xl mx-auto px-6">
      <div class="glass p-8 prose dark:prose-invert max-w-none pb-12">
        <ContentRenderer :value="article" />
      </div>
    </div>
    <div class="max-w-3xl mx-auto px-6 py-12 text-center">
      <NuxtLink
        to="/knowledge"
        class="glass-sm px-5 py-2 font-mono text-sm text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
      >← 返回知识库</NuxtLink>
    </div>
  </article>
</template>

<script setup>
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const { data: article } = await useAsyncData(`knowledge-${slug}`, () =>
  queryCollection('knowledge').where('stem', '=', `knowledge/${slug}`).first()
)
if (!article.value) throw createError({ statusCode: 404, message: '文章未找到' })
useSeoMeta({ title: article.value.title, description: article.value.description })
function difficultyLabel(d) {
  return { beginner: '入门', intermediate: '进阶', advanced: '高级' }[d] || d
}
</script>
