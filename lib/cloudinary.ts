const CLOUD = 'dssnptdcf'
const BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`

/**
 * Generate a Cloudinary URL with automatic format and quality optimisation.
 * @param publicId  The Cloudinary public_id (without transforms or extension)
 * @param transforms  Optional additional transforms, e.g. 'w_1200,c_fill'
 */
export function cldUrl(publicId: string, transforms?: string): string {
  const t = transforms ? `${transforms},f_auto,q_auto` : 'f_auto,q_auto'
  return `${BASE}/${t}/${publicId}`
}

/** Pre-sized hero image (1920px wide, crop fill for 16:9-ish) */
export function cldHero(publicId: string): string {
  return cldUrl(publicId, 'w_1920,c_fill,ar_16:9')
}
