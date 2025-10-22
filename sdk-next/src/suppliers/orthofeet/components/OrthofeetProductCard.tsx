'use client';

import { OrthofeetProductStyle, formatCurrency } from '@hike/sdk';
import { Button, Paper, Stack, Text, rem, useMantineTheme } from '@mantine/core';
import Image from 'next/image';

interface OrthofeetProductCardProps {
  productStyle: OrthofeetProductStyle;
  multiplier: number;
  onSelect: () => void;
}

const DEFAULT_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl2l40-UIpiaxFDjKB21gCihugoPL8gQZi0ODatgOFKGNQFchF1i91n6k771D6np1DUQI&usqp=CAU';

export const OrthofeetProductCard = ({ productStyle, multiplier, onSelect }: OrthofeetProductCardProps) => {
  const theme = useMantineTheme();

  const calculatePrice = (value: number): number => value * (1 + multiplier / 100);

  const imageUrl = productStyle.image || DEFAULT_IMAGE_URL;
  const price = productStyle.price ?? 0;

  return (
    <Paper flex={1} bg="gray.1" p="md" mih={rem(250)}>
      <Image
        src={imageUrl}
        alt={productStyle.name}
        width={300}
        height={180}
        style={{
          backgroundColor: theme.colors.gray[3],
          borderRadius: theme.radius.lg,
          objectFit: 'contain',
          overflow: 'hidden',
          width: '100%',
          maxHeight: rem(180)
        }}
      />

      <Stack pt="sm" gap="xs">
        <Stack justify="space-between" gap="xs">
          <Text size="md" truncate>
            {productStyle.name}
          </Text>
          <Text size="md" fw="600">
            {formatCurrency(calculatePrice(price))}
          </Text>
        </Stack>
      </Stack>

      <Button onClick={onSelect} h={rem(50)} size="compact-sm" fullWidth mt="md" variant="light">
        Select Options
      </Button>
    </Paper>
  );
};
