<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let ctx, particles, mouse, animationId
const PARTICLE_COUNT = 120
const CONNECT_DIST = 150
const MOUSE_RADIUS = 180

function resize() {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
}

function createParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.8 + 0.6,
    phase: Math.random() * Math.PI * 2
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()
  particles = Array.from({ length: PARTICLE_COUNT }, () =>
    createParticle(canvas.width, canvas.height)
  )
  mouse = { x: -9999, y: -9999 }
  window.addEventListener('resize', () => {
    resize()
    if (!canvasRef.value) return
    particles.forEach((p) => {
      p.x = Math.random() * canvasRef.value.width
      p.y = Math.random() * canvasRef.value.height
    })
  })
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })
  animate()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})

function animate() {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height
  ctx.clearRect(0, 0, w, h)
  const isDark = document.documentElement.classList.contains('dark')
  const time = Date.now() * 0.001

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // 波浪运动
    p.vx += Math.sin(time + p.phase) * 0.002
    p.vy += Math.cos(time + p.phase * 1.3) * 0.002

    // 鼠标交互
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < MOUSE_RADIUS) {
      const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
      p.vx -= (dx / (dist || 1)) * force * 0.03
      p.vy -= (dy / (dist || 1)) * force * 0.03
    }

    // 速度限制
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
    if (speed > 1) {
      p.vx *= 0.98
      p.vy *= 0.98
    }
    p.x += p.vx
    p.y += p.vy

    // 边界环绕
    if (p.x < -20) p.x = w + 20
    if (p.x > w + 20) p.x = -20
    if (p.y < -20) p.y = h + 20
    if (p.y > h + 20) p.y = -20

    // 画粒子
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.18)'
    ctx.fill()

    // 粒子发光
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'
    ctx.fill()

    // 连线
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx2 = p.x - p2.x
      const dy2 = p.y - p2.y
      const d = Math.sqrt(dx2 * dx2 + dy2 * dy2)
      if (d < CONNECT_DIST) {
        const alpha = (1 - d / CONNECT_DIST) * (isDark ? 0.15 : 0.07)
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = isDark ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
  animationId = requestAnimationFrame(animate)
}
</script>

<template>
  <canvas
    id="particle-canvas"
    ref="canvasRef"
  />
</template>
