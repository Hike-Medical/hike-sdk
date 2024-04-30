import { Paper } from '@mantine/core';
import { Side } from '@prisma/client';
import React from 'react';

export interface FootScanProps {
  side: Side
}

export default function FootScan({
    side
}: FootScanProps) {
console.log(React)

  return (
    <Paper
      bg="#124C74"
      c="white"
      
    >
    {side}
    </Paper>
  );
}
