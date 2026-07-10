<template>
  <div id="tsparticles-container" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { tsParticles } from '@tsparticles/engine'
import { loadStarsPreset } from '@tsparticles/preset-stars'

let initialized = false

onMounted(async () => {
  await loadStarsPreset(tsParticles)
  await tsParticles.load({
    id: 'tsparticles-container',
    options: {
      preset: 'stars',
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: 'transparent' },
      particles: {
        number: { value: 300 },
        color: { value: '#888888' },
        opacity: {
          value: { min: 0.1, max: 0.6 },
          animation: { enable: true, speed: 0.5 },
        },
        size: {
          value: { min: 0.5, max: 2 },
          animation: { enable: true, speed: 2, sync: false },
        },
        move: { enable: true, speed: 0.15, direction: 'none', random: true },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'slow' } },
        modes: { slow: { factor: 0.3, distance: 200 } },
      },
    },
  })
  initialized = true
})

onUnmounted(() => {
  if (initialized) {
    tsParticles.destroy('tsparticles-container')
  }
})
</script>

<style scoped>
#tsparticles-container {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
</style>
