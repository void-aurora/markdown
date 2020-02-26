if (!process.env.npm_config_user_agent.startsWith('pnpm')) {
  console.log('Use `pnpm -r install` to install dependencies in this repository');
  process.exit(1);
}
