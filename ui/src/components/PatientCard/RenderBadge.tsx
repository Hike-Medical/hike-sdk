import { Badge, Text } from '@mantine/core';
export const renderBadge = (text: string) => (
  <Badge variant="filled" color="#006CEA1A" tt="none" mt={10} p={15}>
    <Text fw={600} size="12px" c="black">
      {' '}
      {text}
    </Text>
  </Badge>
);
