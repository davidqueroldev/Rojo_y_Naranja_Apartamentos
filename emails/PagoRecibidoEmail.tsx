import { Heading, Text, Button, Section } from '@react-email/components'
import { EmailLayout } from './EmailLayout'
import * as s from './estilos'

interface Props {
  nombre: string
  codigo: string
  apartamento: string
  checkin: string
  checkout: string
  huespedes: number
  precioTotal: string
  reservaLink: string
}

export function PagoRecibidoEmail({ nombre, codigo, apartamento, checkin, checkout, huespedes, precioTotal, reservaLink }: Props) {
  return (
    <EmailLayout preview={`Reserva recibida · Pendiente confirmación [${codigo}]`}>
      <Heading as="h2" style={s.h2}>¡Gracias, {nombre}!</Heading>
      <Text style={s.p}>
        Hemos recibido tu pago correctamente. Tu reserva está pendiente de confirmación
        por parte del propietario — te avisaremos en cuanto la confirme.
      </Text>

      <Section style={s.datos}>
        <Text style={s.datosFila}><span style={s.datosLabel}>Código:</span> {codigo}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Apartamento:</span> {apartamento}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Fechas:</span> {checkin} → {checkout}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Huéspedes:</span> {huespedes}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Total pagado:</span> {precioTotal}</Text>
      </Section>

      <Button href={reservaLink} style={s.btn}>Ver mi reserva</Button>
    </EmailLayout>
  )
}
