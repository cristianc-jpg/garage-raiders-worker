import { Connection } from '@temporalio/client';

async function main() {
  const c = await Connection.connect({
    address: process.env.TEMPORAL_ADDRESS!,
    tls: {},
    auth: { type: 'apiKey', apiKey: process.env.TEMPORAL_API_KEY! },
  });
  console.log('✅ Connected to', c.options.address);
  process.exit(0);
}
main().catch((e) => { console.error('❌ Connect failed:', e); process.exit(1); });
