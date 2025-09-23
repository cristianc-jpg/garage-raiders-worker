import { proxyActivities } from '@temporalio/workflow';
const { echo } = proxyActivities<{ echo(msg: string): Promise<string> }>({
  startToCloseTimeout: '1 minute',
});
export async function pingWorkflow(msg: string): Promise<string> {
  return await echo(msg);
}
