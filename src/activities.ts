// ~/garage-raiders-worker/src/activities.ts

// Example activity: send an SMS (stub for now)
export async function sendSmsActivity(args: { to: string; body: string }) {
  console.log('sendSmsActivity ->', args);
  // TODO: call your Twilio (SDK) or your Vercel API endpoint here
  return { ok: true };
}

// Example activity: no-op
export async function noopActivity() {
  console.log('noopActivity');
  return { ok: true };
}
