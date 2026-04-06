import fs from "node:fs/promises";
import path from "node:path";

const storageDir = path.resolve("backend/storage");
const messagesFile = path.join(storageDir, "contact-messages.json");

const ensureStorage = async () => {
  await fs.mkdir(storageDir, { recursive: true });
  try {
    await fs.access(messagesFile);
  } catch {
    await fs.writeFile(messagesFile, "[]", "utf8");
  }
};

export const saveContactMessage = async (entry) => {
  await ensureStorage();
  const currentRaw = await fs.readFile(messagesFile, "utf8");
  const current = JSON.parse(currentRaw);
  current.unshift(entry);
  await fs.writeFile(messagesFile, JSON.stringify(current, null, 2), "utf8");
  return entry;
};
