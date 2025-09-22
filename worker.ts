import { Worker } from '@temporalio/worker';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'), // point to your workflows
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'sms-orchestrator',
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
