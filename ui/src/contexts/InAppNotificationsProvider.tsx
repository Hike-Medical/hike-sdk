'use client';

import React, { createContext, use, useState, type PropsWithChildren } from 'react';
import { Modal, Stack, Text, Group, Box, Button, ThemeIcon, rem, useMantineColorScheme } from '@mantine/core';
import { IconClockExclamation, IconAlertCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { NotificationExtended } from '@hike/types';
import { CompanyContext } from './CompanyProviderClient';
import useGetInAppNotifications from '../hooks/notification/useGetInAppNotifications';

dayjs.extend(relativeTime);

interface InAppNotificationsProviderProps extends PropsWithChildren {}

export const InAppNotificationsProvider = ({ children }: InAppNotificationsProviderProps) => {
  const { colorScheme } = useMantineColorScheme();
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

      // Newest first (fallback to startTime or first message timestamp)
      const dateA = new Date(a.startTime ?? (a as any).createdAt ?? a.messages?.[0]?.createdAt ?? 0).getTime();
      const dateB = new Date(b.startTime ?? (b as any).createdAt ?? b.messages?.[0]?.createdAt ?? 0).getTime();
      return dateB - dateA;
    });
  }, [notifications]);

  const getNotificationColors = (isUrgent: boolean) => {
    if (isUrgent) {
      return {
        bg: colorScheme === 'dark' ? '#5e2525' : 'red.1',
        border: colorScheme === 'dark' ? '#bf3838' : 'var(--mantine-color-red-3)',
        textPrimary: colorScheme === 'dark' ? 'red.3' : 'red.9',
        textSecondary: colorScheme === 'dark' ? 'red.4' : 'red.8',
        iconColor: 'red'
      };
    } else {
      return {
        bg: colorScheme === 'dark' ? '#4d3d26' : 'yellow.0',
        border: colorScheme === 'dark' ? '#976507' : 'var(--mantine-color-yellow-2)',
        textPrimary: colorScheme === 'dark' ? 'yellow.3' : 'yellow.9',
        textSecondary: colorScheme === 'dark' ? 'yellow.4' : 'yellow.8',
        iconColor: 'yellow'
      };
    }
  };

  const previewStack = sorted.slice(0, 1).map((notice) => {
    const colors = getNotificationColors(notice.type === 'IN_APP_URGENT');

    return (
      <Box
        bg={colors.bg}
        key={notice.id}
        w={'100%'}
        pos="fixed"
        top={0}
        h={70}
        px="md"
        py="md"
        style={{
          zIndex: 11,
          borderBottom: `1px solid ${colors.border}`
        }}
      >
        <Group w="100%" justify="space-between" align="center" h="100%">
          <Group gap={10} align="center" h="100%">
            <ThemeIcon radius="xl" color={colors.iconColor} size={30} variant="light">
              {notice.type === 'IN_APP_INFO' ? <IconAlertCircle size={18} /> : <IconClockExclamation size={18} />}
            </ThemeIcon>
            <Stack gap={2}>
              <Group gap={5} align="center" wrap="nowrap">
                <Text size="sm" fw={600} c={colors.textPrimary}>
                  {notice.name}
                </Text>
                <Text size="sm" c={colors.textPrimary}>
                  {notice.description}
                </Text>
              </Group>
              <Text
                c={colors.textSecondary}
                size={rem(12)}
                style={{
                  opacity: 0.8
                }}
              >
                {dayjs(notice.startTime ?? notice.createdAt).fromNow()}
              </Text>
            </Stack>
          </Group>
          {notifications && notifications?.length > 0 && (
            <Button size="compact-xs" variant="outline" color={colors.iconColor} onClick={() => setOpened(true)}>
              View all {notifications.length} notification{notifications.length > 1 ? 's' : ''}
            </Button>
          )}
        </Group>
      </Box>
    );
  });

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
          __vars={{
            '--hover-bg': colorScheme === 'dark' ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              colorScheme === 'dark' ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ThemeIcon size={30} radius="xl" variant="light" color={iconColor} style={{ marginTop: rem(2) }}>
            {!isUrgent ? <IconAlertCircle size={22} /> : <IconClockExclamation size={22} />}
          </ThemeIcon>

          <Box style={{ flex: 1 }}>
            <Group justify="space-between" align="center">
              {notice.name && (
                <Text size="sm" fw={500} c={colorScheme === 'dark' ? 'gray.1' : 'dark.7'} style={{ lineHeight: 1.4 }}>
                  {notice.name}
                </Text>
              )}
              <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap', marginLeft: rem(12) }}>
                {dayjs(notice.startTime ?? (notice as any).createdAt ?? notice.messages?.[0]?.createdAt).fromNow()}
              </Text>
            </Group>

            <Text size="xs" c={colorScheme === 'dark' ? 'gray.3' : 'dark.6'} style={{ lineHeight: 1.4 }}>
              {notice.description}
            </Text>
          </Box>
        </Group>

        {index < sorted.length - 1 && (
          <Box h={1} bg={colorScheme === 'dark' ? 'dark.4' : 'gray.2'} mx="sm" style={{ opacity: 0.5 }} />
        )}
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
                borderBottom: `1px solid ${colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`
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
