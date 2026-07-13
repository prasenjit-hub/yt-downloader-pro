use tauri::{AppHandle, Manager};

#[tauri::command]
pub fn ad_clicked(app: AppHandle) {
  if let Some(window) = app.get_webview_window("main") {
    let _ = window.show();
    let _ = window.set_focus();
  }
}
