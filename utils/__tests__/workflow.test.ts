import { Workflow, WorkflowError } from '../src/helpers/workflow';

describe('Workflow', () => {
  it('executes steps sequentially', async () => {
    const ctx = { count: 0 };
    await new Workflow(ctx)
      .addStep('inc1', (c) => {
        c.count += 1;
      })
      .addStep('inc2', (c) => {
        c.count += 1;
      })
      .run();

    expect(ctx.count).toBe(2);
  });

  it('runs conditional steps when condition is true', async () => {
    const ctx = { run: true, value: 0 };
    await new Workflow(ctx)
      .addConditionalStep(
        'conditional',
        (c) => c.run,
        (c) => {
          c.value = 42;
        }
      )
      .run();

    expect(ctx.value).toBe(42);
  });

  it('skips conditional steps when condition is false', async () => {
    const ctx = { run: false, value: 0 };
    await new Workflow(ctx)
      .addConditionalStep(
        'conditional',
        (c) => c.run,
        (c) => {
          c.value = 42;
        }
      )
      .run();

    expect(ctx.value).toBe(0);
  });

  it('executes parallel steps', async () => {
    const ctx = { actions: [] as string[] };
    await new Workflow(ctx)
      .addParallelSteps([
        { name: 'a', fn: (c) => c.actions.push('a') },
        { name: 'b', fn: (c) => c.actions.push('b') }
      ])
      .run();

    expect(ctx.actions.sort()).toEqual(['a', 'b']);
  });

  it('supports nested workflows', async () => {
    const ctx = { count: 0 };
    const child = new Workflow<typeof ctx>({ count: 0 }).addStep('childStep', (c) => {
      c.count += 1;
    });

    await new Workflow(ctx).addWorkflow('child', child).run();

    expect(ctx.count).toBe(1);
  });

  it('stops execution and calls error handler on failure', async () => {
    const ctx = { count: 0 };
    const errors: WorkflowError[] = [];

    await new Workflow(ctx)
      .addStep('ok', (c) => {
        c.count += 1;
      })
      .addStep('fail', () => {
        throw new Error('boom');
      })
      .addStep('after', (c) => {
        c.count += 1;
      })
      .onError((err) => {
        errors.push(err);
      })
      .run();

    expect(ctx.count).toBe(1);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(WorkflowError);
    expect(errors[0].step).toBe('fail');
  });
});
