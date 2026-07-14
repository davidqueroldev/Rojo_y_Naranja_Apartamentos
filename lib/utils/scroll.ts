/** Hace scroll suave hasta el elemento cuyo id coincide con `hash` (con o sin '#' inicial). */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
