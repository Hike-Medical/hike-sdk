'use client';

import { formatCurrency } from '@hike/sdk';
import { useProductBySku } from '@hike/ui';
import { ActionIcon, Alert, Badge, Group, LoadingOverlay, Paper, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export interface GenericReviewProps {
  sku: string;
  metadata?: Record<string, string>;
  onRemove?: () => void;
}

export const GenericReview = ({ sku, metadata, onRemove }: GenericReviewProps) => {
  const tShared = useTranslations('shared');
  const t = useTranslations('suppliers.generic.review');

  const {
    data: product,
    isLoading,
    isError
  } = useProductBySku({
    sku,
    enabled: !!sku,
    staleTime: 5 * 60 * 1000
  });

  if (isLoading) {
    return (
      <Stack gap="md" pos="relative" mih={200}>
        <LoadingOverlay visible />
      </Stack>
    );
  }

  if (isError || !product) {
    return (
      <Alert color="red" title={t('errorLoadingTitle')}>
        {t('errorLoadingMessage')}
      </Alert>
    );
  }

  const attributes =
    product.attributes
      ?.filter((attr) => attr.type === 'TEXT' && attr.value)
      .map((attr) => ({
        label: attr.description || attr.key || 'Attribute',
        value: attr.value || ''
      })) || [];

  const handleRemoveClick = () => {
    if (!onRemove) {
      return;
    }

    modals.openConfirmModal({
      title: t('removeConfirmTitle'),
      centered: true,
      children: (
        <Text size="sm">
          {t.rich('removeConfirmMessage', {
            productName: product?.name || t('unknownProduct'),
            b: (chunks) => <strong>{chunks}</strong>
          })}
        </Text>
      ),
      labels: { cancel: tShared('action.cancel'), confirm: tShared('action.remove') },
      confirmProps: { color: 'red' },
      onConfirm: onRemove
    });
  };

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        {/* Remove Button */}
        {onRemove && (
          <Group justify="flex-end">
            <ActionIcon variant="subtle" color="red" onClick={handleRemoveClick}>
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        )}

        {/* Product Image */}
        {product.image && (
          <Image
            src={product.image}
            alt={product.name || 'Product'}
            width={600}
            height={400}
            style={{ borderRadius: 8, objectFit: 'cover', maxHeight: 300 }}
          />
        )}

        {/* Product Name */}
        <Text size="lg" fw="600">
          {product.name || t('unknownProduct')}
        </Text>

        {/* SKU */}
        <Group gap="xs">
          <Text size="sm" c="dimmed">
            {tShared('label.sku')}:
          </Text>
          <Text size="sm" fw="500">
            {product.sku}
          </Text>
        </Group>

        {/* Attributes */}
        {(attributes.length > 0 || (metadata && Object.keys(metadata).length > 0)) && (
          <Stack gap="xs">
            <Text size="sm" fw="600" c="dimmed">
              {t('specifications')}
            </Text>
            <Group gap="xs">
              {attributes.map((attr) => (
                <Badge key={`${attr.label}-${attr.value}`} variant="light" size="md">
                  {attr.label}: {attr.value}
                </Badge>
              ))}
              {metadata &&
                Object.entries(metadata).map(([key, value]) => (
                  <Badge key={`metadata-${key}`} variant="light" size="md">
                    {key}: {value}
                  </Badge>
                ))}
            </Group>
          </Stack>
        )}

        {/* Price */}
        {product.price != null && (
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              {tShared('label.price')}:
            </Text>
            <Text size="lg" fw="700">
              {formatCurrency(product.price)}
            </Text>
          </Group>
        )}
      </Stack>
    </Paper>
  );
};
