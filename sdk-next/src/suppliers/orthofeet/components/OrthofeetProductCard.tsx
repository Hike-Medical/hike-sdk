'use client';

import { CatalogProductExtended, formatCurrency, getColorHex } from '@hike/sdk';
import { Avatar, Badge, Button, Paper, Stack, Text, rem, useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import { ORTHOFEET_ATTRIBUTES, getUniqueAttributeValues } from '../utils/attributeHelpers';

interface OrthofeetProductCardProps {
  product: CatalogProductExtended;
  multiplier: number;
  onSelect: () => void;
}

const DEFAULT_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl2l40-UIpiaxFDjKB21gCihugoPL8gQZi0ODatgOFKGNQFchF1i91n6k771D6np1DUQI&usqp=CAU';

export function OrthofeetProductCard({ product, multiplier, onSelect }: OrthofeetProductCardProps) {
  const theme = useMantineTheme();

  const calculatePrice = (value: number): number => value * (1 + multiplier / 100);

  const children = (product.children || []) as CatalogProductExtended[];
  const genderOptions = getUniqueAttributeValues(children, ORTHOFEET_ATTRIBUTES.GENDER);
  const colorOptions = getUniqueAttributeValues(children, ORTHOFEET_ATTRIBUTES.COLOR);

  const imageUrl = product.image || DEFAULT_IMAGE_URL;
  const price = product.price ?? 0;

  return (
    <Paper flex={1} bg="gray.1" p="md" mih={rem(250)}>
      {product.featured && (
        <Badge variant="light" color="green" mb="xs">
          Best Seller
        </Badge>
      )}

      <Image
        src={imageUrl}
        alt={product.name}
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
            {product.name}
          </Text>
          <Text size="md" fw="600">
            {formatCurrency(calculatePrice(price))}
          </Text>
        </Stack>

        {genderOptions.length > 0 && (
          <Avatar.Group>
            {genderOptions.map((gender) => (
              <Badge key={gender} variant="light" color="dark">
                {gender}
              </Badge>
            ))}
          </Avatar.Group>
        )}

        {colorOptions.length > 0 && (
          <Avatar.Group>
            {colorOptions.slice(0, 3).map((color) => {
              const colorHex = getColorHex(color);
              const backgroundColor = colorHex || color || theme.colors.gray[5];

              return (
                <Avatar
                  size="sm"
                  key={color}
                  src={null}
                  style={{
                    border: `1px solid ${theme.colors.gray[5]}`,
                    backgroundColor
                  }}
                />
              );
            })}
            {colorOptions.length > 3 && (
              <Avatar size="sm" style={{ border: 'none', backgroundColor: theme.colors.gray[5] }}>
                +{colorOptions.length - 3}
              </Avatar>
            )}
          </Avatar.Group>
        )}
      </Stack>

      <Button onClick={onSelect} h={rem(50)} size="compact-sm" fullWidth mt="md" variant="light">
        Select Options
      </Button>
    </Paper>
  );
}
