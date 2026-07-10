<template>
  <article>
    <div class="max-w-3xl mx-auto px-6 py-12">
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors mb-6"
      >
        ← 返回项目
      </NuxtLink>
      <div class="glass p-8 mb-8">
        <span class="text-[10px] font-mono px-2 py-0.5 rounded-full glass-sm mb-4 inline-block text-neutral-500">
          {{ statusLabel(project.status) }}
        </span>
        <h1 class="text-3xl font-bold tracking-tight font-mono">
          {{ project.title }}
        </h1>
        <p class="mt-4 text-neutral-400 leading-relaxed">
          {{ project.description }}
        </p>
        <div
          v-if="project.techStack?.length"
          class="flex flex-wrap gap-1.5 mt-6"
        >
          <span
            v-for="tech in project.techStack"
            :key="tech"
            class="text-xs font-mono px-2 py-1 rounded-md glass-sm"
          >{{ tech }}</span>
        </div>
        <div class="flex gap-3 mt-6">
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            class="glass-sm px-4 py-2 text-sm font-mono text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors flex items-center gap-1.5"
          >
            <UIcon
              name="i-lucide-external-link"
              class="w-3.5 h-3.5"
            /> demo
          </a>
          <a
            v-if="project.repo"
            :href="project.repo"
            target="_blank"
            class="glass-sm px-4 py-2 text-sm font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors flex items-center gap-1.5"
          >
            <UIcon
              name="i-simple-icons-github"
              class="w-3.5 h-3.5"
            /> source
          </a>
        </div>
      </div>
    </div>
    <div class="max-w-3xl mx-auto px-6">
      <div class="glass p-8 prose dark:prose-invert max-w-none pb-12">
        <ContentRenderer :value="project" />
      </div>
    </div>
    <div class="max-w-3xl mx-auto px-6 py-12 text-center">
      <NuxtLink
        to="/projects"
        class="glass-sm px-5 py-2 font-mono text-sm text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
      >← 返回项目</NuxtLink>
    </div>
  </article>
</template>

<script setup>
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const { data: project } = await useAsyncData(`project-${slug}`, () =>
  queryCollection('projects').where('stem', '=', `projects/${slug}`).first()
)
if (!project.value) throw createError({ statusCode: 404, message: '项目未找到' })
useSeoMeta({ title: project.value.title, description: project.value.description })
function statusLabel(s) {
  return { completed: '已完成', active: '进行中', archived: '已归档', planned: '计划中' }[s] || s
}
</script>
