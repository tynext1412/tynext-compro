import data from "./ipc-products.json";

// Dibuat dari file Excel oleh `npm run ipc:import`; jangan sunting ipc-products.json dengan tangan.
export type IpcColumn = { key: string; label: string };
export type IpcCatalog = { columns: IpcColumn[]; rows: Record<string, string>[] };

export const ipcCatalog: IpcCatalog = data;
