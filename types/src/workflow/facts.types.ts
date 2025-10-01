import type { z } from 'zod';
import { FactRegistry } from './facts.registry';

type Registry = typeof FactRegistry;

export type FactKey = keyof Registry;

export type FactValueOf<K extends FactKey> = z.infer<Registry[K]['schema']>;
