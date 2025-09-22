import { Client, Connection } from '@temporalio/client';

async function main() {
  const address = process.env.TEMPORAL_ADDRESS!;
  const namespace = process.env.TEMPORAL_NAMESPACE!;
  const apiKey = process.env.TEMPORAL_API_KEY!;
  const taskQueue = process.env.TEMPORAL_TASK_QUEUE || 'sms-orchestrator';

  if (!address || !namespace || !apiKey) {
    throw new Error('Missing TEMPORAL_ADDRESS / TEMPORAL_NAMESPACE / TEMPORAL_API_KEY');
  }

  const connection = await Connection.connect({
    address,
    tls: {}, // Cloud requires TLS
    // If your SDK supports `auth`:
    // auth: { type: 'apiKey', apiKey },
    // Else use headers:
    metadata: { authorization: `Bearer ${apiKey}` },
  });

  const client = new Client({ connection, namespace });

  // tiny smoke test workflow call (assumes you kept the ping-pong workflow)
  const handle = await client.workflow.start('pingPong', {
    taskQueue,
    args: ['hello'],
    workflowId: `hello-${Date.now()}`,
  });

  console.log('🚀 Started workflow:', handle.workflowId);
  console.log('✅ Result:', await handle.result());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
