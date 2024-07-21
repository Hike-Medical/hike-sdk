import { toTitleCase } from '@hike/utils';
import { Box, Button, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import { renderBadge } from './RenderBadge';

export interface PatientCardProps {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate?: Date;
  evaluations?: {
    isDiabetic: boolean;
    isVeteran: boolean;
    startedAt?: Date;
  }[];
  openEvaluation: () => void;
  createEvaluation: () => void;
  startEvaluation?: () => void;
  isLoading: boolean;
  isSuccess: boolean;
}

export function PatientCard({
  id,
  firstName,
  middleName,
  lastName,
  birthDate,
  evaluations,
  openEvaluation,
  createEvaluation,
  startEvaluation,
  isLoading,
  isSuccess
}: PatientCardProps) {
  return (
    <Paper shadow="md" p="md">
      <Stack gap={'xs'} mb={5} onClick={openEvaluation}>
        <Text fw={600} size="20px">
          {toTitleCase(firstName)} {middleName && toTitleCase(middleName)} {toTitleCase(lastName)}
        </Text>
        <Text fw={500} size="md">
          Patient ID: {id}
        </Text>
        {birthDate && (
          <Text fw={500} size="md">
            DOB:{' '}
            {birthDate.toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
              timeZone: 'UTC'
            })}
          </Text>
        )}
      </Stack>
      {!!evaluations?.length ? (
        <>
          <Group gap={'xs'}>
            {evaluations[0]?.isDiabetic && renderBadge('Diabetic')}
            {evaluations[0]?.isVeteran && renderBadge('VA')}
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
            {evaluations[0]?.startedAt ? (
              <Text fw={500} size="14px">
                Last Visit:{' '}
                {evaluations[0].startedAt?.toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric'
                })}
              </Text>
            ) : (
              <Box></Box>
            )}
            <Button
              color="#006CEA"
              pl={20}
              pr={20}
              radius={10}
              onClick={openEvaluation}
              style={{ flexShrink: 0 }}
              loading={isLoading}
              disabled={isSuccess}
            >
              <Text fw={600} size="14px" c="white">
                Patient Evaluations
              </Text>
            </Button>
          </Group>
        </>
      ) : (
        <Group justify="space-between">
          <Box></Box>
          <Button
            color="#D3F9D8"
            pl={20}
            pr={20}
            radius={10}
            onClick={startEvaluation ?? createEvaluation}
            loading={isLoading}
            disabled={isSuccess}
          >
            <Text fw={600} size="14px" c="black">
              Start Evaluation
            </Text>
          </Button>
        </Group>
      )}
    </Paper>
  );
}
