import { toTitleCase } from '@hike/utils';
import { Badge, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { IconCircle } from '@tabler/icons-react';
import React from 'react';


export enum EvaluationCardStatus {
    NOT_STARTED,
    CANCELLED,
    INCOMPLETE,
    AWAITING_AUTH,
    PROCESSING,
    COMPLETED,
  }

export interface EvaluationCardProps {
  firstName: string;
  middleName?:string;
  lastName: string;
  patientId: string;
  birthDate?: Date;
  poNumber?: string;
  evaluationStatus: EvaluationCardStatus;
  clinician?: string;
  importedAt: Date;
  startedAt?: Date;
  submittedAt?: Date
  authorizedAt?: Date
  cancelledAt?: Date
  completedAt?: Date
}

export default function EvaluationCard({
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
    console.log(React)

    const renderBadgeText = () => {
        switch (evaluationStatus) {
            case EvaluationCardStatus.NOT_STARTED:
            return 'Not Started';
            case EvaluationCardStatus.INCOMPLETE:
            return 'Incomplete';
            case EvaluationCardStatus.AWAITING_AUTH:
            return 'Awaiting Authorization';
            case EvaluationCardStatus.PROCESSING:
            return 'Processing';
            case EvaluationCardStatus.COMPLETED:
            return 'Completed';
            case EvaluationCardStatus.CANCELLED:
            return 'Cancelled';
            default:
            return '';
        }
    }

    const renderStatusColor = () => {
        switch (evaluationStatus) {
            case EvaluationCardStatus.NOT_STARTED:
            return '#868E96';
            case EvaluationCardStatus.INCOMPLETE:
            return '#868E96';
            case EvaluationCardStatus.AWAITING_AUTH:
            return '#FFF3BF';
            case EvaluationCardStatus.PROCESSING:
            return '#006CEA1A';
            case EvaluationCardStatus.COMPLETED:
            return '#69DB7C';
            case EvaluationCardStatus.CANCELLED:
            return '#868E96';
            default:
            return '';
        }
    }

    const renderButtonText = () => {
        switch (evaluationStatus) {
            case EvaluationCardStatus.NOT_STARTED:
            return 'Start Evaluation';
            case EvaluationCardStatus.INCOMPLETE:
            return 'Resume Evaluation';
            case EvaluationCardStatus.AWAITING_AUTH:
            case EvaluationCardStatus.PROCESSING:
            case EvaluationCardStatus.COMPLETED:
            case EvaluationCardStatus.CANCELLED:
            return 'View Evaluation';
            default:
            return '';
        }
    }
    
    const renderTimestampText = () => {
        switch (evaluationStatus) {
            case EvaluationCardStatus.NOT_STARTED:
                return `Imported On: ${importedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`;
            case EvaluationCardStatus.INCOMPLETE:
                return startedAt && `Started On: ${startedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`;
            case EvaluationCardStatus.AWAITING_AUTH:
                return submittedAt && `Submitted On: ${submittedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`;
            case EvaluationCardStatus.PROCESSING:
                return authorizedAt && `Authorized At: ${authorizedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`;
            case EvaluationCardStatus.COMPLETED:
                return completedAt && `Completed At: ${completedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`;
            case EvaluationCardStatus.CANCELLED:
                return cancelledAt && `Cancelled At: ${cancelledAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`;
            default:
            return '';
        }
    }
    return (
    <Paper shadow="md" p="md" style={{ maxWidth: 400 }}>

   
        <Stack gap={'xs'} mb={5}>
            <Group gap='xs'> 
            <Text fw={600} size='20px'> {toTitleCase(firstName)} {middleName && toTitleCase(middleName)} {toTitleCase(lastName)} - {patientId}</Text>
            <IconCircle size = '14' color={renderStatusColor()} fill={renderStatusColor()}/>
            </Group>
          {poNumber && <Text fw={500} size='12px'> PO: {poNumber}</Text>}
          {birthDate && <Text fw={500} size='12px'>DOB: {birthDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</Text>}
          {clinician && <Text fw={500} size='12px'> Clinician: {clinician}</Text>}
        </Stack>
        <Group gap={'xs'}>
        <Badge
            variant="filled"
            color={renderStatusColor()}
            tt='none'
            mt={10}
            p={15}
        >
            <Text fw={600} size='12px' c={evaluationStatus === EvaluationCardStatus.INCOMPLETE ? 'white' : 'black'} display={'inline'}> {renderBadgeText()}</Text>
        </Badge>
        </Group>
        
  

        <Group justify='space-between' mt={8} style={{
        borderTop: '2px solid #ADB5BD', 
        padding: '10px',
        }}>

        <Text fw={500} size='14px'>{renderTimestampText()}</Text>

        <Button color='#006CEA' pl={20} pr={20}>
            <Text fw={600} size='14px' c='white'>{renderButtonText()}</Text>
        </Button>
        </Group>
  


    </Paper>
  );
}