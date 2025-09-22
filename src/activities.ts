// Put your non-deterministic work here (DB calls, HTTP, etc.)

export async function pingOwner(phone: string, note?: string) {
  console.log(`[activity] pingOwner -> ${phone} (${note || 'no note'})`);
  // later: call your /api/reply or Twilio directly, etc.
  return true;
}
