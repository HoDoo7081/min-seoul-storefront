import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  siteName,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your login link for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>PURÈVE SEOUL</Text>
        <Heading style={h1}>Your login link</Heading>
        <Text style={text}>
          Click the button below to log in to {siteName}. This link will expire
          shortly.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Log In
        </Button>
        <Text style={helperText}>If the button does not open, copy and paste this link into your browser:</Text>
        <Text style={urlText}>{confirmationUrl}</Text>
        <Text style={footer}>
          If you didn't request this link, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '34px 28px', maxWidth: '520px' }
const eyebrow = {
  fontSize: '11px',
  letterSpacing: '0.18em',
  color: '#7aa6d6',
  margin: '0 0 18px',
}
const h1 = {
  fontSize: '26px',
  fontWeight: '500' as const,
  color: '#000000',
  margin: '0 0 20px',
}
const text = {
  fontSize: '14px',
  color: '#55575d',
  lineHeight: '1.5',
  margin: '0 0 25px',
}
const button = {
  backgroundColor: '#000000',
  color: '#ffffff',
  fontSize: '14px',
  borderRadius: '999px',
  padding: '14px 28px',
  textDecoration: 'none',
}
const helperText = { fontSize: '12px', color: '#777777', lineHeight: '1.5', margin: '24px 0 8px' }
const urlText = { color: '#3f6f9f', fontSize: '12px', lineHeight: '1.5', wordBreak: 'break-all' as const }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
