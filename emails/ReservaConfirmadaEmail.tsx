import { Heading, Text, Button, Section } from '@react-email/components'
import { EmailLayout } from './EmailLayout'
import * as s from './estilos'

interface Props {
  nombre: string
  codigo: string
  apartamento: string
  checkin: string
  checkout: string
  reservaLink: string
}

export function ReservaConfirmadaEmail({ nombre, codigo, apartamento, checkin, checkout, reservaLink }: Props) {
  return (
    <EmailLayout preview={`¡Tu reserva está confirmada! [${codigo}]`}>
      <Heading as="h2" style={s.h2}>✅ ¡Reserva confirmada, {nombre}!</Heading>
      <Text style={s.p}>
        El propietario ha confirmado tu reserva. Ya solo queda que disfrutes de tu estancia en Morella.
      </Text>

      <Section style={s.datos}>
        <Text style={s.datosFila}><span style={s.datosLabel}>Código:</span> {codigo}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Apartamento:</span> {apartamento}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Fechas:</span> {checkin} → {checkout}</Text>
      </Section>

      <Button href={reservaLink} style={s.btn}>Ver mi reserva</Button>
    </EmailLayout>
  )
}
