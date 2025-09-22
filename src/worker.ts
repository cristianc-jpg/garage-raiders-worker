// src/worker.ts
import { Worker } from '@temporalio/worker';
import { Connection } from '@temporalio/client';
import * as activities from './activities';

async function run() {
  const address   = process.env.TEMPORAL_ADDRESS!;
  const namespace = process.env.TEMPORAL_NAMESPACE!;
  const apiKey    = process.env.TEMPORAL_API_KEY!;
  const taskQueue = process.env.TEMPORAL_TASK_QUEUE!;

  if (!address || !namespace || !apiKey || !taskQueue) {
    throw new Error('Missing one of: TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE, TEMPORAL_API_KEY, TEMPORAL_TASK_QUEUE');
  }

  console.log('Worker connecting with:', { address, namespace, taskQueue });

  const connection = await Connection.connect({
    address,
    tls: {},
    metadata: { authorization: `Bearer ${apiKey}` },
  });

  const worker = await Worker.create({
    connection,
    namespace,
    taskQueue,
    workflowsPath: require.resolve('./workflows'),
    activities,
  });

  console.log('✅ Worker created, starting…');
  await worker.run();
}

run().catch((err) => {
  console.error('Worker failed:', err);
  process.exit(1);
});
