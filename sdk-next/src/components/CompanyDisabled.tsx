'use client';

import { Constants } from '@hike/sdk';
import { Button, Container, Group, Text, Title } from '@mantine/core';

export function CompanyDisabled() {
  return (
    <Container pt={80} pb={80}>
      <Title
        style={(theme) => ({
          fontFamily: `'Outfit', ${theme.fontFamily}`,
          textAlign: 'center',
          fontWeight: 500,
          fontSize: 38,

          [`@media (max-width: ${theme.breakpoints.sm})`]: {
            fontSize: 32,
          },
        })}
      >
        Company Disabled
      </Title>

      <Text
        c="dimmed"
        size="lg"
        ta="center"
        style={(theme) => ({
          maxWidth: 500,
          margin: 'auto',
          marginTop: theme.spacing.xl,
          marginBottom: `calc(1.5 * ${theme.spacing.xl})`,
        })}
      >
        This company has been disabled. If you think this is a mistake, contact our support line for further assistance.
      </Text>

      <Group justify="center">
        <Button variant="subtle" size="md"
          component="a"
          href={`mailto:${Constants.HIKE_SUPPORT_EMAIL}`}
        >
          {Constants.HIKE_SUPPORT_EMAIL}
        </Button>
      </Group>
    </Container>
  );
}
