import { Button, Heading, Section, Text } from '@react-email/components';
import * as React from 'react';
import { EmailLayout, styles } from './email-layout';

export function SignInPasswordless() {
  return (
    <EmailLayout preview="Your magic link for Brand Style Generator.">
      <Heading as="h1" style={styles.heading}>
        Sign in with magic link
      </Heading>
      <Text style={styles.paragraph}>
        Click the button below to securely sign in to your account. This link
        will expire in a few minutes.
      </Text>
      <Section style={styles.buttonContainer}>
        <Button href="${link}" style={styles.button}>
          Sign In
        </Button>
      </Section>
      <Text style={styles.muted}>
        If you didn&rsquo;t request this link, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}

export default SignInPasswordless;
