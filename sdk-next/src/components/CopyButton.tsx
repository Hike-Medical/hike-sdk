'use client';

import { Box, Group, GroupProps, CopyButton as MantineCopyButton, rem, Text, TextProps, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';

interface CopyButtonProps extends GroupProps {
  value: string | null | undefined;
  label?: string;
  textProps?: TextProps;
}

export const CopyButton = ({ value, label, textProps, ...rest }: CopyButtonProps) =>
  value ? (
    <MantineCopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <Group
            gap="4"
            wrap="nowrap"
            align="center"
            title={value}
            onClick={copy}
            style={{ cursor: 'pointer' }}
            {...rest}
          >
            <Text inherit {...textProps}>
              {label ?? value}
            </Text>
            <Box
              component="span"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: copied ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-gray-6)',
                transition: 'color 0.2s ease'
              }}
            >
              {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
            </Box>
          </Group>
        </Tooltip>
      )}
    </MantineCopyButton>
  ) : null;
