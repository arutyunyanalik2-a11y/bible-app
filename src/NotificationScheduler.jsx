import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { isAndroid, getStoredTime, showVerseNow, scheduleAndroid } from "./notifications";

export default function NotificationScheduler() {
    const { lang } = useLanguage();
    const [time, setTime] = useState(getStoredTime);

    // Слушаем смену времени из настроек
    useEffect(() => {
        const handler = () => setTime(getStoredTime());
        window.addEventListener("notif-time-changed", handler);
        return () => window.removeEventListener("notif-time-changed", handler);
    }, []);

    useEffect(() => {
        // ANDROID: системные запланированные уведомления
        if (isAndroid()) {
            scheduleAndroid(lang, time).catch((e) =>
                console.error("Ошибка планирования:", e)
            );
            return;
        }

        // WINDOWS / DESKTOP: таймер, живущий пока работает приложение
        const check = () => {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, "0");
            const mm = String(now.getMinutes()).padStart(2, "0");
            const currentTime = `${hh}:${mm}`;
            const todayStr = now.toDateString();

            if (currentTime >= time && localStorage.getItem("last_sent_date") !== todayStr) {
                localStorage.setItem("last_sent_date", todayStr);
                showVerseNow(lang).catch((e) =>
                    console.error("Ошибка уведомления:", e)
                );
            }
        };

        check();
        const id = setInterval(check, 20000);
        return () => clearInterval(id);
    }, [lang, time]);

    return null;
}