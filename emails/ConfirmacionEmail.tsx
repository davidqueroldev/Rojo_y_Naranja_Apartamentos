import {
  Html, Head, Body, Preview, Container,
  Section, Heading, Text, Button, Hr, Link,
} from '@react-email/components'

interface Props {
  nombre: string
  confirmLink: string
}

export function ConfirmacionEmail({ nombre, confirmLink }: Props) {
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Confirma tu cuenta en Apartamentos Rojo y Naranja, Morella</Preview>
      <Body style={body}>
        <Container style={container}>

          <Section style={headerSection}>
            <Heading style={headerTitle}>Rojo y Naranja</Heading>
            <Text style={headerSub}>Apartamentos · Morella, Castellón</Text>
          </Section>

          <Section style={mainSection}>
            <Heading as="h2" style={h2}>Hola, {nombre}</Heading>
            <Text style={p}>
              Gracias por registrarte en Apartamentos Rojo y Naranja.
              Para activar tu cuenta y poder gestionar tus reservas,
              confirma tu dirección de email:
            </Text>

            <Button href={confirmLink} style={btn}>
              Confirmar mi cuenta
            </Button>

            <Text style={small}>
              Este enlace caduca en 24 horas. Si no has creado esta cuenta,
              puedes ignorar este email con total tranquilidad.
            </Text>

            <Hr style={hr} />

            <Text style={small}>Si el botón no funciona, copia y pega este enlace en tu navegador:</Text>
            <Link href={confirmLink} style={linkStyle}>{confirmLink}</Link>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              Apartamentos Rojo y Naranja · C/ San Nicolás, 11 · Morella (Castellón){'\n'}
              Registros turísticos: 23750-CS · 23751-CS · 27852-CS · 27853-CS
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

const body = { backgroundColor: '#FBF6EE', margin: '0', padding: '40px 0' }
const container = {
  maxWidth: '560px', margin: '0 auto',
  backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden' as const,
  boxShadow: '0 4px 24px rgba(28,25,22,0.08)',
}
const headerSection = { backgroundColor: '#AF2C0E', padding: '32px 40px' }
const headerTitle  = { color: '#FFFFFF', fontSize: '26px', margin: '0', fontWeight: '600', fontFamily: 'Georgia, serif', lineHeight: '1.1' }
const headerSub    = { color: '#F6E6DF', margin: '8px 0 0', fontSize: '13px', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' as const }
const mainSection  = { padding: '36px 40px' }
const h2 = { fontSize: '22px', color: '#1C1916', margin: '0 0 16px', fontFamily: 'Georgia, serif', fontWeight: '600' }
const p  = { color: '#3A332D', lineHeight: '1.65', margin: '0 0 28px', fontSize: '15px', fontFamily: 'Helvetica, Arial, sans-serif' }
const btn = {
  backgroundColor: '#AF2C0E', color: '#FFFFFF',
  padding: '14px 28px', borderRadius: '999px',
  textDecoration: 'none', fontWeight: '600',
  fontSize: '15px', fontFamily: 'Helvetica, Arial, sans-serif',
  display: 'inline-block' as const,
}
const small = { color: '#8D8078', fontSize: '13px', marginTop: '24px', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: '1.6' }
const hr = { borderColor: '#E4D9C8', margin: '28px 0 20px' }
const linkStyle = { color: '#C25437', fontSize: '12px', wordBreak: 'break-all' as const, fontFamily: 'Helvetica, Arial, sans-serif' }
const footerSection = { backgroundColor: '#F1E8DA', padding: '24px 40px' }
const footerText = { color: '#8D8078', fontSize: '12px', margin: '0', lineHeight: '1.7', fontFamily: 'Helvetica, Arial, sans-serif' }
