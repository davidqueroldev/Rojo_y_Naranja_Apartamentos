import { Heading, Text, Button, Section } from '@react-email/components'
import { EmailLayout } from './EmailLayout'
import * as s from './estilos'

interface Props {
  nombreHuesped: string
  contenido: string
  chatLink: string
}

export function NuevoMensajeOwnerEmail({ nombreHuesped, contenido, chatLink }: Props) {
  return (
    <EmailLayout preview={`Nuevo mensaje de ${nombreHuesped}`}>
      <Heading as="h2" style={s.h2}>💬 Nuevo mensaje de {nombreHuesped}</Heading>
      <Text style={s.p}>El modo IA está desactivado en esta conversación, así que te toca responder tú.</Text>

      <Section style={s.datos}>
        <Text style={s.datosFila}>&quot;{contenido}&quot;</Text>
      </Section>

      <Button href={chatLink} style={s.btn}>Responder en el chat</Button>
    </EmailLayout>
  )
}
