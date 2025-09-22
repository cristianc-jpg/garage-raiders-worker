cat > src/workflows.ts <<'EOF'
export async function helloWorkflow(name: string): Promise<string> {
  return `Workflow says: pong: hello, ${name}`;
}
EOF
