import { Button, Heading, Section, Text } from '@react-email/components';
import * as React from 'react';
import { EmailLayout, styles } from './email-layout';

export function EmailConfirmChange() {
  return (
    <EmailLayout preview="Confirm the email change for your Brand Style Generator account.">
      <Heading as="h1" style={styles.heading}>
        Confirm your new email
      </Heading>
      <Text style={styles.paragraph}>
        You requested to change the email address on your account. Click the
        button below to confirm this change.
      </Text>
      <Section style={styles.buttonContainer}>
        <Button href="${link}" style={styles.button}>
          Confirm Email Change
        </Button>
      </Section>
      <Text style={styles.muted}>
        If you didn&rsquo;t request this change, you can safely ignore this
        email. Your email address won&rsquo;t be updated.
      </Text>
    </EmailLayout>
  );
}

export default EmailConfirmChange;
