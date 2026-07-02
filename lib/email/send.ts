import type { ReactElement } from 'react'
import { render } from '@react-email/components'
import { transporter } from './mailer'

export async function enviarEmail({ to, subject, react }: { to: string; subject: string; react: ReactElement }) {
  const html = await render(react)
  await transporter.sendMail({
    from: `"Apartamentos Rojo y Naranja" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  })
}
