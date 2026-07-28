import { Heading, Text, Button, Section, Hr, Link } from '@react-email/components'
import { EmailLayout } from './EmailLayout'
import * as s from './estilos'

interface Props {
  nombre: string
  confirmLink: string
  tipo: 'generica' | 'reserva'
  apartamento?: string
  checkin?: string
  checkout?: string
}

export function SolicitudConfirmacionEmail({ nombre, confirmLink, tipo, apartamento, checkin, checkout }: Props) {
  const esReserva = tipo === 'reserva'

  return (
    <EmailLayout preview={esReserva
      ? 'Confirma tu solicitud de reserva en Apartamentos Rojo y Naranja, Morella'
      : 'Confirma tu consulta en Apartamentos Rojo y Naranja, Morella'}
    >
      <Heading as="h2" style={s.h2}>Hola, {nombre}</Heading>
      <Text style={s.p}>
        {esReserva
          ? 'Hemos recibido tu solicitud de reserva en Apartamentos Rojo y Naranja. Para que podamos gestionarla, confirma tu dirección de email:'
          : 'Hemos recibido tu consulta en Apartamentos Rojo y Naranja. Para que podamos gestionarla, confirma tu dirección de email:'}
      </Text>

      {esReserva && apartamento && checkin && checkout && (
        <Section style={s.datos}>
          <Text style={s.datosFila}><span style={s.datosLabel}>Apartamento:</span> {apartamento}</Text>
          <Text style={s.datosFila}><span style={s.datosLabel}>Fechas:</span> {checkin} → {checkout}</Text>
        </Section>
      )}

      <Button href={confirmLink} style={s.btn}>
        {esReserva ? 'Confirmar mi solicitud de reserva' : 'Confirmar mi consulta'}
      </Button>

      <Text style={s.small}>
        Este enlace caduca en 24 horas. Si no has solicitado {esReserva ? 'esta reserva' : 'esta consulta'},
        puedes ignorar este email con total tranquilidad.
      </Text>

      <Hr style={s.hr} />

      <Text style={s.small}>Si el botón no funciona, copia y pega este enlace en tu navegador:</Text>
      <Link href={confirmLink} style={s.linkStyle}>{confirmLink}</Link>
    </EmailLayout>
  )
}
