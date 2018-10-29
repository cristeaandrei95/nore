import { randomBytes } from "crypto";
import MemoryStore from "./MemoryStore.js";

export function randomString(n = 128) {
	return randomBytes(n).toString("hex");
}

export { MemoryStore };
