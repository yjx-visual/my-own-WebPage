<template>
  <div class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold font-mono tracking-tight">
        博客
      </h1>
      <p class="text-sm text-neutral-400 mt-2">
        技术文章、思考和总结
      </p>
    </div>

    <div
      v-if="posts?.length"
      class="glass p-6"
    >
      <template
        v-for="(post, i) in posts"
        :key="post.id"
      >
        <div
          v-if="i > 0"
          class="border-b border-black/5 dark:border-white/5"
        />
        <div class="flex items-center gap-4 py-4 -mx-3 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
          <span class="text-xs font-mono text-neutral-400 w-10 text-right shrink-0">{{ dateShort(post.date) }}</span>
          <div class="min-w-0 flex-1 flex items-center gap-2">
            <span class="glow-dot shrink-0" />
            <NuxtLink
              :to="`/blog/${post.stem.split('/').pop()}`"
              class="text-sm font-medium link-underline"
            >
              {{ post.title }}
            </NuxtLink>
          </div>
          <div class="hidden sm:flex gap-1 shrink-0">
            <span
              v-for="tag in (post.tags || []).slice(0, 3)"
              :key="tag"
              class="text-[10px] font-mono text-neutral-400"
            >#{{ tag }}</span>
          </div>
        </div>
      </template>
    </div>

    <p
      v-else
      class="glass p-12 text-center font-mono text-sm text-neutral-400"
    >
      // 还没有文章
    </p>
  </div>
</template>

<script setup>
useSeoMeta({ title: '博客', description: '技术文章、思考和总结' })
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').where('draft', '!=', true).order('date', 'DESC').all()
)
function dateShort(date) {
  return new Date(date).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
}
</script>
