const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if ('IntersectionObserver' in window && !motionReduced) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section))
} else {
  document.querySelectorAll('.reveal').forEach((section) => section.classList.add('in-view'))
}

window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.reveal').forEach((section) => section.classList.add('in-view'))
})
