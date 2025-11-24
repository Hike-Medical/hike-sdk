'use client';

import { Badge, Button, Divider, Drawer, Group, Stack } from '@mantine/core';
import { ReactNode } from 'react';

interface ProductDetailDrawerProps {
  title: string;
  opened: boolean;
  onClose: () => void;
  onAddToCart?: () => void;
  isAddDisabled?: boolean;
  showOutOfStock?: boolean;
  outOfStockText?: string;
  addButtonText?: string;
  addButtonLoading?: boolean;
  children: ReactNode;
}

export const ProductDetailDrawer = ({
  title,
  opened,
  onClose,
  onAddToCart,
  isAddDisabled = false,
  showOutOfStock = false,
  outOfStockText,
  addButtonText,
  addButtonLoading = false,
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
          {showOutOfStock && outOfStockText ? (
            <Badge variant="light" color="red">
              {outOfStockText}
            </Badge>
          ) : (
            onAddToCart &&
            addButtonText && (
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
