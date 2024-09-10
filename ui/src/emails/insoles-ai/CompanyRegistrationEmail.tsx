import { Body, Button, Container, Head, Html, Preview, Section, Text } from '@react-email/components';
import { render } from '@react-email/render';

interface CompanyRegistrationProps {
  registrationLink: string;
}

export const CompanyRegistrationEmail = ({ registrationLink }: CompanyRegistrationProps) => (
  <Html>
    <Head />
    <Preview>Try Insoles.AI - Your All-in-One Foot Orthotic Solution</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Text style={headerText}>Insoles.AI</Text>
        </Section>

        <Section style={contentSection}>
          <Text style={title}>You're Invited to Try Insoles.AI</Text>
          <Text style={paragraph}>
            Hey there,
            <br />
            We're excited to invite you to try <strong>Insoles.AI</strong> - your all-in-one solution for foot orthotic
            evaluations and orders.
          </Text>
        </Section>

        <Section style={featureSection}>
          <Text style={subTitle}>Your Free Trial Includes:</Text>
          <ul style={featureList}>
            <li style={listItem}>3 FREE foot orthotic orders</li>
            <li style={listItem}>10-minute patient evaluations</li>
            <li style={listItem}>Instant compliant progress notes</li>
          </ul>
        </Section>

        <Section style={actionSection}>
          <Text style={subTitle}>Get Started in 3 Easy Steps:</Text>
          <ol style={stepsList}>
            <li style={listItem}>Click the button below to register.</li>
            <li style={listItem}>Set up your account.</li>
            <li style={listItem}>Start your first evaluation!</li>
          </ol>
          <Button style={ctaButton} href={registrationLink}>
            Register Now
          </Button>
        </Section>

        <Section style={helpSection}>
          <Text style={subTitle}>Need Help?</Text>
          <Text style={paragraph}>Feel free to reach out to us for any assistance:</Text>
          <ul style={contactList}>
            <li>
              Call/Text: <strong>309-306-3696</strong>
            </li>

            <li>
              <a href="mailto:harsh@hikemedical.com" style={link}>
                Email: harsh@hikemedical.com
              </a>
            </li>
          </ul>
        </Section>

        <Section style={closingSection}>
          <Text style={paragraph}>Don't miss out on revolutionizing your practice!</Text>
          <Text style={paragraph}>
            Best,
            <br />
            The Insoles.ai Team
          </Text>
        </Section>

        <hr style={divider} />

        <Section style={footerSection}>
          <Text style={footerText}>© {new Date().getFullYear()} Insoles.AI - All rights reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default CompanyRegistrationEmail;

export const companyRegistrationEmailHTML = async (registrationLink: string) => {
  return await render(<CompanyRegistrationEmail registrationLink={registrationLink} />);
};

export // Styling
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

const headerText = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: 0
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

const featureSection = {
  backgroundColor: '#f0f4ff',
  padding: '20px 40px',
  borderRadius: '8px',
  margin: '20px 40px'
};

const subTitle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '10px',
  color: '#004dcf'
};

const link = {
  color: '#004dcf',
  textDecoration: 'none'
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

const actionSection = {
  padding: '30px 40px'
};

const stepsList = {
  paddingLeft: '20px',
  marginBottom: '20px'
};

const ctaButton = {
  backgroundColor: '#004dcf',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 24px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  borderRadius: '8px',
  display: 'inline-block'
};

const helpSection = {
  padding: '20px 40px',
  backgroundColor: '#f9fafc',
  borderRadius: '8px',
  marginTop: '20px'
};

const contactList = {
  paddingLeft: '20px'
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
