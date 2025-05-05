import { MantineColor, MantineThemeColors } from '@mantine/core';

export interface ThemeColors {
  palette: {
    hike: MantineThemeColors['colors'];
    'hike-dimmed': MantineThemeColors['colors'];
    'hike-danger': MantineThemeColors['colors'];
  };
  semantic: {
    label: MantineColor;
    inputText: MantineColor;
    inputBorder: MantineColor;
    description: MantineColor;
    title: MantineColor;
    text: MantineColor;
    placeholder: MantineColor;
    border: MantineColor;
    dropdownBackground: MantineColor;
    disabledButtonBackground: MantineColor;
  };
}
