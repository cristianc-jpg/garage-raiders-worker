// ~/garage-raiders-worker/src/worker.ts
import { Worker, NativeConnection } from '@temporalio/worker';
import * as workflows from './workflows';
import * as activities from './activities';

const address   = process.env.TEMPORAL_ADDRESS || '';
const namespace = process.env.TEMPORAL_NAMESPACE || '';
const apiKey    = process.env.TEMPORAL_API_KEY || '';
const taskQueue = process.env.TEMPORAL_TASK_QUEUE || 'sms-orchestrator';

async function run() {
  console.log('Temporal env ->', { address, namespace, taskQueue });
  if (!address || !namespace || !apiKey) {
    throw new Error('Missing one of: TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE, TEMPORAL_API_KEY');
  }

  // Temporal Cloud connection: TLS + API key in Authorization header
  const connection = await NativeConnection.connect({
    address,
    tls: {},
    metadata: { authorization: `Bearer ${apiKey}` },
  });

  const worker = await Worker.create({
    connection,
    namespace,
    taskQueue,
    workflowsPath: require.resolve('./workflows'),
    activities, // <-- the entire module object (names → functions)
  });

  await worker.run();
}

run().catch((err) => {
  console.error('Worker fatal:', err);
  process.exit(1);
});
