'use client';

import { Button } from '@mantine/core';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  label?: string;
  loading?: boolean;
}

export const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} loading={loading} fullWidth>
      {label || 'Submit'}
    </Button>
  );
};
