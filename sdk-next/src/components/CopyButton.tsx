'use client';

import { ActionIcon, Group, GroupProps, CopyButton as MantineCopyButton, Tooltip, rem } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';

interface CopyButtonProps extends GroupProps {
  value: string | null | undefined;
  label?: string;
}

export const CopyButton = ({ value, label, ...rest }: CopyButtonProps) =>
  value ? (
    <Group gap="xs" wrap="nowrap" {...rest} title={value}>
      {label ?? value}
      <MantineCopyButton value={value} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
            <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
              {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
            </ActionIcon>
          </Tooltip>
        )}
      </MantineCopyButton>
    </Group>
  ) : null;
