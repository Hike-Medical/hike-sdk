export type StepFn<TContext> = (ctx: TContext) => void | Promise<void>;
export type ConditionFn<TContext> = (ctx: TContext) => boolean | Promise<boolean>;

interface WorkflowStep<TContext> {
  name: string;
  fn: StepFn<TContext>;
  condition?: ConditionFn<TContext>;
}

export class WorkflowError extends Error {
  readonly step: string;
  readonly cause: Error;

  constructor(step: string, cause: Error) {
    super(`Step "${step}" failed: ${cause.message}`);
    this.step = step;
    this.cause = cause;
  }
}

export class Workflow<TContext> {
  private steps: WorkflowStep<TContext>[] = [];
  private errorHandler?: (error: WorkflowError, ctx: TContext) => void | Promise<void>;

  constructor(private ctx: TContext) {}

  addStep(name: string, fn: StepFn<TContext>): this {
    this.steps.push({ name, fn });
    return this;
  }

  addConditionalStep(name: string, condition: ConditionFn<TContext>, fn: StepFn<TContext>): this {
    this.steps.push({ name, fn, condition });
    return this;
  }

  addWorkflow(name: string, workflow: Workflow<TContext>): this {
    return this.addStep(name, async (ctx) => {
      await workflow.cloneWithContext(ctx).run();
    });
  }

  addParallelSteps(steps: { name: string; fn: StepFn<TContext> }[]): this {
    return this.addStep('ParallelGroup', async (ctx) => {
      await Promise.all(steps.map((s) => s.fn(ctx)));
    });
  }

  onError(handler: (error: WorkflowError, ctx: TContext) => void | Promise<void>): this {
    this.errorHandler = handler;
    return this;
  }

  async run(): Promise<TContext> {
    for (const step of this.steps) {
      try {
        const shouldRun = step.condition ? await step.condition(this.ctx) : true;
        if (shouldRun) {
          await step.fn(this.ctx);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        const workflowError = new WorkflowError(step.name, error);
        if (this.errorHandler) {
          await this.errorHandler(workflowError, this.ctx);
        } else {
          throw workflowError;
        }
        break;
      }
    }
    return this.ctx;
  }

  cloneWithContext(ctx: TContext): Workflow<TContext> {
    const clone = new Workflow(ctx);
    clone.steps = [...this.steps];
    clone.errorHandler = this.errorHandler;
    return clone;
  }
}
