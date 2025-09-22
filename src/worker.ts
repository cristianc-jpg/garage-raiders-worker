import { Worker } from '@temporalio/worker';

// The worker is a long-lived process that polls a Task Queue and runs workflows/activities.
async function run() {
  const taskQueue = process.env.TEMPORAL_TASK_QUEUE || 'sms-orchestrator';

  const worker = await Worker.create({
    // This loads workflows from the compiled JS file generated from src/workflows.ts
    workflowsPath: require.resolve('./workflows'),
    activities: require('./activities'), // optional; ok even if empty
    taskQueue,
  });

  console.log(`[worker] starting. Task Queue: ${taskQueue}`);
  await worker.run(); // blocks
}

run().catch((err) => {
  console.error('[worker] fatal:', err);
  process.exit(1);
});
