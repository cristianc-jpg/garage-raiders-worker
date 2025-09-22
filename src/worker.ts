cat > src/worker.ts <<'EOF'
import { Worker } from '@temporalio/worker';

/** Register activities by file path. We’ll add real ones later. */
async function run() {
  const taskQueue = process.env.TEMPORAL_TASK_QUEUE || 'sms-orchestrator';

  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities: require('./activities'),
    taskQueue,
  });

  console.log(`✅ Worker started on task queue: ${taskQueue} (namespace via .env)`);
  await worker.run();
}

run().catch((err) => {
  console.error('Worker failed:', err);
  process.exit(1);
});
EOF
