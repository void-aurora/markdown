import { resolve } from 'path';
import fs from 'fs-extra';

export async function readSample(filename: string): Promise<string> {
  return fs.readFile(resolve(__dirname, '..', 'samples', filename), 'utf-8');
}

export async function writeSample(filename: string, content: string): Promise<void> {
  return fs.outputFile(resolve(__dirname, '..', 'samples', filename), content);
}
