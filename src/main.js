const menuButton = document.querySelector('.menu-toggle')
const navigation = document.querySelector('.site-header nav')

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('nav-open')
  menuButton.setAttribute('aria-expanded', String(isOpen))
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation')
  document.body.classList.toggle('menu-open', isOpen)
})

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('nav-open')
    menuButton?.setAttribute('aria-expanded', 'false')
    menuButton?.setAttribute('aria-label', 'Open navigation')
    document.body.classList.remove('menu-open')
  })
})

document.querySelector('#copyright-year').textContent = new Date().getFullYear()

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
const roles = ['Frontend Developer', 'UI/UX Designer', 'QA Engineer', 'Mobile App Developer', 'Web Developer', 'Software Engineer']
const roleTarget = document.querySelector('.rotating-role')
if (roleTarget && !reducedMotion) {
  let roleIndex = 0
  window.setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length
    roleTarget.classList.add('role-changing')
    window.setTimeout(() => {
      roleTarget.textContent = roles[roleIndex]
      roleTarget.classList.remove('role-changing')
    }, 180)
  }, 2600)
}

const progress = document.querySelector('.scroll-progress')
const backToTop = document.querySelector('.back-to-top')
let scrollFrame = 0
const updateScrollUI = () => {
  cancelAnimationFrame(scrollFrame)
  scrollFrame = requestAnimationFrame(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    const amount = scrollable > 0 ? window.scrollY / scrollable : 0
    progress?.style.setProperty('--scroll-progress', String(amount))
    backToTop?.classList.toggle('is-visible', window.scrollY > 520)
  })
}
window.addEventListener('scroll', updateScrollUI, { passive: true })
window.addEventListener('resize', updateScrollUI)
updateScrollUI()
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
})

const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')]
const pageSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean)
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready')
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' })
  document.querySelectorAll('.section-heading, .about-grid, .info-card, .skill-card, .project-card, .education-card, .cert-card, .achievement-card, .contact-top, .contact-copy, .contact-form').forEach((item) => {
    item.classList.add('reveal')
    revealObserver.observe(item)
  })
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
    })
  }, { rootMargin: '-35% 0px -55% 0px' })
  pageSections.forEach((section) => sectionObserver.observe(section))
}

if (!reducedMotion && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const tiltCards = document.querySelectorAll('.project-card, .skill-card, .cert-card, .achievement-card, .education-card, .info-card')
  tiltCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return
      const bounds = card.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width
      const y = (event.clientY - bounds.top) / bounds.height
      const maxTilt = card.matches('.project-card') ? 14 : 10
      card.style.setProperty('--tilt-x', `${(0.5 - y) * maxTilt}deg`)
      card.style.setProperty('--tilt-y', `${(x - 0.5) * maxTilt}deg`)
    })
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--tilt-x')
      card.style.removeProperty('--tilt-y')
    })
  })
}

const projectDetails = {
  eventsphere: { title: 'EventSphere', description: 'A multi-agent event and venue booking platform with QR-code digital tickets, venue scheduling, and booking management.', tags: ['Python', 'FastAPI', 'PostgreSQL', 'JavaScript', 'Bootstrap 5'], repo: 'https://github.com/UshaniDhanushika/EventSphere', demo: 'https://eventsphere-production-44d01550.up.railway.app/login' },
  eventrent: { title: 'EventRentLK', description: 'An individual event equipment rental system project. The interface is built with React and Vite, with a Spring Boot backend and MongoDB.', tags: ['React.js', 'Vite', 'Vanilla CSS', 'Spring Boot', 'MongoDB'], repo: 'https://github.com/UshaniDhanushika/EventRentLK-event-items-rental-system' },
  rentorax: { title: 'RentoraX', description: 'A team-built next-generation rental platform using a full-stack Java toolchain and a modern React interface.', tags: ['React.js', 'Java', 'Spring Boot', 'MongoDB', 'Tailwind CSS', 'Vite'], repo: 'https://github.com/lakruwanipabasara/RentoraX' },
  isa: { title: 'ISA School Visit Scheduling System', description: 'A mobile and web system for managing school visits and reports.', tags: ['Mobile', 'Web', 'School visit scheduling', 'Reporting'], repo: 'https://github.com/UshaniDhanushika' },
  research: { title: 'Rose Image Appearance Prediction', description: 'Final-year research in progress: developing a conditional generative model to predict a rose’s future appearance from an initial image, environmental conditions, and chemical treatment.', tags: ['Conditional GAN', 'Diffusion models', 'Deep learning', 'Python', 'PyTorch'], repo: null },
  predictor: { title: 'Student Performance Predictor', description: 'A machine learning project exploring student performance prediction. See the repository for implementation details.', tags: ['Machine Learning', 'Python'], repo: 'https://github.com/UshaniDhanushika/student-performance-predictor' },
  qa: { title: 'QA Portfolio — SauceDemo & Restful-Booker', description: 'A software quality assurance portfolio covering the SauceDemo shopping experience and Restful-Booker API.', tags: ['Software QA', 'Test cases', 'SauceDemo', 'Restful-Booker'], repo: 'https://github.com/UshaniDhanushika/qa-portfolio-saucedemo' },
}
const dialog = document.querySelector('.project-dialog')
document.querySelectorAll('.detail-button').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projectDetails[button.dataset.project]
    if (!project || !dialog) return
    dialog.querySelector('#dialog-title').textContent = project.title
    dialog.querySelector('.dialog-description').textContent = project.description
    const tags = dialog.querySelector('.dialog-tags')
    tags.replaceChildren(...project.tags.map((tag) => {
      const chip = document.createElement('span')
      chip.textContent = tag
      return chip
    }))
    const actions = dialog.querySelector('.dialog-actions')
    actions.replaceChildren()
    if (project.repo) {
      const repo = document.createElement('a')
      repo.href = project.repo
      repo.target = '_blank'
      repo.rel = 'noopener noreferrer'
      repo.className = 'button button-primary'
      repo.innerHTML = 'View repository <span>↗</span>'
      actions.append(repo)
    } else {
      const note = document.createElement('span')
      note.className = 'dialog-note'
      note.textContent = 'Repository link not provided'
      actions.append(note)
    }
    if (project.demo) {
      const demo = document.createElement('a')
      demo.href = project.demo
      demo.target = '_blank'
      demo.rel = 'noopener noreferrer'
      demo.className = 'button button-quiet'
      demo.textContent = 'Live demo ↗'
      actions.append(demo)
    }
    dialog.showModal()
  })
})
dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close())
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close()
})

const form = document.querySelector('#contact-form')
const formFeedback = form?.querySelector('.form-feedback')
const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim()

form?.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!form.reportValidity()) return
  const values = new FormData(form)
  const submitButton = form.querySelector('[type="submit"]')
  const originalButtonMarkup = submitButton.innerHTML
  formFeedback.hidden = false
  formFeedback.classList.remove('is-error')
  submitButton.disabled = true
  submitButton.textContent = 'Sending…'

  try {
    if (!formspreeEndpoint) {
      const subject = encodeURIComponent(values.get('subject'))
      const body = encodeURIComponent(`From: ${values.get('name')} (${values.get('email')})\n\n${values.get('message')}`)
      formFeedback.textContent = 'Online delivery is not configured yet. Opening an email draft instead.'
      window.location.href = `mailto:ushanidhanushika2000@gmail.com?subject=${subject}&body=${body}`
      return
    }

    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: values,
    })
    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      const message = Array.isArray(result.errors)
        ? result.errors.map((error) => error.message).filter(Boolean).join(' ')
        : ''
      throw new Error(message || 'Your message could not be sent. Please try again.')
    }

    formFeedback.textContent = 'Thanks! Your message was sent successfully.'
    form.reset()
  } catch (error) {
    formFeedback.classList.add('is-error')
    formFeedback.textContent = error instanceof TypeError
      ? 'We could not reach the email service. Please try again in a moment.'
      : error.message
  } finally {
    submitButton.disabled = false
    submitButton.innerHTML = originalButtonMarkup
  }
})
