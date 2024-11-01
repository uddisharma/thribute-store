import { Container, Html, Section, Text } from '@react-email/components';

export default function ContactUsEmail(message: string) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text>{message}</Text>
        </Container>
      </Section>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '100%',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
};
