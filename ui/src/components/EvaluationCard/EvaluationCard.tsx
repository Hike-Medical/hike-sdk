import type { EvaluationStatus } from '@hike/types';
import { toTitleCase } from '@hike/utils';
import { Badge, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { IconCircle } from '@tabler/icons-react';

export interface EvaluationCardProps {
  firstName: string;
  middleName?: string;
  lastName: string;
  patientId: string;
  birthDate?: Date;
  poNumber?: string;
  evaluationStatus: EvaluationStatus;
  clinician?: string;
  importedAt: Date;
  startedAt?: Date;
  submittedAt?: Date;
  authorizedAt?: Date;
  cancelledAt?: Date;
  completedAt?: Date;
}

export function EvaluationCard({
  firstName,
  middleName,
  lastName,
  patientId,
  birthDate,
  poNumber,
  clinician,
  evaluationStatus,
  importedAt,
  startedAt,
  submittedAt,
  authorizedAt,
  cancelledAt,
  completedAt
}: EvaluationCardProps) {
  const renderBadgeText = () => {
    switch (evaluationStatus) {
      case 'NOT_STARTED':
        return 'Not Started';
      case 'INCOMPLETE':
        return 'Incomplete';
      case 'AWAITING_AUTH':
        return 'Awaiting Authorization';
      case 'PROCESSING':
        return 'Processing';
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return '';
    }
  };

  const renderStatusColor = () => {
    switch (evaluationStatus) {
      case 'NOT_STARTED':
        return '#F1F3F5';
      case 'INCOMPLETE':
        return '#868E96';
      case 'AWAITING_AUTH':
        return '#FFF3BF';
      case 'PROCESSING':
        return '#006CEA1A';
      case 'COMPLETED':
        return '#69DB7C';
      case 'CANCELLED':
        return '#FFC9C9';
      default:
        return '';
    }
  };

  const renderButtonText = () => {
    switch (evaluationStatus) {
      case 'NOT_STARTED':
        return 'Start Evaluation';
      case 'INCOMPLETE':
        return 'Resume Evaluation';
      case 'AWAITING_AUTH':
      case 'PROCESSING':
      case 'COMPLETED':
      case 'CANCELLED':
        return 'View Evaluation';
      default:
        return '';
    }
  };

  const renderTimestampText = () => {
    switch (evaluationStatus) {
      case 'NOT_STARTED':
        return `Imported On: ${importedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`;
      case 'INCOMPLETE':
        return (
          startedAt &&
          `Started On: ${startedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`
        );
      case 'AWAITING_AUTH':
        return (
          submittedAt &&
          `Submitted On: ${submittedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`
        );
      case 'PROCESSING':
        return (
          authorizedAt &&
          `Authorized At: ${authorizedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`
        );
      case 'COMPLETED':
        return (
          completedAt &&
          `Completed At: ${completedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`
        );
      case 'CANCELLED':
        return (
          cancelledAt &&
          `Cancelled At: ${cancelledAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`
        );
      default:
        return '';
    }
  };
  return (
    <Paper shadow="md" p="md" style={{ maxWidth: 400 }}>
      <Stack gap={'xs'} mb={5}>
        <Group justify="space-between">
          <Group gap="xs">
            <Text fw={600} size="20px">
              {toTitleCase(firstName)} {middleName && toTitleCase(middleName)} {toTitleCase(lastName)} - {patientId}
            </Text>
            <IconCircle size="14" color={renderStatusColor()} fill={renderStatusColor()} />
          </Group>
        </Group>
        {poNumber && (
          <Text fw={500} size="12px">
            PO: {poNumber}
          </Text>
        )}
        {birthDate && (
          <Text fw={500} size="12px">
            DOB: {birthDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
          </Text>
        )}
        {clinician && (
          <Text fw={500} size="12px">
            Clinician: {clinician}
          </Text>
        )}
      </Stack>
      <Group gap={'xs'}>
        <Badge variant="filled" color={renderStatusColor()} tt="none" mt={10} p={15}>
          <Text fw={600} size="12px" c={evaluationStatus === 'INCOMPLETE' ? 'white' : 'black'} display={'inline'}>
            {' '}
            {renderBadgeText()}
          </Text>
        </Badge>
      </Group>

      <Group
        justify="space-between"
        mt={8}
        style={{
          borderTop: '2px solid #ADB5BD',
          padding: '10px'
        }}
      >
        <Text fw={500} size="12px">
          {renderTimestampText()}
        </Text>

        <Button color="#006CEA" pl={15} pr={15}>
          <Text fw={600} size="14px" c="white">
            {renderButtonText()}
          </Text>
        </Button>
      </Group>
    </Paper>
  );
}
