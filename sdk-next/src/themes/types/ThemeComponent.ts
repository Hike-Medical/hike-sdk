import { CSSProperties, InputProps, MantineLoader } from '@mantine/core';

export interface ThemeComponent {
  defaultProps: Partial<InputProps>;
  label?: CSSProperties;
  placeholder?: CSSProperties;
  input?: CSSProperties;
  description?: CSSProperties;
  dateFormat?: string;
  dateTimeFormat?: string;
  loader?: MantineLoader;
}
