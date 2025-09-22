import { Client, Connection } from '@temporalio/client';

export async function getClient() {
  const address = process.env.TEMPORAL_ADDRESS!;
  const namespace = process.env.TEMPORAL_NAMESPACE!;
  const apiKey = process.env.TEMPORAL_API_KEY!;

  const connection = await Connection.connect({
    address,
    tls: {}, // Temporal Cloud uses TLS
    // Most Node SDKs today use headers for API key auth:
    metadata: { authorization: `Bearer ${apiKey}` },
    // If your SDK supports the typed option instead, use:
    // auth: { type: 'apiKey', apiKey }
  });

  return new Client({ connection, namespace });
}
