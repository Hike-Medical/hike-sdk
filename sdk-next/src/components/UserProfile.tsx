'use client';

import { formatDateTime, truncateMiddle } from '@hike/sdk';
import { SessionContext, useToggleTwoFa } from '@hike/ui';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Menu,
  Modal,
  Space,
  Stack,
  Table,
  Text,
  Title
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import {
  IconCalendar,
  IconDotsVertical,
  IconKey,
  IconLogout,
  IconShieldCheck,
  IconUserCircle
} from '@tabler/icons-react';
import { useTransitionRouter } from 'next-view-transitions';
import { useParams } from 'next/navigation';
import { use } from 'react';
import { CopyButton } from './CopyButton';
import { TwoFaSetup } from './login/TwoFaSetup';
import { UpdatePassword } from './login/UpdatePassword';

export const UserProfile = () => {
  const [openModalPassword, openModalPasswordHandlers] = useDisclosure(false);
  const [open2FaModal, open2FaModalHandlers] = useDisclosure(false);
  const { user, update, logout } = use(SessionContext);
  const { slug } = useParams<{ slug: string }>();
  const router = useTransitionRouter();
  const slugPath = slug ? `/${slug}` : '';
  const is2FaEnabled = user?.accounts.find((account) => account.provider === '2fa');

  const { mutate: toggleTwoFa, isPending: isTogglingTwoFa } = useToggleTwoFa({
    onSuccess: async () => {
      await update();

      showNotification({
        title: 'Success!',
        message: 'Your 2FA has been successfully been updated!',
        color: 'green'
      });
    }
  });

  if (!user) {
    return (
      <Center>
        <Loader m="xl" />
      </Center>
    );
  }

  return (
    <>
      <Modal title="Update Password" opened={openModalPassword} onClose={() => openModalPasswordHandlers.close()}>
        <UpdatePassword onSuccess={async () => openModalPasswordHandlers.close()} />
      </Modal>
      <Modal
        title="Set up Two-Factor Authentication"
        opened={open2FaModal}
        onClose={() => open2FaModalHandlers.close()}
      >
        <TwoFaSetup onVerified={async () => open2FaModalHandlers.close()} />
      </Modal>
      <Stack p="md" gap="lg" align="center" maw={480} mx="auto">
        <Card
          withBorder
          w="100%"
          p="lg"
          radius="md"
          style={{ background: 'linear-gradient(135deg, #f0f4ff, #f5eaff)' }}
        >
          <Group justify="space-between">
            <Space />
            <Menu withArrow>
              <Menu.Target>
                <ActionIcon variant="subtle" size="sm">
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout />}
                  onClick={() =>
                    modals.openConfirmModal({
                      title: 'Please confirm this action',
                      children: <Text size="sm">Are you sure you want to logout?</Text>,
                      labels: { confirm: 'Logout', cancel: 'Cancel' },
                      confirmProps: { color: 'red' },
                      onConfirm: async () => {
                        await logout();
                        localStorage.removeItem('recentCompanies');
                        router.replace(`${slugPath}/`);
                      },
                      size: 'md'
                    })
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Stack align="center" gap="xs">
            <Avatar src={user.photoUrl} size={96} />
            <Title order={3}>
              {user.firstName} {user.lastName}
            </Title>
          </Stack>
        </Card>
        <Group w="100%" grow>
          <Button
            leftSection={<IconKey size={18} />}
            variant="default"
            onClick={() => openModalPasswordHandlers.open()}
          >
            Password
          </Button>
          <Button
            leftSection={<IconShieldCheck size={18} />}
            variant="default"
            onClick={() =>
              is2FaEnabled
                ? modals.openConfirmModal({
                    title: 'Please confirm this action',
                    children: <Text size="sm">Are you sure you want to disable 2FA?</Text>,
                    labels: { confirm: 'Confirm', cancel: 'Cancel' },
                    onConfirm: () => toggleTwoFa({ active: false })
                  })
                : open2FaModalHandlers.open()
            }
            loading={isTogglingTwoFa}
          >
            {is2FaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </Button>
        </Group>
        <Card withBorder w="100%" p="lg">
          <Group align="center" gap="xs">
            <IconUserCircle size={20} />
            <Text fw={600}>Account Details</Text>
          </Group>
          <Space h="sm" />
          <Table
            data={{
              body: [
                [
                  'User ID',
                  <Group justify="end">
                    <CopyButton value={user.id} label={truncateMiddle(user.id)} ff="monospace" />
                  </Group>
                ],
                [
                  'Email',
                  <Group justify="end">{user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : '-'}</Group>
                ],
                [
                  'Email Status',
                  <Group justify="end">
                    {user.emailVerifiedAt ? (
                      <Badge color="green.7">Verified</Badge>
                    ) : (
                      <Badge color="red.7">Unverified</Badge>
                    )}
                  </Group>
                ],
                [
                  'Phone',
                  <Group justify="end">{user.phone ? <a href={`tel:${user.phone}`}>{user.phone}</a> : '-'}</Group>
                ],
                [
                  'Phone Status',
                  <Group justify="end">
                    {user.phoneVerifiedAt ? (
                      <Badge color="green.7">Verified</Badge>
                    ) : (
                      <Badge color="red.7">Unverified</Badge>
                    )}
                  </Group>
                ]
              ]
            }}
          />
          <Divider mb="lg" />
          <Group gap="4">
            <IconCalendar size={14} />
            <Text size="sm" c="dimmed" flex={1}>
              Created
            </Text>
            <Text size="sm" fw={600}>
              {formatDateTime(user.createdAt)}
            </Text>
          </Group>
          <Group gap="4">
            <IconCalendar size={14} />
            <Text size="sm" c="dimmed" flex={1}>
              Last Updated
            </Text>
            <Text size="sm" fw={600}>
              {formatDateTime(user.updatedAt)}
            </Text>
          </Group>
        </Card>
      </Stack>
    </>
  );
};
