'use client';

import { OrthofeetProductStyle, formatCurrency } from '@hike/sdk';
import { usePreferences } from '@hike/ui';
import { Avatar, Badge, Box, Button, Group, Paper, Stack, Text, Tooltip, rem, useMantineTheme } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getOrthofeetColorHex } from '../utils/colorMap';

interface OrthofeetProductCardProps {
  productStyle: OrthofeetProductStyle;
  onSelect: () => void;
}

export const OrthofeetProductCard = ({ productStyle, onSelect }: OrthofeetProductCardProps) => {
  const theme = useMantineTheme();
  const imageUrl = productStyle.image || '/images/shoe-placeholder.png';
  const price = productStyle.price ?? 0;
  const t = useTranslations('suppliers.orthofeet.productCard');
  const { data: preferences } = usePreferences();
  return (
    <Paper flex={1} bg="gray.1" p="md" mih={rem(250)} pos="relative">
      {productStyle.featured && (
        <Badge variant="filled" color="green" size="xs" pos="absolute" top={rem(8)} left={rem(8)} style={{ zIndex: 1 }}>
          {t('bestSeller')}
        </Badge>
      )}

      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: rem(180),
          backgroundColor: theme.colors.gray[3],
          borderRadius: theme.radius.lg,
          overflow: 'hidden'
        }}
      >
        <Image
          src={imageUrl}
          alt={productStyle.name}
          fill
          unoptimized
          style={{
            objectFit: 'contain'
          }}
        />
      </Box>

      <Stack pt="sm" gap="xs">
        <Stack justify="space-between" gap="xs">
          <Text size="md" truncate>
            {productStyle.name}
          </Text>
          {!preferences?.pricing?.removeShoeCatalogPricing && (
            <Text size="md" fw="600">
              {price > 0 ? formatCurrency(price) : '—'}
            </Text>
          )}
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
                {productStyle.colors.slice(0, 4).map((color) => {
                  const colorHex = getOrthofeetColorHex(color);
                  return colorHex ? (
                    <Avatar
                      key={color}
                      size="sm"
                      radius="xl"
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      style={{ backgroundColor: colorHex }}
                    />
                  ) : (
                    <Avatar key={color} size="sm" radius="xl">
                      {color.substring(0, 1).toUpperCase()}
                    </Avatar>
                  );
                })}
                {productStyle.colors.length > 4 && (
                  <Avatar size="sm" radius="xl">{`+${productStyle.colors.length - 4}`}</Avatar>
                )}
              </Avatar.Group>
            </Tooltip>
          )}
        </Group>
      </Stack>

      <Button onClick={onSelect} h={rem(50)} size="compact-sm" fullWidth mt="md" variant="light">
        {t('addPair')}
      </Button>
    </Paper>
  );
};
