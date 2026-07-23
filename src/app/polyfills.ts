/* eslint-disable @typescript-eslint/no-explicit-any */
(window as any).global = window;
(globalThis as any).process = { env: {} };
(globalThis as any).Buffer = (globalThis as any).Buffer || [];