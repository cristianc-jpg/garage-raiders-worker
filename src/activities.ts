// src/activities.ts

// You can flesh these out later; for now they just log.
async function sendSmsActivity(args: { to: string; body: string }) {
  console.log('sendSmsActivity ->', args);
  // TODO: call your Twilio via an internal API or direct SDK if desired
  return { ok: true };
}

async function noopActivity() {
  console.log('noopActivity');
  return { ok: true };
}

// Export as "activities" so worker.ts can import { activities }
export const activities = {
  sendSmsActivity,
  noopActivity,
};
