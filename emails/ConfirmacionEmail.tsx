import { Heading, Text, Button, Hr, Link } from '@react-email/components'
import { EmailLayout } from './EmailLayout'
import * as s from './estilos'

interface Props {
  nombre: string
  confirmLink: string
}

export function ConfirmacionEmail({ nombre, confirmLink }: Props) {
  return (
    <EmailLayout preview="Confirma tu cuenta en Apartamentos Rojo y Naranja, Morella">
      <Heading as="h2" style={s.h2}>Hola, {nombre}</Heading>
      <Text style={s.p}>
        Gracias por registrarte en Apartamentos Rojo y Naranja.
        Para activar tu cuenta y poder gestionar tus reservas,
        confirma tu dirección de email:
      </Text>

      <Button href={confirmLink} style={s.btn}>
        Confirmar mi cuenta
      </Button>

      <Text style={s.small}>
        Este enlace caduca en 24 horas. Si no has creado esta cuenta,
        puedes ignorar este email con total tranquilidad.
      </Text>

      <Hr style={s.hr} />

      <Text style={s.small}>Si el botón no funciona, copia y pega este enlace en tu navegador:</Text>
      <Link href={confirmLink} style={s.linkStyle}>{confirmLink}</Link>
    </EmailLayout>
  )
}
