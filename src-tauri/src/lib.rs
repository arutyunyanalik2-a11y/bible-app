#[cfg(desktop)]
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    Manager, WindowEvent,
};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            #[cfg(desktop)]
            {
                let show = MenuItem::with_id(app, "show", "Открыть", true, None::<&str>)?;
                let quit = MenuItem::with_id(app, "quit", "Выход", true, None::<&str>)?;
                let menu = Menu::with_items(app, &[&show, &quit])?;

                TrayIconBuilder::new()
                    .icon(app.default_window_icon().unwrap().clone())
                    .menu(&menu)
                    .on_menu_event(|app, event| match event.id.as_ref() {
                        "show" => {
                            if let Some(w) = app.get_webview_window("main") {
                                let _ = w.show();
                                let _ = w.unminimize();
                                let _ = w.set_focus();
                            }
                        }
                        "quit" => app.exit(0),
                        _ => {}
                    })
                    .build(app)?;
            }
            Ok(())
        })
        .on_window_event(|_window, _event| {
            // При закрытии окна на десктопе — прячем в трей, а не завершаем приложение
            #[cfg(desktop)]
            if let WindowEvent::CloseRequested { api, .. } = _event {
                let _ = _window.hide();
                api.prevent_close();
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}