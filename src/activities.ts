export async function ping(msg: string): Promise<string> {
  console.log('activity ping:', msg);
  return `pong: ${msg}`;
}
