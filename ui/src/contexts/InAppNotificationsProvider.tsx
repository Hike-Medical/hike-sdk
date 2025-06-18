'use client';

import { NotificationExtended } from '@hike/types';
import React, { createContext, use, useState, PropsWithChildren } from 'react';
import { useGetInAppNotifications } from '../hooks/notification/useGetInAppNotifications';
import { Alert, Modal, Stack } from '@mantine/core';
import { CompanyContext } from './CompanyProviderClient';
import { IconInfoCircle, IconAlertCircle } from '@tabler/icons-react';

interface InAppNotificationsProviderProps extends PropsWithChildren {}

export const InAppNotificationsProvider = ({ children }: InAppNotificationsProviderProps) => {
  const company = use(CompanyContext);
  const { data: notifications } = useGetInAppNotifications({ companyIds: [company?.id || ''] });
  const [opened, setOpened] = useState(false);

  const alerts = (notifications ?? []).map((notice) => (
    <Alert
      key={notice.id}
      color={notice.type === 'IN_APP_URGENT' ? 'red' : 'yellow'}
      variant="filled"
      icon={notice.type === 'IN_APP_URGENT' ? <IconAlertCircle size={16} /> : <IconInfoCircle size={16} />}
    >
      {notice.messages[0]?.content}
    </Alert>
  ));

  return (
    <InAppNotificationsContext.Provider value={notifications ?? []}>
      {alerts.length === 1 && alerts}
      {alerts.length > 1 && (
        <>
          <Alert color="blue" onClick={() => setOpened(true)} style={{ cursor: 'pointer' }}>
            {alerts.length} notifications – click to view
          </Alert>
          <Modal opened={opened} onClose={() => setOpened(false)} title="Notifications" size="lg" closeOnClickOutside>
            <Stack gap="sm">{alerts}</Stack>
          </Modal>
        </>
      )}

      {children}
    </InAppNotificationsContext.Provider>
  );
};

export const InAppNotificationsContext = createContext<NotificationExtended[]>([]);

export default InAppNotificationsProvider;
