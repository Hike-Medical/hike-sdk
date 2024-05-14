import { Side } from '@prisma/client';
import React, { useState } from 'react';
import { FootScan, FootScanProps } from './FootScan';

const FootScanContainer = (args: FootScanProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  console.log(React);

  return <FootScan {...args} setIsSwitchOn={setIsSwitchOn} isSwitchOn={isSwitchOn} />;
};

export default {
  component: FootScanContainer,
  args: {
    side: Side.LEFT,
    status: 'NOT_STARTED'
  } as FootScanProps,
  argTypes: {
    status: {
      options: ['NOT_STARTED', 'APPROVED', 'REJECTED', 'PROCESSING'],
      control: { type: 'radio' }
    },
    side: {
      options: [Side.LEFT, Side.RIGHT],
      control: { type: 'radio' }
    }
  }
};

export const DefaultLeft = (args: FootScanProps) => <FootScanContainer {...args} />;
