import { useState } from 'react';
import { FootScan, FootScanProps } from './FootScan';

const FootScanContainer = (args: FootScanProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  return <FootScan {...args} setIsSwitchOn={setIsSwitchOn} isSwitchOn={isSwitchOn} />;
};

export default {
  component: FootScanContainer,
  args: {
    side: 'LEFT',
    status: 'NOT_STARTED'
  } as FootScanProps,
  argTypes: {
    status: {
      options: ['NOT_STARTED', 'APPROVED', 'REJECTED', 'PROCESSING'],
      control: { type: 'radio' }
    },
    side: {
      options: ['LEFT', 'RIGHT'],
      control: { type: 'radio' }
    }
  }
};

export const DefaultLeft = (args: FootScanProps) => <FootScanContainer {...args} />;
