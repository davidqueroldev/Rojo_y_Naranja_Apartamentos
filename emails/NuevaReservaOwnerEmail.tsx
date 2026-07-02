import { Heading, Text, Button, Section } from '@react-email/components'
import { EmailLayout } from './EmailLayout'
import * as s from './estilos'

interface Props {
  nombreHuesped: string
  codigo: string
  apartamento: string
  checkin: string
  checkout: string
  huespedes: number
  precioTotal: string
  reservaLink: string
}

export function NuevaReservaOwnerEmail({ nombreHuesped, codigo, apartamento, checkin, checkout, huespedes, precioTotal, reservaLink }: Props) {
  return (
    <EmailLayout preview={`Nueva reserva pendiente — [${codigo}]`}>
      <Heading as="h2" style={s.h2}>🔔 Nueva reserva pagada</Heading>
      <Text style={s.p}>
        {nombreHuesped} ha completado el pago de una reserva. Está pendiente de tu confirmación.
      </Text>

      <Section style={s.datos}>
        <Text style={s.datosFila}><span style={s.datosLabel}>Código:</span> {codigo}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Huésped:</span> {nombreHuesped}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Apartamento:</span> {apartamento}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Fechas:</span> {checkin} → {checkout}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Huéspedes:</span> {huespedes}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Total:</span> {precioTotal}</Text>
      </Section>

      <Button href={reservaLink} style={s.btn}>Revisar y confirmar</Button>
    </EmailLayout>
  )
}
