import { Button, Heading, Section, Text } from '@react-email/components';
import * as React from 'react';
import { EmailLayout, styles } from './email-layout';

export function EmailVerify() {
  return (
    <EmailLayout preview="Verify your email to activate your Brand Style Generator account.">
      <Heading as="h1" style={styles.heading}>
        Verify your email
      </Heading>
      <Text style={styles.paragraph}>
        You&rsquo;re almost there. Click the button below to verify your email
        address and activate your account.
      </Text>
      <Section style={styles.buttonContainer}>
        <Button href="${link}" style={styles.button}>
          Verify Email
        </Button>
      </Section>
      <Text style={styles.muted}>
        If you didn&rsquo;t create an account, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}

export default EmailVerify;
