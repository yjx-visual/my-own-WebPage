<template>
  <article>
    <UContainer class="py-12">
      <div class="max-w-3xl mx-auto">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center text-sm text-neutral-500 hover:text-(--ui-primary) transition-colors mb-6"
        >
          ← 返回项目列表
        </NuxtLink>

        <UBadge
          :label="statusLabel(project.status)"
          :color="statusColor(project.status)"
          variant="soft"
          size="sm"
          class="mb-4"
        />

        <h1 class="text-4xl font-bold tracking-tight">{{ project.title }}</h1>

        <p class="mt-4 text-lg text-neutral-500">{{ project.description }}</p>

        <div v-if="project.techStack?.length" class="flex flex-wrap gap-2 mt-6">
          <UBadge
            v-for="tech in project.techStack"
            :key="tech"
            :label="tech"
            variant="subtle"
          />
        </div>

        <div class="flex gap-3 mt-6">
          <UButton
            v-if="project.url"
            :to="project.url"
            target="_blank"
            icon="i-lucide-external-link"
            label="在线演示"
          />
          <UButton
            v-if="project.repo"
            :to="project.repo"
            target="_blank"
            variant="outline"
            icon="i-simple-icons-github"
            label="源代码"
          />
        </div>
      </div>
    </UContainer>

    <UContainer>
      <div class="max-w-3xl mx-auto prose dark:prose-invert pb-16">
        <ContentRenderer :value="project" />
      </div>
    </UContainer>
  </article>
</template>

<script setup>
const route = useRoute()

const { data: project } = await useAsyncData(`project-${route.params.slug}`, () =>
  queryCollection('projects').path(route.params.slug).first(),
)

if (!project.value) {
  throw createError({ statusCode: 404, message: '项目未找到' })
}

useSeoMeta({
  title: project.value.title,
  description: project.value.description,
})

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
</script>
