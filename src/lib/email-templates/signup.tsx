import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Verify your Purève Seoul account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>PURÈVE SEOUL</Text>
        <Heading style={h1}>Verify your email</Heading>
        <Text style={text}>
          Thank you for creating your account at{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          .
        </Text>
        <Text style={text}>
          Please verify this email address (
          <Link href={`mailto:${recipient}`} style={link}>
            {recipient}
          </Link>
          ) to finish your sign-up.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Verify email
        </Button>
        <Text style={helperText}>If the button does not open, copy and paste this link into your browser:</Text>
        <Link href={confirmationUrl} style={urlText}>{confirmationUrl}</Link>
        <Text style={footer}>
          If you didn't create an account, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

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
  margin: '0 0 22px',
}
const text = {
  fontSize: '14px',
  color: '#3f4248',
  lineHeight: '1.65',
  margin: '0 0 22px',
}
const link = { color: '#111111', textDecoration: 'underline' }
const button = {
  backgroundColor: '#000000',
  color: '#ffffff',
  fontSize: '14px',
  borderRadius: '999px',
  padding: '14px 28px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '2px 0 22px',
}
const helperText = { fontSize: '12px', color: '#777777', lineHeight: '1.5', margin: '0 0 8px' }
const urlText = { color: '#3f6f9f', fontSize: '12px', lineHeight: '1.5', wordBreak: 'break-all' as const }
const footer = { fontSize: '12px', color: '#999999', lineHeight: '1.5', margin: '30px 0 0' }
