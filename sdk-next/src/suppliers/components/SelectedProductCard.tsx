'use client';

import { formatCurrency } from '@hike/sdk';
import { Alert, Badge, Button, Group, Image, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

export interface SelectedProductCardAttribute {
  label: string;
  value: string;
}

export interface SelectedProductCardProps {
  productName: string;
  productImage?: string;
  productPrice: number;
  attributes?: SelectedProductCardAttribute[];
  additionalInfo?: ReactNode;
  onEdit: () => void;
  onRemove: () => void;
  alertTitle?: string;
  editButtonText?: string;
  removeButtonText?: string;
}

export const SelectedProductCard = ({
  productName,
  productImage,
  productPrice,
  attributes = [],
  additionalInfo,
  onEdit,
  onRemove,
  alertTitle = 'Product added to order',
  editButtonText = 'Edit',
  removeButtonText = 'Remove'
}: SelectedProductCardProps) => {
  const theme = useMantineTheme();

  return (
    <Stack gap="md">
      <Alert color="green" title={alertTitle} />
      <Paper p="md" withBorder>
        <Group align="flex-start" wrap="nowrap">
          {productImage && (
            <Image
              src={productImage}
              alt={productName}
              w={200}
              h={200}
              fit="contain"
              style={{
                backgroundColor: theme.colors.gray[3],
                borderRadius: theme.radius.lg
              }}
            />
          )}
          <Stack flex={1} gap="xs">
            <Text size="lg" fw="600">
              {productName}
            </Text>

            {additionalInfo || (
              <Text size="md" fw="600">
                Price: {formatCurrency(productPrice)}
              </Text>
            )}

            {attributes.length > 0 && (
              <Group gap="xs">
                {attributes.map((attr, index) => (
                  <Badge key={index} variant="light" color="dark">
                    {attr.label}: {attr.value}
                  </Badge>
                ))}
              </Group>
            )}

            <Group pt="md">
              <Button onClick={onEdit} variant="light">
                {editButtonText}
              </Button>
              <Button color="red" variant="light" onClick={onRemove}>
                {removeButtonText}
              </Button>
            </Group>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
};
