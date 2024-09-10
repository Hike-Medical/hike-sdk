import { Body, Container, Head, Html, Preview, Section, Text } from '@react-email/components';
import { render } from '@react-email/render';

interface FreeTrialCompletionEmailProps {
  schedulingLink: string;
}

export const FreeTrialCompletionEmail = ({ schedulingLink }: FreeTrialCompletionEmailProps) => (
  <Html>
    <Head />

    <Preview>Congrats on completing your trial with Insoles.ai! Next steps...</Preview>

    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Text style={headerText}>Insoles.AI</Text>
        </Section>

        {/* Welcome Section */}
        <Section style={contentSection}>
          <Text style={paragraph}>
            Congratulations on utilizing all your free trial orders with <strong>Insoles.ai</strong>! We hope you've
            experienced the power of our platform in streamlining your foot orthotic evaluations and orders.
          </Text>
        </Section>

        {/* Next Steps Section */}
        <Section style={actionSection}>
          <Text style={subTitle}>What's Next?</Text>
          <ul style={featureList}>
            <li style={listItem}>
              <strong>Book a 15 Minute Demo & Onboarding Call:</strong>
              <br /> If you’re ready to explore how Insoles.ai can further transform your practice,{' '}
              <a href={schedulingLink} style={link}>
                Click the link to schedule a personalized demo with our team.
              </a>
            </li>
            <li style={listItem}>
              <strong>VIP Support:</strong> Our VIP Trial Team has been notified and will be reaching out shortly to
              discuss upgrading your account and share more about moving forward with Insoles.ai.
            </li>
          </ul>
        </Section>

        {/* Benefits Section */}
        <Section style={featureSection}>
          <Text style={subTitle}>Don't let the momentum stop! By continuing with Insoles.ai, you'll enjoy:</Text>
          <ul style={featureList}>
            <li style={listItem}>Unlimited patient evaluations</li>
            <li style={listItem}>Streamlined ordering process</li>
            <li style={listItem}>7-day foot orthotic turnaround</li>
            <li style={listItem}>Superpower-like AI features</li>
          </ul>
        </Section>

        {/* Closing Section */}
        <Section style={closingSection}>
          <Text style={paragraph}>
            We're excited about the possibility of supporting your practice long-term. Let's discuss how we can tailor
            Insoles.ai to your specific needs.
          </Text>
          <Text style={paragraph}>
            Best regards,
            <br />
            The Insoles.ai Team
          </Text>
          <Text style={paragraph}>
            P.S. Have immediate questions? Reach out to our VIP support at{' '}
            <a href="mailto:harsh@hikemedical.com" style={link}>
              harsh@hikemedical.com
            </a>
            .
          </Text>
        </Section>

        <hr style={divider} />

        {/* Footer Section */}
        <Section style={footerSection}>
          <Text style={footerText}>© {new Date().getFullYear()} Insoles.AI - All rights reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default FreeTrialCompletionEmail;

export const freeTrialCompletionEmailHTML = async (props: FreeTrialCompletionEmailProps) => {
  return await render(<FreeTrialCompletionEmail schedulingLink={props.schedulingLink} />);
};

// Styling
const main = {
  backgroundColor: '#f4f6f8',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: '40px 0'
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden'
};

const headerSection = {
  backgroundColor: '#004dcf',
  padding: '20px',
  textAlign: 'center' as const
};

const contentSection = {
  padding: '30px 40px'
};

const title = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '10px',
  color: '#333'
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#555'
};

const actionSection = {
  padding: '20px 40px',
  backgroundColor: '#f9fafc',
  borderRadius: '8px',
  margin: '20px 40px'
};

const subTitle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '10px',
  color: '#004dcf'
};

const featureList = {
  paddingLeft: '20px',
  marginTop: '10px'
};

const listItem = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#555',
  marginBottom: '10px'
};

const link = {
  color: '#004dcf',
  textDecoration: 'none'
};

const featureSection = {
  padding: '20px 40px',
  backgroundColor: '#f0f4ff',
  borderRadius: '8px',
  margin: '20px 40px'
};

const headerText = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: 0
};

const closingSection = {
  padding: '30px 40px',
  backgroundColor: '#f9fafc'
};

const divider = {
  border: '1px solid #e0e0e0',
  margin: '20px 0'
};

const footerSection = {
  padding: '20px',
  backgroundColor: '#004dcf',
  color: '#ffffff',
  textAlign: 'center' as const,
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px'
};

const footerText = {
  fontSize: '14px',
  color: '#ffffff',
  margin: 0
};
