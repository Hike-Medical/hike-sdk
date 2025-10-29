'use client';

import { Badge, Button, Divider, Drawer, Group, Stack } from '@mantine/core';
import { ReactNode } from 'react';

export interface ProductDetailDrawerProps {
  title: string;
  isAddDisabled?: boolean;
  showOutOfStock?: boolean;
  outOfStockText?: string;
  addButtonText?: string;
  addButtonLoading?: boolean;
  onAddToCart?: () => void;
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ProductDetailDrawer = ({
  title,
  showOutOfStock = false,
  outOfStockText = 'Out of stock',
  isAddDisabled = false,
  addButtonText = 'Add to Order',
  addButtonLoading = false,
  onAddToCart,
  opened,
  onClose,
  children
}: ProductDetailDrawerProps) => (
  <Drawer.Root position="bottom" size="90dvh" opened={opened} onClose={onClose}>
    <Drawer.Overlay />
    <Drawer.Content>
      <Stack px={{ base: 'sm', sm: 'lg' }} py={{ base: 'sm', sm: 'lg' }} gap="sm">
        <Group justify="space-between" wrap="nowrap" gap="md">
          <Drawer.CloseButton size="lg" />
          <Drawer.Title
            ta="center"
            fw="600"
            c="gray.8"
            lh={1.4}
            style={{
              flex: 1,
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {title}
          </Drawer.Title>
          {showOutOfStock ? (
            <Badge variant="light" color="red">
              {outOfStockText}
            </Badge>
          ) : (
            onAddToCart && (
              <Button
                size="sm"
                color="blue"
                variant="outline"
                onClick={onAddToCart}
                loading={addButtonLoading}
                disabled={isAddDisabled || addButtonLoading}
              >
                {addButtonText}
              </Button>
            )
          )}
        </Group>
        <Divider color="gray.3" />
      </Stack>
      <Drawer.Body p="0" pb={{ base: 'xl', sm: '0' }}>
        {children}
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Root>
);
