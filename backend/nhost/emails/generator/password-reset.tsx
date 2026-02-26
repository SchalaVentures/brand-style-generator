import { Button, Heading, Section, Text } from '@react-email/components';
import * as React from 'react';
import { EmailLayout, styles } from './email-layout';

export function PasswordReset() {
  return (
    <EmailLayout preview="Reset the password for your Brand Style Generator account.">
      <Heading as="h1" style={styles.heading}>
        Reset your password
      </Heading>
      <Text style={styles.paragraph}>
        We received a request to reset the password for your account. Click the
        button below to choose a new one.
      </Text>
      <Section style={styles.buttonContainer}>
        <Button href="${link}" style={styles.button}>
          Reset Password
        </Button>
      </Section>
      <Text style={styles.muted}>
        If you didn&rsquo;t request a password reset, you can safely ignore this
        email. Your password won&rsquo;t change.
      </Text>
    </EmailLayout>
  );
}

export default PasswordReset;
