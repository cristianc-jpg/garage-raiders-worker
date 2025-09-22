cat > src/client.ts <<'EOF'
import { Client, Connection } from '@temporalio/client';

async function main() {
  const address   = process.env.TEMPORAL_ADDRESS!;
  const namespace = process.env.TEMPORAL_NAMESPACE!;
  const apiKey    = process.env.TEMPORAL_API_KEY!;
  const taskQueue = process.env.TEMPORAL_TASK_QUEUE || 'sms-orchestrator';

  const connection = await Connection.connect({
    address,
    // If your SDK supports the typed option, uncomment next line and remove metadata below:
    // auth: { type: 'apiKey', apiKey },
    // Otherwise use header-based auth:
    metadata: { 'authorization': `Bearer ${apiKey}` },
  });

  const client = new Client({ connection, namespace });

  // Kick off a tiny test workflow
  const handle = await client.workflow.start('helloWorkflow', {
    taskQueue,
    workflowId: `hello-${Date.now()}`,
    args: ['Cristian'],
  });

  console.log('🚀 Started workflow:', handle.workflowId);
  const result = await handle.result();
  console.log('✅ Result:', result);
}

main().catch((err) => {
  console.error('Client failed:', err);
  process.exit(1);
});
EOF
