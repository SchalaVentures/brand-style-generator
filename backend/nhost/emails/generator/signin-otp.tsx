import { Heading, Text } from '@react-email/components';
import * as React from 'react';
import { EmailLayout, styles } from './email-layout';

export function SignInOTP() {
  const ticket = '${ticket}';
  return (
    <EmailLayout preview="Your one-time password for Brand Style Generator.">
      <Heading as="h1" style={styles.heading}>
        Your sign-in code
      </Heading>
      <Text style={styles.paragraph}>
        Enter this code to sign in to your account. It will expire in a few
        minutes.
      </Text>
      <Text style={styles.codeBlock}>{ticket}</Text>
      <Text style={styles.muted}>
        If you didn&rsquo;t request this code, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}

export default SignInOTP;
