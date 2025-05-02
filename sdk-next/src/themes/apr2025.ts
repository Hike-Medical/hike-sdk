'use client';

import {
  Anchor,
  Checkbox,
  CheckIcon,
  Combobox,
  em,
  Input,
  Loader,
  MantineColor,
  MantineSize,
  MantineThemeOverride,
  NumberInput,
  RadioGroup,
  RadioIndicator,
  rem,
  Select
} from '@mantine/core';
import { DatePickerInput, DateTimePicker, TimeInput } from '@mantine/dates';

const defaultStyles: {
  size: MantineSize;
  c: MantineColor;
} = {
  size: 'lg',
  c: 'hike-dimmed'
};

export const labelStyles = {
  fontSize: rem(16),
  fontWeight: '700',
  color: '#78828A',
  marginBottom: rem(4)
};

const placeholderStyles = {
  fontWeight: '500',
  color: 'var(--mantine-color-hike-dimmed-3)'
};

const inputStyles = {
  fontSize: rem(18),
  fontWeight: 'bold',
  lineHeight: rem(24),
  color: '#171725',
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  '&[value]:not([value=""])': {
    borderColor: 'var(--mantine-color-hike-9)'
  },
  '::placeholder': placeholderStyles
};

const descriptionStyles = {
  fontSize: rem(14),
  fontWeight: '350',
  color: '#78828A',
  fontStyle: 'italic',
  marginBottom: rem(10)
};

const datePickerInputStyles = {
  ...inputStyles,
  '.mantine-InputPlaceholder-placeholder': placeholderStyles,
  '&:not(:has(.mantine-InputPlaceholder-placeholder))': {
    borderColor: 'var(--mantine-color-hike-9)'
  }
};

export const apr2025 = {
  colors: {
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
          color: '#111111',
          letterSpacing: em(0.5)
        }
      }
    },
    Text: {
      styles: {
        root: {
          color: '#111111'
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
        ...defaultStyles,
        styles: () => ({
          input: inputStyles
        })
      }
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        ...defaultStyles,
        hideControls: true,
        styles: {
          label: labelStyles,
          input: inputStyles
        }
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
        ...defaultStyles,
        styles: () => ({
          label: { ...labelStyles, marginBottom: 0, fontWeight: '500' },
          input: inputStyles,
          description: descriptionStyles
        })
      }
    }),
    Select: Select.extend({
      defaultProps: {
        ...defaultStyles,
        styles: {
          label: labelStyles,
          input: inputStyles,
          description: descriptionStyles
        }
      }
    }),
    Checkbox: Checkbox.extend({
      defaultProps: {
        size: 'md',
        c: 'hike-dimmed',
        styles: {
          label: { ...labelStyles, marginBottom: 0 }
        }
      }
    }),
    DatePickerInput: DatePickerInput.extend({
      defaultProps: {
        valueFormat: 'DD MMMM YYYY',
        ...defaultStyles,
        styles: {
          label: labelStyles,
          input: datePickerInputStyles
        }
      }
    }),
    DateTimePicker: DateTimePicker.extend({
      defaultProps: {
        valueFormat: 'DD MMMM YYYY hh:mm A',
        ...defaultStyles,
        styles: {
          label: labelStyles,
          input: datePickerInputStyles
        }
      }
    }),
    TimeInput: TimeInput.extend({
      defaultProps: {
        ...defaultStyles,
        styles: {
          label: labelStyles,
          input: datePickerInputStyles
        }
      }
    }),
    Combobox: Combobox.extend({
      defaultProps: {
        ...defaultStyles,
        styles: {
          dropdown: {
            backgroundColor: '#f5f5f5',
            borderRadius: '12px'
          }
        }
      }
    }),
    MultiSelect: {
      defaultProps: {
        ...defaultStyles,
        styles: {
          label: labelStyles,
          input: inputStyles
        }
      }
    },
    Loader: Loader.extend({
      defaultProps: {
        type: 'dots'
      }
    })
  }
} satisfies MantineThemeOverride;
