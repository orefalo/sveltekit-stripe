import { LowSync, MemorySync } from 'lowdb';

type Data = {
	users: string[];
};

export const db = new LowSync(new MemorySync<Data>());
