import path from 'node:path';
import { fileURLToPath } from 'url';
import AutoLoad from '@fastify/autoload';
import fastify, { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const buildApp = fastifyPlugin(async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: {}
  });
});

const start = async (): Promise<void> => {
  const server = fastify({
    logger: true
  });

  try {
    await server.register(buildApp);
    await server.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start().catch(console.error);