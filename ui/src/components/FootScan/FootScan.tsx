import { toTitleCase } from '@hike/utils';
import { ActionIcon, Box, Button, Group, Paper, Switch, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Side } from '@prisma/client';
import { IconChevronUp, IconCircle } from '@tabler/icons-react';
import React from 'react';

export interface FootScanProps {
  side: Side
  status: 'NOT_STARTED' | 'APPROVED' | 'REJECTED' | 'PROCESSING' | 'DISABLED';
}

export default function FootScan({
    side,
    status
}: FootScanProps) {

    console.log(React)
const [moreOptionsOpen, { toggle: toggleExpand }] = useDisclosure(true);

const getIconStatusColor = () => {
    switch (status) {
        case 'NOT_STARTED':
        return '#0088EA';
        case 'APPROVED':
        return '#69DB7C';
        case 'REJECTED':
        return '#FF8787';
        case 'PROCESSING':
        return '#FFF3BF';
        case 'DISABLED':
        return '#868E96';
        default:
        return 'white';
    }
};

  return (
    <Paper shadow="md" p="md" style={{ maxWidth: 400 }}>
      <Box mb={20}>
        <Group justify='space-between'>
        <Group gap='xs'>
        <IconCircle size = '16' color={getIconStatusColor()} fill={getIconStatusColor()}/>
          <Text>{toTitleCase(side)} foot</Text>
          </Group>
          <Switch size="md" color='green.4'/>
        </Group>
      </Box>

      <Button fullWidth color={getIconStatusColor()} mb={20}>
        Start Recording
      </Button>
      <Box>
        <Group justify='center'>
            <Text size="sm" c="black">
                    More Options
            </Text>
            <ActionIcon
              data-automation-id="more-details-toggle-button"
              radius="100%"
              variant="filled"
              aria-label="Collapse Toggle"
              styles={{
                root: {
                  background: '#FFFFFF90'
                }
              }}
              onClick={toggleExpand}
            >
              <IconChevronUp
                color="black"
                style={{
                  width: rem(18),
                  height: rem(18),
                  transform: moreOptionsOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.2s ease-in-out'
                }}
                stroke={1.5}
              />
            </ActionIcon>
            </Group>

      </Box>
    </Paper>
  );
}