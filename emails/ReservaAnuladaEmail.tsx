import { Heading, Text, Button, Section } from '@react-email/components'
import { EmailLayout } from './EmailLayout'
import * as s from './estilos'

interface Props {
  nombre: string
  codigo: string
  apartamento: string
  reembolsado: boolean
  reservaLink: string
}

export function ReservaAnuladaEmail({ nombre, codigo, apartamento, reembolsado, reservaLink }: Props) {
  return (
    <EmailLayout preview={`Reserva anulada — [${codigo}]`}>
      <Heading as="h2" style={s.h2}>Reserva anulada</Heading>
      <Text style={s.p}>
        Hola {nombre}, tu reserva {codigo} en {apartamento} ha sido anulada.
        {reembolsado ? ' El importe pagado ha sido reembolsado a tu método de pago original y debería reflejarse en unos días.' : ''}
      </Text>

      <Section style={s.datos}>
        <Text style={s.datosFila}><span style={s.datosLabel}>Código:</span> {codigo}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Apartamento:</span> {apartamento}</Text>
        <Text style={s.datosFila}><span style={s.datosLabel}>Reembolso:</span> {reembolsado ? 'Sí' : 'No aplica'}</Text>
      </Section>

      <Button href={reservaLink} style={s.btn}>Ver detalles</Button>

      <Text style={s.small}>Si tienes dudas sobre esta anulación, contáctanos respondiendo a este email.</Text>
    </EmailLayout>
  )
}
