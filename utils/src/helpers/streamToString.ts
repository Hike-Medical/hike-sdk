import { Readable } from 'stream';

/** Converts a readable stream into a Buffer.  */
export const streamToString = async (stream: Readable): Promise<Buffer> =>
  await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk, 'base64')));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
