// ~/garage-raiders-worker/src/worker.ts
import { Worker } from '@temporalio/worker';
import { Connection } from '@temporalio/client';
import path from 'path';

async function run() {
  const address   = process.env.TEMPORAL_ADDRESS!;
  const namespace = process.env.TEMPORAL_NAMESPACE!;
  const apiKey    = process.env.TEMPORAL_API_KEY!;
  const taskQueue = process.env.TEMPORAL_TASK_QUEUE || 'sms-orchestrator';

  if (!address || !namespace || !apiKey) {
    throw new Error('Missing TEMPORAL_ADDRESS / TEMPORAL_NAMESPACE / TEMPORAL_API_KEY in env');
  }

  console.log(`Connecting to Temporal Cloud:
  address   = ${address}
  namespace = ${namespace}
  taskQueue = ${taskQueue}
  `);

  // ✅ Use the Cloud-friendly Connection API with TLS + API key auth
  const connection = await Connection.connect({
    address,
    tls: {},                           // required for Cloud
    auth: { type: 'apiKey', apiKey },  // first-class API key auth
  });

  const workflowsPath = path.join(__dirname, './workflows');

  const worker = await Worker.create({
    connection,
    namespace,
    taskQueue,
    workflowsPath,                 // loads ./src/workflows.ts
    activities: require('./activities'), // loads ./src/activities.ts
  });

  console.log('👷 Worker started on task queue:', taskQueue);
  await worker.run();
}

run().catch((err) => {
  console.error('Worker failed to start:', err);
  process.exit(1);
});
