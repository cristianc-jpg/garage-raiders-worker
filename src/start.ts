import { getClient } from './client';

async function main() {
  const client = await getClient();
  const wf = await client.workflow.start('leadWorkflow', {
    args: ['+17373771036'],
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'sms-orchestrator',
    workflowId: `lead-${Date.now()}`
  });
  console.log('Started workflow:', wf.workflowId);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
