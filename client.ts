import { Client, Connection } from '@temporalio/client';

export async function getClient() {
  const address = process.env.TEMPORAL_ADDRESS!;
  const namespace = process.env.TEMPORAL_NAMESPACE!;
  const apiKey = process.env.TEMPORAL_API_KEY!;

  const connection = await Connection.connect({
    address,
    tls: {},
    // for API Key auth (depends on SDK version):
    metadata: { authorization: `Bearer ${apiKey}` },
  });

  return new Client({ connection, namespace });
}
