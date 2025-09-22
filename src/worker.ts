// ~/garage-raiders-worker/src/worker.ts
import { NativeConnection, Worker } from '@temporalio/worker';
import path from 'path';

async function run() {
  const address   = process.env.TEMPORAL_ADDRESS!;
  const namespace = process.env.TEMPORAL_NAMESPACE!;
  const apiKey    = process.env.TEMPORAL_API_KEY!;
  const taskQueue = process.env.TEMPORAL_TASK_QUEUE || 'sms-orchestrator';

  if (!address || !namespace || !apiKey) {
    throw new Error('Missing TEMPORAL_ADDRESS / TEMPORAL_NAMESPACE / TEMPORAL_API_KEY in env');
  }

  console.log(
    `Connecting to Temporal Cloud: addr=${address} ns=${namespace} tq=${taskQueue}`
  );

  // IMPORTANT: pass address + TLS + API key auth, otherwise it defaults to localhost
  const connection = await NativeConnection.connect({
    address,
    tls: {}, // enable TLS (required for Cloud)
    metadata: { authorization: `Bearer ${apiKey}` }, // API key auth
  });

  // point to your compiled workflow bundle (Temporal SDK bundles automatically)
  const workflowsPath = path.join(__dirname, './workflows'); // ts-node will use the source
  const worker = await Worker.create({
    connection,
    namespace,
    taskQueue,
    workflowsPath,           // loads workflows.ts
    activities: require('./activities'), // loads activities.ts (CommonJS require under ts-node)
  });

  console.log('👷 Worker started on task queue:', taskQueue);
  await worker.run();
}

run().catch((err) => {
  console.error('Worker failed to start:', err);
  process.exit(1);
});
