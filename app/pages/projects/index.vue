<template>
  <div class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold font-mono tracking-tight">
        项目
      </h1>
      <p class="text-sm text-neutral-400 mt-2">
        开源项目与个人作品集
      </p>
    </div>

    <div
      v-if="filteredProjects?.length"
      class="glass p-6"
    >
      <template
        v-for="(project, i) in filteredProjects"
        :key="project.id"
      >
        <div
          v-if="i > 0"
          class="border-b border-black/5 dark:border-white/5 my-1"
        />
        <div class="py-4 -mx-3 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <div class="flex items-center gap-2 mb-1">
            <span class="w-1.5 h-1.5 rounded-full shrink-0 bg-neutral-400" />
            <NuxtLink
              :to="`/projects/${project.stem.split('/').pop()}`"
              class="text-sm font-medium link-underline"
            >
              {{ project.title }}
            </NuxtLink>
            <span class="text-[10px] font-mono text-neutral-400 px-1.5 py-0.5 rounded border border-black/10 dark:border-white/10">
              {{ statusLabel(project.status) }}
            </span>
          </div>
          <p class="text-xs text-neutral-400 ml-4">
            {{ project.description }}
          </p>
          <div
            v-if="project.techStack?.length"
            class="flex flex-wrap gap-1 ml-4 mt-2"
          >
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="text-[10px] font-mono text-neutral-400"
            >#{{ tech }}</span>
          </div>
          <div class="flex gap-4 ml-4 mt-2">
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              class="text-xs font-mono text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors flex items-center gap-1"
            >
              <UIcon
                name="i-lucide-external-link"
                class="w-3 h-3"
              /> demo
            </a>
            <a
              v-if="project.repo"
              :href="project.repo"
              target="_blank"
              class="text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors flex items-center gap-1"
            >
              <UIcon
                name="i-simple-icons-github"
                class="w-3 h-3"
              /> source
            </a>
          </div>
        </div>
      </template>
    </div>
    <p
      v-else
      class="glass p-12 text-center font-mono text-sm text-neutral-400"
    >
      // 还没有项目
    </p>
  </div>
</template>

<script setup>
useSeoMeta({ title: '项目', description: '开源项目与个人作品集' })
const selectedStatus = ref('all')
const { data: projects } = await useAsyncData('projects-all', () =>
  queryCollection('projects').order('date', 'DESC').all()
)
const filteredProjects = computed(() => {
  if (selectedStatus.value === 'all') return projects.value
  return projects.value?.filter(p => p.status === selectedStatus.value)
})
function statusLabel(s) {
  return { completed: '已完成', active: '进行中', archived: '已归档', planned: '计划中' }[s] || s
}
</script>
