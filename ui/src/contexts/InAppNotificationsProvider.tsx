'use client';

import React, { createContext, use, useState, type PropsWithChildren } from 'react';
import { Modal, Stack, Text, Group, Box, Button, ThemeIcon, rem } from '@mantine/core';
import { IconClockExclamation, IconAlertCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NotificationExtended } from '@hike/types';
import { CompanyContext } from './CompanyProviderClient';
import useGetInAppNotifications from '../hooks/notification/useGetInAppNotifications';

dayjs.extend(relativeTime);

interface InAppNotificationsProviderProps extends PropsWithChildren {}

export const InAppNotificationsProvider = ({ children }: InAppNotificationsProviderProps) => {
  const company = use(CompanyContext);
  const { data: notifications } = useGetInAppNotifications({
    companyIds: [company?.id || '']
  });
  const [opened, setOpened] = useState(false);

  const sorted = React.useMemo(() => {
    const list = [...(notifications ?? [])];
    return list.sort((a, b) => {
      // Urgent notifications first.
      const urgencyA = a.type === 'IN_APP_URGENT' ? 0 : 1;
      const urgencyB = b.type === 'IN_APP_URGENT' ? 0 : 1;
      if (urgencyA !== urgencyB) return urgencyA - urgencyB;

      // Newest first (fallback to first message timestamp if `createdAt` absent)
      const dateA = new Date((a as any).createdAt ?? a.messages?.[0]?.createdAt ?? 0).getTime();
      const dateB = new Date((b as any).createdAt ?? b.messages?.[0]?.createdAt ?? 0).getTime();
      return dateB - dateA;
    });
  }, [notifications]);

  const previewStack = sorted.slice(0, 1).map((notice) => (
    <Box
      bg={notice.type === 'IN_APP_URGENT' ? 'red.1' : 'yellow.0'}
      key={notice.id}
      w={'100%'}
      pos="fixed"
      top={0}
      h={70}
      px="md"
      py="md"
      style={{
        zIndex: 11,
        borderBottom: `1px solid ${notice.type === 'IN_APP_URGENT' ? 'var(--mantine-color-red-3)' : 'var(--mantine-color-yellow-2)'}`
      }}
    >
      <Group w="100%" justify="space-between" align="center" h="100%">
        <Group gap={10} align="center" h="100%">
          <ThemeIcon radius="xl" color={notice.type === 'IN_APP_URGENT' ? 'red' : 'yellow'} size={30} variant="light">
            {notice.type === 'IN_APP_INFO' ? <IconAlertCircle size={18} /> : <IconClockExclamation size={18} />}
          </ThemeIcon>
          <Stack gap={2}>
            <Group gap={5} align="center" wrap="nowrap">
              <Text size="sm" fw={600} c={notice.type === 'IN_APP_URGENT' ? 'red.9' : 'yellow.9'}>
                {notice.name}
              </Text>
              <Text size="sm" c={notice.type === 'IN_APP_URGENT' ? 'red.9' : 'yellow.9'}>
                {notice.description}
              </Text>
            </Group>
            <Text
              c={notice.type === 'IN_APP_URGENT' ? 'red.8' : 'yellow.8'}
              size={rem(12)}
              style={{
                opacity: 0.8
              }}
            >
              {dayjs(notice.createdAt).fromNow()}
            </Text>
          </Stack>
        </Group>
        {notifications && notifications?.length > 0 && (
          <Button
            size="compact-xs"
            variant="outline"
            color={notice.type === 'IN_APP_URGENT' ? 'red' : 'yellow'}
            onClick={() => setOpened(true)}
          >
            View all {notifications.length} notification{notifications.length > 1 ? 's' : ''}
          </Button>
        )}
      </Group>
    </Box>
  ));

  const modalAlerts = sorted.map((notice, index) => {
    const isUrgent = notice.type === 'IN_APP_URGENT';
    const iconColor = isUrgent ? 'red' : 'yellow';

    return (
      <React.Fragment key={notice.id}>
        <Group
          gap="md"
          align="center"
          p="md"
          style={{
            borderRadius: rem(6),
            cursor: 'pointer',
            transition: 'background-color 0.1s ease'
          }}
        >
          <ThemeIcon size={30} radius="xl" variant="light" color={iconColor} style={{ marginTop: rem(2) }}>
            {!isUrgent ? <IconAlertCircle size={22} /> : <IconClockExclamation size={22} />}
          </ThemeIcon>

          <Box style={{ flex: 1 }}>
            <Group justify="space-between" align="center">
              {notice.name && (
                <Text size="sm" fw={500} c={'dark.7'} style={{ lineHeight: 1.4 }}>
                  {notice.name}
                </Text>
              )}
              <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap', marginLeft: rem(12) }}>
                {dayjs((notice as any).createdAt ?? notice.messages?.[0]?.createdAt).fromNow()}
              </Text>
            </Group>

            <Text size="xs" c="dark.6" style={{ lineHeight: 1.4 }}>
              {notice.description}
            </Text>
          </Box>
        </Group>

        {index < sorted.length - 1 && <Box h={1} bg="gray.2" mx="sm" style={{ opacity: 0.5 }} />}
      </React.Fragment>
    );
  });

  const notificationsMemoized = React.useMemo(() => sorted, [sorted]);

  return (
    <InAppNotificationsContext.Provider value={notificationsMemoized}>
      {sorted.length > 0 && (
        <>
          {previewStack}

          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title={
              <Group gap="lg" align="center">
                <Group gap="xs" align="center">
                  <Text fw={600} size="md">
                    Notifications
                  </Text>
                  <Text size="sm" c="dimmed" fw={400}>
                    {sorted.length}
                  </Text>
                </Group>
              </Group>
            }
            size="lg"
            closeOnClickOutside
            padding="xs"
            styles={{
              title: {
                width: '100%'
              },
              header: {
                paddingBottom: rem(8),
                borderBottom: '1px solid var(--mantine-color-gray-3)'
              },
              body: {
                padding: 0
              }
            }}
          >
            <Stack gap={0}>
              {modalAlerts.length > 0 ? (
                modalAlerts
              ) : (
                <Box p="md" ta="center">
                  <Text size="sm" c="dimmed">
                    No notifications
                  </Text>
                </Box>
              )}
            </Stack>
          </Modal>
        </>
      )}

      {children}
    </InAppNotificationsContext.Provider>
  );
};

export const InAppNotificationsContext = createContext<NotificationExtended[]>([]);

export default InAppNotificationsProvider;
