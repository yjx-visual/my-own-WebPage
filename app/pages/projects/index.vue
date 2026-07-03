<template>
  <UContainer class="py-12">
    <div class="max-w-3xl mx-auto mb-12">
      <h1 class="text-4xl font-bold mb-2">项目</h1>
      <p class="text-neutral-500">开源项目与个人作品集</p>
    </div>

    <!-- 状态筛选 -->
    <div class="max-w-3xl mx-auto mb-8 flex gap-2 flex-wrap">
      <UBadge
        v-for="s in statuses"
        :key="s.value"
        :label="s.label"
        :variant="selectedStatus === s.value ? 'solid' : 'subtle'"
        :color="selectedStatus === s.value ? 'primary' : 'neutral'"
        class="cursor-pointer"
        @click="selectedStatus = s.value"
      />
    </div>

    <!-- 项目列表 -->
    <div v-if="filteredProjects?.length" class="max-w-3xl mx-auto">
      <div class="space-y-6">
        <UCard v-for="project in filteredProjects" :key="project.id">
          <UBadge
            :label="statusLabel(project.status)"
            :color="statusColor(project.status)"
            variant="soft"
            size="sm"
            class="mb-2"
          />

          <NuxtLink
            :to="`/projects/${project.path}`"
            class="block font-semibold text-xl hover:underline"
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

          <div class="flex gap-3 mt-4">
            <UButton
              v-if="project.url"
              :to="project.url"
              target="_blank"
              variant="outline"
              size="sm"
              icon="i-lucide-external-link"
              label="在线演示"
            />
            <UButton
              v-if="project.repo"
              :to="project.repo"
              target="_blank"
              variant="outline"
              size="sm"
              icon="i-simple-icons-github"
              label="源代码"
            />
          </div>
        </UCard>
      </div>
    </div>

    <p v-else class="text-neutral-500 text-center py-12">
      还没有项目，敬请期待～
    </p>
  </UContainer>
</template>

<script setup>
useSeoMeta({ title: '项目', description: '开源项目与个人作品集' })

const selectedStatus = ref('all')

const statuses = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' },
  { value: 'archived', label: '已归档' },
  { value: 'planned', label: '计划中' },
]

const { data: projects } = await useAsyncData('projects-all', () =>
  queryCollection('projects').order('date', 'DESC').all(),
)

const filteredProjects = computed(() => {
  if (selectedStatus.value === 'all') return projects.value
  return projects.value?.filter((p) => p.status === selectedStatus.value)
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
