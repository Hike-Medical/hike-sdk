import { Side } from '@prisma/client';
import React from 'react';
import FootScan, { FootScanProps } from './FootScan';

export default { component: FootScan, 
  args: { side: Side.LEFT, status: 'NOT_STARTED' } as FootScanProps }; 

  
export const DefaultLeft = (args: FootScanProps) => React.createElement(FootScan, args);