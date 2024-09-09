import { Body, Button, Container, Head, Html, Preview, Section, Text } from '@react-email/components';
import { render } from '@react-email/render';

interface ClinicianRegistrationProps {
  firstName: string;
  wikiUrl: string;
  loginLink: string;
}

export const ClinicianRegistrationEmail = ({ firstName, wikiUrl, loginLink }: ClinicianRegistrationProps) => (
  <Html>
    <Head />
    <Preview>Getting Started with Insoles.ai | Pro Tips & Tricks</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Logo Section */}
        <Section style={headerSection}>
          {/* Add your logo */}
          <Text style={headerText}>Insoles.ai</Text>
        </Section>

        {/* Welcome Section */}
        <Section style={contentSection}>
          <Text style={title}>Welcome aboard, {firstName}!</Text>
          <Text style={paragraph}>
            We're thrilled you've chosen to explore <strong>Insoles.ai</strong>. Your journey to streamlined, compliant
            evaluation, ordering, and effortless scanning starts now.
          </Text>
        </Section>

        {/* Trial Overview Section */}
        <Section style={featureSection}>
          <Text style={subTitle}>Your Trial at a Glance:</Text>
          <ul style={featureList}>
            <li style={listItem}>3 Free Orders: Experience our platform's full capabilities</li>
            <li style={listItem}>Automated Certified Compliant Notes: Ensure accuracy and save time</li>
            <li style={listItem}>Cutting-Edge Scanning Solution: Simplify your workflow</li>
          </ul>
        </Section>

        {/* Getting Started Section */}
        <Section style={actionSection}>
          <Text style={subTitle}>Getting Started:</Text>
          <ul style={featureList}>
            <li style={listItem}>
              Access Our Comprehensive Wiki:{' '}
              <a href={wikiUrl} style={link}>
                Click Here{' '}
              </a>
              to dive into our user-friendly guide to make the most of your trial.
            </li>
            <li style={listItem}>
              Bookmark for Easy Access:{' '}
              <a href={loginLink} style={link}>
                {loginLink}
              </a>{' '}
              - Return to the platform anytime with this simple URL.
            </li>
          </ul>
        </Section>

        {/* Support Section */}
        <Section style={helpSection}>
          <Text style={subTitle}>Need Support?</Text>
          <Text style={paragraph}>We're here to ensure your trial is a success:</Text>
          <ul style={contactList}>
            <li>
              Email: <strong>harsh@hikemedical.com</strong>
            </li>
            <li>
              Call/Text: <strong>309-306-3696</strong> for VIP trial support
            </li>
          </ul>
        </Section>

        {/* Call-to-Action Section */}
        <Section style={ctaSection}>
          <Text style={paragraph}>Ready to revolutionize your workflow?</Text>
          <Button style={ctaButton} href={loginLink}>
            Log in Now
          </Button>
          <Text style={paragraph}>Explore what Insoles.ai can do for you!</Text>
        </Section>

        {/* Closing Section */}
        <Section style={closingSection}>
          <Text style={paragraph}>
            Best regards,
            <br />
            The Insoles.ai Team
          </Text>
          <Text style={paragraph}>
            P.S. Have questions or feedback? We're all ears! Your input helps us enhance your experience.
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

export default ClinicianRegistrationEmail;

export const clinicianRegistrationEmailHTML = async (params: ClinicianRegistrationProps) => {
  return await render(
    <ClinicianRegistrationEmail firstName={params.firstName} wikiUrl={params.wikiUrl} loginLink={params.loginLink} />
  );
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

const logoStyle = {
  maxWidth: '150px',
  marginBottom: '10px'
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

const link = {
  color: '#004dcf',
  textDecoration: 'none'
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

const ctaSection = {
  padding: '30px 40px',
  backgroundColor: '#f9fafc'
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
