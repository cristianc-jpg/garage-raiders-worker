import { Connection } from '@temporalio/client';

const address   = process.env.TEMPORAL_ADDRESS || '';
const namespace = process.env.TEMPORAL_NAMESPACE || '';
const apiKey    = process.env.TEMPORAL_API_KEY || '';

(async () => {
  console.log('Checking ->', { address, namespace });
  if (!address || !namespace || !apiKey) {
    throw new Error('Missing envs (ADDRESS / NAMESPACE / API_KEY)');
  }

  // Use Authorization header for Temporal Cloud
  const conn = await Connection.connect({
    address,
    tls: {},
    metadata: { authorization: `Bearer ${apiKey}` },
  });

  // Minimal RPC to verify connectivity/auth
  await conn.workflowService.getSystemInfo({});
  console.log('✅ Temporal connection OK');
  process.exit(0);
})().catch((e) => {
  console.error('❌ Temporal connection failed:', e);
  process.exit(1);
});
