'use client';

import {
  Anchor,
  Checkbox,
  CheckboxProps,
  CheckIcon,
  Combobox,
  ComboboxProps,
  em,
  Input,
  Loader,
  MantineSize,
  MantineThemeOverride,
  mergeThemeOverrides,
  NumberInput,
  NumberInputProps,
  RadioGroup,
  RadioGroupProps,
  RadioIndicator,
  rem,
  Select,
  SelectProps
} from '@mantine/core';
import {
  DatePickerInput,
  DatePickerInputProps,
  DateTimePicker,
  DateTimePickerProps,
  TimeInput,
  TimeInputProps
} from '@mantine/dates';
import merge from 'lodash/merge';
import { ThemeColors } from './types/ThemeColors';
import { ThemeComponent } from './types/ThemeComponent';

export const createColors = (colors?: {
  palette?: Partial<ThemeColors['palette']>;
  semantic?: Partial<ThemeColors['semantic']>;
}): ThemeColors =>
  merge(
    {
      palette: {
        // Generated from https://colorkit.co/color-shades-generator
        hike: [
          '#e3f5ff',
          '#cce7ff',
          '#9acbff',
          '#64aeff',
          '#3996fe',
          '#1e86fe',
          '#097fff',
          '#006de4',
          '#0060cd',
          '#007AFF'
        ],
        'hike-dimmed': [
          '#f1f2f3',
          '#e3e5e7',
          '#d5d8db',
          '#c7cbcf',
          '#b9bfc3',
          '#acb2b7',
          '#9fa6ac',
          '#929aa0',
          '#858e95',
          '#78828a'
        ],
        'hike-danger': [
          '#fff0ef',
          '#ffe2df',
          '#ffd3cf',
          '#ffc4bf',
          '#ffb4af',
          '#ffa59f',
          '#ff958f',
          '#ff8480',
          '#ff7370',
          '#ff6060'
        ]
      },
      semantic: {
        label: '#78828A',
        inputText: '#171725',
        inputBorder: 'var(--mantine-color-hike-9)',
        description: '#78828A',
        title: '#111111',
        text: '#111111',
        placeholder: 'var(--mantine-color-hike-dimmed-3)',
        border: 'var(--mantine-color-hike-9)',
        dropdownBackground: '#f5f5f5',
        disabledButtonBackground: '#D7D7D7'
      }
    },
    colors ?? {}
  );

export const createComponents = (colors: ThemeColors, components?: Partial<ThemeComponent>): ThemeComponent =>
  merge(
    {},
    {
      defaultProps: {
        size: 'lg' as MantineSize,
        c: 'hike-dimmed'
      },
      label: {
        fontSize: rem(16),
        fontWeight: '700',
        color: colors.semantic.label,
        marginBottom: rem(4)
      },
      input: {
        fontSize: rem(18),
        fontWeight: '100',
        lineHeight: rem(24),
        color: colors.semantic.inputText,
        display: 'flex',
        alignItems: 'center',
        outline: 'none',
        '--input-placeholder-color': colors.semantic.placeholder
      },
      description: {
        fontSize: rem(14),
        fontWeight: '350',
        color: colors.semantic.description,
        fontStyle: 'italic',
        marginBottom: rem(10)
      },
      dateFormat: 'DD MMMM YYYY',
      dateTimeFormat: 'DD MMMM YYYY hh:mm A',
      loader: 'dots'
    },
    components ?? {}
  );

export const createTheme = (
  colors: ThemeColors,
  components: ThemeComponent,
  overrides?: MantineThemeOverride
): MantineThemeOverride => {
  const baseTheme = {
    colors: colors.palette,
    primaryColor: 'hike',
    primaryShade: 9,
    defaultRadius: 'xl',
    headings: {
      fontWeight: '700',
      textWrap: 'balance',
      sizes: {
        h1: {
          fontWeight: '750',
          fontSize: rem(40),
          lineHeight: rem(41)
        },
        h2: {
          fontWeight: '800',
          fontSize: rem(24),
          lineHeight: rem(32)
        },
        h3: {
          fontSize: rem(20),
          lineHeight: rem(28)
        },
        h4: {
          fontWeight: '500',
          fontSize: rem(14),
          lineHeight: rem(22)
        }
      }
    },
    components: {
      Title: {
        styles: {
          root: {
            color: colors.semantic.title,
            letterSpacing: em(0.5)
          }
        }
      },
      Text: {
        styles: {
          root: {
            color: colors.semantic.text
          }
        }
      },
      Anchor: Anchor.extend({
        defaultProps: {
          c: 'hike'
        }
      }),
      InputBase: Input.extend({
        defaultProps: {
          ...components.defaultProps,
          styles: () => ({
            label: components.label,
            input: components.input,
            description: components.description
          })
        }
      }),
      NumberInput: NumberInput.extend({
        defaultProps: {
          ...(components.defaultProps as Partial<NumberInputProps>),
          hideControls: true,
          styles: () => ({
            label: components.label,
            input: components.input,
            description: components.description
          })
        }
      }),
      RadioIndicator: RadioIndicator.extend({
        defaultProps: {
          icon: CheckIcon,
          size: 'md'
        }
      }),
      RadioGroup: RadioGroup.extend({
        defaultProps: {
          ...(components.defaultProps as Partial<RadioGroupProps>),
          styles: () => ({
            label: {
              ...components.label,
              marginBottom: 0
            },
            input: components.input,
            description: components.description
          })
        }
      }),
      Select: Select.extend({
        defaultProps: {
          ...(components.defaultProps as Partial<SelectProps>),
          styles: () => ({
            label: components.label,
            input: components.input,
            description: components.description
          })
        }
      }),
      Checkbox: Checkbox.extend({
        defaultProps: {
          ...(components.defaultProps as Partial<CheckboxProps>),
          size: 'md',
          styles: () => ({
            label: {
              ...components.label,
              fontWeight: components.description?.fontWeight,
              marginBottom: 0
            },
            input: components.input,
            description: components.description
          })
        }
      }),
      DatePickerInput: DatePickerInput.extend({
        defaultProps: {
          ...(components.defaultProps as Partial<DatePickerInputProps>),
          valueFormat: components?.dateFormat,
          styles: () => ({
            label: components.label,
            input: components.input,
            description: components.description
          })
        }
      }),
      DateTimePicker: DateTimePicker.extend({
        defaultProps: {
          ...(components.defaultProps as Partial<DateTimePickerProps>),
          valueFormat: components?.dateTimeFormat,
          styles: () => ({
            label: components.label,
            input: components.input,
            description: components.description
          })
        }
      }),
      TimeInput: TimeInput.extend({
        defaultProps: {
          ...(components.defaultProps as Partial<TimeInputProps>),
          styles: () => ({
            label: components.label,
            input: components.input,
            description: components.description
          })
        }
      }),
      Combobox: Combobox.extend({
        defaultProps: {
          ...(components.defaultProps as Partial<ComboboxProps>),
          styles: () => ({
            label: components.label,
            input: components.input,
            description: components.description,
            dropdown: {
              backgroundColor: colors.semantic.dropdownBackground,
              borderRadius: '12px'
            }
          })
        }
      }),
      MultiSelect: {
        defaultProps: {
          ...components.defaultProps,
          styles: () => ({
            label: components.label,
            input: components.input,
            description: components.description
          })
        }
      },
      Loader: Loader.extend({
        defaultProps: {
          type: components.loader
        }
      })
    }
  } satisfies MantineThemeOverride;

  return mergeThemeOverrides(baseTheme, overrides ?? {});
};
