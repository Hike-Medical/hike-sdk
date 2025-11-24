'use client';

import { Button } from '@mantine/core';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  label?: string;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const SubmitButton = ({ label, loading, fullWidth = true, disabled }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={loading} disabled={disabled || pending} fullWidth={fullWidth}>
      {label || 'Submit'}
    </Button>
  );
};
