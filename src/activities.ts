export const activities = {
  echo(msg: string) {
    console.log('activity.echo ->', msg);
    return `echo: ${msg}`;
  }
};
