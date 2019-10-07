import { clipboard } from 'electron';
export function getString(type) {
    return Promise.resolve(clipboard.readText(type));
}
export function setString(text, type) {
    clipboard.writeText(text, type);
}
//# sourceMappingURL=Clipboard.desktop.js.map