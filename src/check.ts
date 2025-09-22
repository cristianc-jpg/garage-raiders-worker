import { Connection } from '@temporalio/client';

async function main() {
  const address   = process.env.TEMPORAL_ADDRESS!;
  const namespace = process.env.TEMPORAL_NAMESPACE!;
  const apiKey    = process.env.TEMPORAL_API_KEY!;

  if (!address || !namespace || !apiKey) {
    throw new Error('Missing TEMPORAL_ADDRESS / TEMPORAL_NAMESPACE / TEMPORAL_API_KEY');
  }

  console.log('About to connect →', { address, namespace });

  const conn = await Connection.connect({
    address,
    tls: {},
    // API key via headers (works across SDK versions)
    metadata: { authorization: `Bearer ${apiKey}` },
  });

  console.log('✅ Connected to', conn.options.address, 'namespace', namespace);
  process.exit(0);
}

main().catch((e) => { console.error('❌ Connect failed:', e); process.exit(1); });
