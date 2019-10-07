import { clipboard } from 'electron';

type SelectionType = "selection" | "clipboard";

export function getString(type?: SelectionType): Promise<string | undefined> {
  return Promise.resolve(clipboard.readText(type))
}

export function setString(text: string, type?: SelectionType): void {
  clipboard.writeText(text, type);
}