import { stripe } from './client'
import type { Stripe } from 'stripe'

export function construirEvento(body: string, signature: string): Stripe.Event {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
}
