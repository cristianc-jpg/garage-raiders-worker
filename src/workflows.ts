// Workflows are deterministic; avoid non-deterministic IO here.
// Use activities for IO, network, DB, etc.

export async function leadWorkflow(phone: string): Promise<void> {
  // Minimal workflow just logs (Temporal UI will show runs)
  // Add timers/signals later as you build flows
  console.log('leadWorkflow started for', phone);
}
