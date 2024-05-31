import type { EvaluationStatus } from '@hike/types';
import { toTitleCase } from '@hike/utils';
import { ActionIcon, Badge, Button, Divider, Drawer, Group, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleX, IconMenu2 } from '@tabler/icons-react';
import { renderBadge } from '../PatientCard/RenderBadge';

export interface EvaluationCardProps {
  firstName: string;
  middleName?: string;
  lastName: string;
  patientId: string;
  birthDate?: Date;
  poNumber?: string;
  status: EvaluationStatus;
  clinician?: string;
  importedAt: Date;
  startedAt?: Date;
  submittedAt?: Date;
  authorizedAt?: Date;
  cancelledAt?: Date;
  completedAt?: Date;
  isVeteran: boolean;
  isDiabetic: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  drawerOptions?: JSX.Element;
  startEvaluation: () => void;
  navigateEvaluation: () => void;
}

export function EvaluationCard({
  firstName,
  middleName,
  lastName,
  patientId,
  birthDate,
  poNumber,
  clinician,
  status,
  importedAt,
  startedAt,
  submittedAt,
  authorizedAt,
  cancelledAt,
  completedAt,
  isLoading,
  isSuccess,
  isVeteran,
  isDiabetic,
  drawerOptions,
  startEvaluation,
  navigateEvaluation
}: EvaluationCardProps) {
  const [menuOpen, menuModalHandlers] = useDisclosure(false);
  const renderBadgeText = () => {
    switch (status) {
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
    switch (status) {
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
    switch (status) {
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
    switch (status) {
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
    <Paper withBorder p="md">
      <Stack gap={'xs'} mb={5}>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={600} size="20px" style={{ flexShrink: 2 }}>
            {toTitleCase(firstName)} {middleName && toTitleCase(middleName)} {toTitleCase(lastName)} - {patientId}
          </Text>
          {status !== 'NOT_STARTED' && status !== 'CANCELLED' && (
            <ActionIcon mr={4} variant="transparent" size="lg" onClick={() => menuModalHandlers.open()}>
              <IconMenu2 color="#000000" />
            </ActionIcon>
          )}
        </Group>
        {poNumber && (
          <Text fw={500} size="md">
            PO: {poNumber}
          </Text>
        )}
        {birthDate && (
          <Text fw={500} size="md">
            DOB: {birthDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
          </Text>
        )}
        {clinician && (
          <Text fw={500} size="md">
            Clinician: {clinician}
          </Text>
        )}
      </Stack>
      <Group gap={'xs'}>
        <Badge variant="filled" color={renderStatusColor()} tt="none" mt={10} p={15}>
          <Text fw={600} size="md" c={status === 'INCOMPLETE' ? 'white' : 'black'} display={'inline'}>
            {' '}
            {renderBadgeText()}
          </Text>
        </Badge>
      </Group>
      <Divider mt={10} />
      <Group
        justify="space-between"
        mt={8}
        style={{
          padding: '10px'
        }}
        wrap="nowrap"
      >
        <Text fw={500} size="md">
          {renderTimestampText()}
        </Text>

        <Button
          color="#006CEA"
          pl={15}
          pr={15}
          disabled={isSuccess}
          radius={10}
          loading={isLoading}
          onClick={status === 'NOT_STARTED' ? startEvaluation : navigateEvaluation}
          style={{ flexShrink: 0 }}
        >
          {renderButtonText()}
        </Button>
      </Group>
      <Drawer
        opened={menuOpen}
        onClose={() => menuModalHandlers.close()}
        position="bottom"
        radius={15}
        withCloseButton={false}
      >
        <Group justify="space-between" mt={10}>
          <Stack gap={'s'}>
            <Text fw={600} size="20px">
              {toTitleCase(firstName)} {middleName && toTitleCase(middleName)} {toTitleCase(lastName)}
            </Text>

            {poNumber && (
              <Text fw={500} size="md" c="#91A3B6">
                PO: {poNumber}
              </Text>
            )}
            {clinician && (
              <Text fw={500} size="md" c="#91A3B6">
                Clinician: {clinician}
              </Text>
            )}
          </Stack>
          <ActionIcon mr={20} variant="transparent" size="lg" onClick={() => menuModalHandlers.close()}>
            <IconCircleX color="#000000" size={30} />
          </ActionIcon>
        </Group>
        <Group gap={'xs'} mt={5}>
          {isDiabetic && renderBadge('Diabetic')}
          {isVeteran && renderBadge('VA')}
        </Group>

        <Divider m={20} />
        {drawerOptions}
      </Drawer>
    </Paper>
  );
}
