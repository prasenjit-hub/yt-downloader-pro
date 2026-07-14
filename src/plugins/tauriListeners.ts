import { registerMediaListeners } from '../tauri/listeners/media';
import { registerProgressListeners } from '../tauri/listeners/progress';
import { registerDestinationListeners } from '../tauri/listeners/destination';
import { registerBinaryListeners } from '../tauri/listeners/binaries';
import { registerUpdaterListeners } from '../tauri/listeners/updater';
import { registerDiagnosticsListeners } from '../tauri/listeners/diagnostics.ts';
import { registerAppListeners } from '../tauri/listeners/app.ts';
import { registerShortcutListeners } from '../tauri/listeners/shortcuts.ts';

export default {
  install() {
    try {
      registerAppListeners();
    } catch { /* Tauri not available */ }
    try {
      registerMediaListeners();
    } catch { /* Tauri not available */ }
    try {
      registerProgressListeners();
    } catch { /* Tauri not available */ }
    try {
      registerDestinationListeners();
    } catch { /* Tauri not available */ }
    try {
      registerBinaryListeners();
    } catch { /* Tauri not available */ }
    try {
      registerUpdaterListeners();
    } catch { /* Tauri not available */ }
    try {
      registerDiagnosticsListeners();
    } catch { /* Tauri not available */ }
    try {
      registerShortcutListeners();
    } catch { /* Tauri not available */ }
  },
};
