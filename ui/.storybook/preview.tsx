import { MantineProvider, createTheme, useMantineColorScheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { addons } from '@storybook/preview-api';
import React, { useEffect } from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) => setColorScheme(value ? 'dark' : 'light');

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

export const decorators = [
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
  (renderStory: any) => <MantineProvider theme={theme}>{renderStory()}</MantineProvider>
];


const theme = createTheme({
    primaryColor: 'hike',
    primaryShade: 9,
    colors: {
      hike: [
        '#ebf7ff',
        '#d6ebfa',
        '#a6d6f7',
        '#75bff6',
        '#52acf5',
        '#41a0f5',
        '#379af6',
        '#2c87db',
        '#2078c4',
        '#0067ad'
      ],
      hikeGreen: [
        '#edffe7',
        '#dbffd0',
        '#b6ff9e',
        '#8dfe68',
        '#6cfe3d',
        '#58fe25',
        '#4cff18',
        '#3ce30c',
        '#31c900',
        '#20ae00'
      ]
    },
    defaultRadius: 'xl',
    components: {
      TextInput: {
        defaultProps: {
          radius: 'md'
        }
      },
      PasswordInput: {
        defaultProps: {
          radius: 'md'
        }
      },
      DateInput: {
        defaultProps: {
          radius: 'md'
        }
      },
      NativeSelect: {
        defaultProps: {
          radius: 'md'
        }
      },
      Notification: {
        defaultProps: {
          radius: 'md'
        }
      },
      Checkbox: {
        defaultProps: {
          radius: 'sm'
        }
      },
      NumberInput: {
        defaultProps: {
          radius: 'sm'
        }
      },
      Alert: {
        defaultProps: {
          radius: 'md'
        }
      },
      Tabs: {
        defaultProps: {
          radius: 'md'
        }
      },
      Modal: {
        defaultProps: {
          radius: 'md'
        }
      },
      Combobox: {
        defaultProps: {
          radius: 'md'
        }
      },
      Textarea: {
        defaultProps: {
          radius: 'md'
        }
      },
      Menu: {
        defaultProps: {
          radius: 'md'
        }
      }
    }
  });