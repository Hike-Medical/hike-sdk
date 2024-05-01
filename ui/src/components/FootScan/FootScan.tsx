import { toTitleCase } from '@hike/utils';
import { ActionIcon, Box, Button, Group, Paper, Pill, Stack, Switch, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Side } from '@prisma/client';
import { IconChevronUp, IconCircle, IconUpload } from '@tabler/icons-react';
import React from 'react';

export type FootScanStatus = 'NOT_STARTED' | 'APPROVED' | 'REJECTED' | 'PROCESSING';

export interface FootScanProps {
  side: Side
  status: FootScanStatus;
  isSwitchOn: boolean;
  setIsSwitchOn: (isDisabled: boolean) => void;
}

export default function FootScan({
    side,
    status,
    isSwitchOn,
    setIsSwitchOn
}: FootScanProps) {

    console.log(React)
const [moreOptionsOpen, { toggle: toggleExpand }] = useDisclosure(true);


  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchOn(event.currentTarget.checked);
  };


const getIconStatusColor = () => {
    if(!isSwitchOn) {
        return '#868E96'
    }
    switch (status) {
        case 'NOT_STARTED':
        return '#0088EA';
        case 'APPROVED':
        return '#69DB7C';
        case 'REJECTED':
        return '#FF8787';
        case 'PROCESSING':
        return '#FFF3BF';
        default:
        return 'white';
    }
};

const getStartText = () => {
    switch (status) {
        case 'NOT_STARTED':
        return 'Start Recording';
        case 'APPROVED':
        return 'Video Uploaded';
        case 'REJECTED':
        return 'Rescan Required';
        case 'PROCESSING':
        return 'Video Processing';
        default:
        return 'No Action Required';
    }
};

  return (
    <Paper shadow="md" p="md" style={{ maxWidth: 400 }}>
      <Box mb={20}>

      {!isSwitchOn && (
        <Pill
            bg="black"
            styles={{
            label: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            }}
        >
            <Text c="white" size="12px" fw={700}>
            Skipped
            </Text>
        </Pill>
        )}

        <Group justify='space-between' mt={8}>
        <Group gap='xs'>
        <IconCircle size = '16' color={getIconStatusColor()} fill={getIconStatusColor()}/>
          <Text>{toTitleCase(side)} Foot</Text>
          </Group>
          <Switch size="md" color="green.4" checked={isSwitchOn} onChange={handleSwitchChange} />
        </Group>
      </Box>
  

        {isSwitchOn && <>
            <Button
            fullWidth
            color={getIconStatusColor()}
            mb={20}
            styles={{
                root: {
                color: status === 'PROCESSING' ? 'black' : 'white',
                height: '56px',
                fontSize: '18px', 
                borderRadius: '12px', 
                },
            }}
            >
            {getStartText()}
            </Button>
      <Box>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text size="sm" c="black"  onClick={toggleExpand}>
            More Options
        </Text>
        <ActionIcon
            data-automation-id="more-details-toggle-button"
            radius="100%"
            variant="filled"
            aria-label="Collapse Toggle"
            styles={{ root: { background: '#FFFFFF90' } }}
            onClick={toggleExpand}
        >
            <IconChevronUp
            color="black"
            style={{
                width: rem(18),
                height: rem(18),
                transform: moreOptionsOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.2s ease-in-out',
            }}
            stroke={1.5}
            />
        </ActionIcon>
        </Box>
      </Box>

      { moreOptionsOpen && <Stack mt={20}>

            <Button
                fullWidth
                styles={{
                    root: {
                    height: '48px',
                    fontSize: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'black', 
                    color: 'white', 
                    },
                }}
                >
            <Group>
             <IconUpload size = '24' color='white'/>
                Upload Video
            </Group>
                </Button>
                
                <Button
                fullWidth
                variant="outline" 
                styles={{
                    root: {
                    height: '48px',
                    fontSize: '16px',
                    borderRadius: '12px',
                    borderColor: 'gray', 
                    backgroundColor: 'white',
                    color: 'gray', 
                    },
                }}
                >
                Upload Impression Box Scans
                </Button>
      
        </Stack>
      }
      </>}

    </Paper>
  );
}