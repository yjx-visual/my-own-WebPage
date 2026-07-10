import anime from 'animejs/lib/anime.esm.js'

export function useAnime() {
  function staggerEnter(targets, opts) {
    const { delay = 60, distance = 20, duration = 500 } = opts || {}
    anime({
      targets,
      opacity: [0, 1],
      translateY: [distance, 0],
      easing: 'easeOutCubic',
      duration,
      delay: anime.stagger(delay)
    })
  }

  function slideEnter(targets, opts) {
    const { delay = 40, duration = 400 } = opts || {}
    anime({
      targets,
      opacity: [0, 1],
      translateX: [-12, 0],
      easing: 'easeOutQuad',
      duration,
      delay: anime.stagger(delay)
    })
  }

  return { staggerEnter, slideEnter }
}
