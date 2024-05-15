import { toTitleCase } from '@hike/utils';
import { Badge, Box, Button, Group, Paper, Stack, Text } from '@mantine/core';

export interface PatientCardProps {
  firstName: string;
  middleName?: string;
  lastName: string;
  patientId: string;
  birthDate?: Date;
  lastVisit?: Date;
  isDiabetic: boolean;
  isVeteranAdministration: boolean;
  openEvaluation: () => void;
}

export function PatientCard({
  firstName,
  middleName,
  lastName,
  patientId,
  birthDate,
  lastVisit,
  isDiabetic,
  isVeteranAdministration,
  openEvaluation
}: PatientCardProps) {
  const renderBadge = (text: string) => (
    <Badge variant="filled" color="#006CEA1A" tt="none" mt={10} p={15}>
      <Text fw={600} size="12px" c="black">
        {' '}
        {text}
      </Text>
    </Badge>
  );

  return (
    <Paper shadow="md" p="md" style={{ maxWidth: 400 }}>
      <Stack gap={'xs'} mb={5}>
        <Text fw={600} size="20px">
          {toTitleCase(firstName)} {middleName && toTitleCase(middleName)} {toTitleCase(lastName)}
        </Text>
        <Text fw={500} size="12px">
          Patient ID: {patientId}
        </Text>
        {birthDate && (
          <Text fw={500} size="12px">
            DOB: {birthDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
          </Text>
        )}
      </Stack>
      <Group gap={'xs'}>
        {isDiabetic && renderBadge('Diabetic')}
        {isVeteranAdministration && renderBadge('VA')}
      </Group>

      <Group
        justify="space-between"
        mt={8}
        style={{
          borderTop: '2px solid #ADB5BD',
          padding: '10px'
        }}
      >
        {lastVisit ? (
          <Text fw={500} size="14px">
            Last Visit: {lastVisit.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
          </Text>
        ) : (
          <Box></Box>
        )}

        <Button color="#006CEA" pl={20} pr={20} onClick={openEvaluation}>
          <Text fw={600} size="14px" c="white">
            View Evaluations
          </Text>
        </Button>
      </Group>
    </Paper>
  );
}
