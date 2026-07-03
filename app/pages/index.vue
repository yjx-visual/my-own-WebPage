<template>
  <div>
    <!-- Hero -->
    <UContainer class="py-24 text-center">
      <h1 class="text-5xl font-bold tracking-tight">
        👋 你好，我是 <span class="text-(--ui-primary)">Stars</span>
      </h1>
      <p class="mt-6 text-xl text-neutral-500 max-w-2xl mx-auto">
        全栈开发者，热爱开源。这里记录我的技术思考、项目作品和知识积累。
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <UButton to="/blog" size="lg">阅读博客</UButton>
        <UButton to="/projects" variant="outline" size="lg">查看项目</UButton>
      </div>
    </UContainer>

    <!-- 最新文章 -->
    <UContainer class="py-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold">📝 最新文章</h2>
        <UButton to="/blog" variant="link" trailing-icon="i-lucide-arrow-right">查看全部</UButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="post in recentPosts" :key="post.id">
          <div class="flex items-center gap-2 text-sm text-neutral-500 mb-2">
            <span>{{ formatDate(post.date) }}</span>
            <UBadge
              v-for="tag in post.tags?.slice(0, 2)"
              :key="tag"
              :label="tag"
              variant="soft"
              size="sm"
            />
          </div>
          <NuxtLink
            :to="`/blog/${post.path}`"
            class="font-semibold text-lg hover:underline"
          >
            {{ post.title }}
          </NuxtLink>
          <p class="text-sm text-neutral-500 mt-2 line-clamp-2">
            {{ post.description }}
          </p>
        </UCard>
      </div>
    </UContainer>

    <!-- 精选项目 -->
    <UContainer class="py-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold">🚀 精选项目</h2>
        <UButton to="/projects" variant="link" trailing-icon="i-lucide-arrow-right">查看全部</UButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard v-for="project in featuredProjects" :key="project.id">
          <UBadge
            :label="statusLabel(project.status)"
            :color="statusColor(project.status)"
            variant="soft"
            size="sm"
            class="mb-2"
          />
          <NuxtLink
            :to="`/projects/${project.path}`"
            class="font-semibold text-lg hover:underline"
          >
            {{ project.title }}
          </NuxtLink>
          <p class="text-sm text-neutral-500 mt-2 line-clamp-2">
            {{ project.description }}
          </p>
          <div v-if="project.techStack?.length" class="flex flex-wrap gap-1 mt-3">
            <UBadge
              v-for="tech in project.techStack"
              :key="tech"
              :label="tech"
              variant="subtle"
              size="sm"
            />
          </div>
        </UCard>
      </div>
    </UContainer>

    <!-- 快捷入口 -->
    <UContainer class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard v-for="link in quickLinks" :key="link.title">
          <template #header>
            <UIcon :name="link.icon" class="w-8 h-8 text-(--ui-primary)" />
          </template>
          <h3 class="font-semibold text-lg">{{ link.title }}</h3>
          <p class="text-sm text-neutral-500 mt-2">{{ link.description }}</p>
          <template #footer>
            <UButton :to="link.to" variant="link" trailing-icon="i-lucide-arrow-right">
              了解更多
            </UButton>
          </template>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const quickLinks = [
  {
    title: '📝 博客',
    description: '技术文章、项目总结和思考分享',
    to: '/blog',
    icon: 'i-lucide-pencil',
  },
  {
    title: '🚀 项目',
    description: '开源项目与个人作品集',
    to: '/projects',
    icon: 'i-lucide-code-2',
  },
  {
    title: '📚 知识库',
    description: '分类整理的知识笔记和参考文档',
    to: '/knowledge',
    icon: 'i-lucide-book-open',
  },
]

const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryCollection('blog')
    .where('draft', '!=', true)
    .order('date', 'DESC')
    .limit(6)
    .all(),
)

const { data: featuredProjects } = await useAsyncData('featured-projects', () =>
  queryCollection('projects')
    .where('featured', '=', true)
    .limit(4)
    .all(),
)

const statusMap = {
  completed: { color: 'success', label: '已完成' },
  active: { color: 'primary', label: '进行中' },
  archived: { color: 'neutral', label: '已归档' },
  planned: { color: 'warning', label: '计划中' },
}

function statusColor(s) {
  return statusMap[s]?.color || 'neutral'
}

function statusLabel(s) {
  return statusMap[s]?.label || s
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
