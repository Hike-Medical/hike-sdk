'use client';

import { formatCurrency, type CatalogProductExtended } from '@hike/sdk';
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import { SelectedProductCard } from '../../components/SelectedProductCard';
import { getVariantAttributes } from '../utils/productHelpers';

export interface GenericSelectedProductProps {
  product: CatalogProductExtended;
  onEdit: () => void;
  onRemove: () => void;
}

export const GenericSelectedProduct = ({ product, onEdit, onRemove }: GenericSelectedProductProps) => {
  const tShared = useTranslations('shared');
  const t = useTranslations('suppliers.generic.selectedProduct');

  const attributes = getVariantAttributes(product).map((attr) => ({
    label: attr.description || attr.key,
    value: attr.value
  }));

  const handleRemoveClick = () => {
    modals.openConfirmModal({
      title: t('removeConfirmTitle'),
      centered: true,
      children: (
        <Text size="sm">
          {t.rich('removeConfirmMessage', {
            productName: product.name,
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
    <SelectedProductCard
      productName={product.name || 'Product'}
      productImage={product.image || undefined}
      productPrice={product.price ?? 0}
      attributes={attributes}
      additionalInfo={
        <Text size="md" fw="600">
          {tShared('label.price')}: {formatCurrency(product.price ?? 0)}
        </Text>
      }
      onEdit={onEdit}
      onRemove={handleRemoveClick}
      alertTitle={t('addedTitle')}
      editButtonText={t('editProduct')}
      removeButtonText={tShared('action.remove')}
    />
  );
};
