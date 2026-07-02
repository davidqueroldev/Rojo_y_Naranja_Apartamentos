import { Html, Head, Body, Preview, Container, Section, Heading, Text } from '@react-email/components'
import type { ReactNode } from 'react'
import * as s from './estilos'

export function EmailLayout({ preview, children }: { preview: string; children: ReactNode }) {
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          <Section style={s.headerSection}>
            <Heading style={s.headerTitle}>Rojo y Naranja</Heading>
            <Text style={s.headerSub}>Apartamentos · Morella, Castellón</Text>
          </Section>

          <Section style={s.mainSection}>{children}</Section>

          <Section style={s.footerSection}>
            <Text style={s.footerText}>
              Apartamentos Rojo y Naranja · C/ San Nicolás, 11 · Morella (Castellón){'\n'}
              Registros turísticos: 23750-CS · 23751-CS · 27852-CS · 27853-CS
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
