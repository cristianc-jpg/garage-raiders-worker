import { proxyActivities } from '@temporalio/workflow';

const { ping } = proxyActivities<{ ping(msg: string): Promise<string> }>({
  startToCloseTimeout: '1 minute',
});

export async function testWorkflow(name: string): Promise<string> {
  return await ping(`hello ${name}`);
}
