import { Configuration, Lane, Machine, Order, PrintJob, Printer3D, Workbench } from '../../../prisma';

export interface SoleforgePrintJob extends PrintJob {
  order: Order & {
    workbench: Workbench & {
      evaluation: {
        poNumber: string | null;
        company: { id: string; name: string; slug: string };
        patient: { id: string; firstName: string | null; lastName: string | null };
      };
    };
  };
}

export interface SoleforgePrinter extends Printer3D {
  printJobs: SoleforgePrintJob[];
}

export interface SoleforgeMachine extends Machine {
  configuration: Configuration;
  printer3Ds: SoleforgePrinter[];
}

export interface SoleforgeLane extends Lane {
  configuration: Configuration;
  machines: SoleforgeMachine[];
}

export interface SoleforgeDashboardStats {
  totalPrinters: number;
  activePrinters: number;
  printingJobs: number;
  queuedJobs: number;
  ordersWaitingForPrint: number;
}

export interface SoleforgeDashboard {
  lanes: SoleforgeLane[];
  unassignedMachines: SoleforgeMachine[];
  stats: SoleforgeDashboardStats;
}
