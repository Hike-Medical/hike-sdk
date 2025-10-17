'use client';

import { Box, Group, GroupProps, CopyButton as MantineCopyButton, rem, Text, TextProps, Tooltip } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import { IconCheck, IconCopy } from '@tabler/icons-react';

interface CopyButtonProps extends GroupProps {
  value: string | null | undefined;
  label?: string;
  textProps?: TextProps;
}

const useStyles = createStyles((theme, _, u) => ({
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s ease'
  },
  iconDefault: {
    [u.dark]: {
      color: theme.colors.gray[3]
    },
    [u.light]: {
      color: theme.colors.black
    }
  },
  iconCopied: {
    [u.dark]: {
      color: theme.colors.teal[6]
    },
    [u.light]: {
      color: theme.colors.green[7]
    }
  }
}));

export const CopyButton = ({ value, label, textProps, ...rest }: CopyButtonProps) => {
  const { classes, cx } = useStyles();

  return value ? (
    <MantineCopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <Group
            component="span"
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
            <Box component="span" className={cx(classes.icon, copied ? classes.iconCopied : classes.iconDefault)}>
              {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
            </Box>
          </Group>
        </Tooltip>
      )}
    </MantineCopyButton>
  ) : null;
};
