'use client';

import { OrthofeetProductStyle, formatCurrency } from '@hike/sdk';
import { Avatar, Badge, Button, Group, Paper, Stack, Text, Tooltip, rem, useMantineTheme } from '@mantine/core';
import Image from 'next/image';

interface OrthofeetProductCardProps {
  productStyle: OrthofeetProductStyle;
  onSelect: () => void;
}

const getColorForName = (colorName: string): string => {
  const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'teal', 'lime', 'indigo'];
  const hash = colorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length] || 'gray';
};

export const OrthofeetProductCard = ({ productStyle, onSelect }: OrthofeetProductCardProps) => {
  const theme = useMantineTheme();

  const imageUrl = productStyle.image || '/images/shoe-placeholder.png';
  const price = productStyle.price ?? 0;

  return (
    <Paper flex={1} bg="gray.1" p="md" mih={rem(250)} pos="relative">
      {productStyle.featured && (
        <Badge variant="filled" color="green" size="xs" pos="absolute" top={rem(8)} left={rem(8)} style={{ zIndex: 1 }}>
          BEST SELLER
        </Badge>
      )}

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
            {price > 0 ? formatCurrency(price) : '—'}
          </Text>
        </Stack>

        {/* Gender and Color Badges */}
        <Group gap="xs" align="center">
          {productStyle.genders.map((gender) => (
            <Badge key={gender} size="sm" variant="light" color="blue">
              {gender}
            </Badge>
          ))}
          {productStyle.colors.length > 0 && (
            <Tooltip
              label={productStyle.colors.join(', ')}
              position="bottom"
              withArrow
              disabled={productStyle.colors.length <= 4}
            >
              <Avatar.Group spacing="xs">
                {productStyle.colors.slice(0, 4).map((color) => (
                  <Avatar key={color} size="sm" color={getColorForName(color)} radius="xl">
                    {color.substring(0, 1).toUpperCase()}
                  </Avatar>
                ))}
                {productStyle.colors.length > 4 && (
                  <Avatar size="sm" radius="xl">{`+${productStyle.colors.length - 4}`}</Avatar>
                )}
              </Avatar.Group>
            </Tooltip>
          )}
        </Group>
      </Stack>

      <Button onClick={onSelect} h={rem(50)} size="compact-sm" fullWidth mt="md" variant="light">
        Add Pair
      </Button>
    </Paper>
  );
};
