import {
    sendNotification,
    isPermissionGranted,
    requestPermission,
    createChannel,
    cancelAll,
    Importance,
    Visibility,
    Schedule,
} from "@tauri-apps/plugin-notification";
import { translations } from "./locales";

const CHANNEL_ID = "daily-verse";
const VERSES_COUNT = 19;
const DAYS_AHEAD = 30;

export const isAndroid = () => /android/i.test(navigator.userAgent);

export const getStoredTime = () => localStorage.getItem("app_notif_time") || "11:00";

export async function ensurePermission() {
    let granted = await isPermissionGranted();
    if (!granted) {
        const permission = await requestPermission();
        granted = permission === "granted";
    }
    return granted;
}

async function ensureChannel(lang) {
    if (!isAndroid()) return;
    try {
        await createChannel({
            id: CHANNEL_ID,
            name: translations[lang]?.notificationTitle || "Word for Today",
            description: "Daily verse",
            importance: Importance.High,
            visibility: Visibility.Public,
        });
    } catch (e) {
        console.warn("createChannel error:", e);
    }
}

function getVerse(lang, index) {
    return translations[lang]?.[`saxmosner${index}`] || "Word of the day";
}

// Немедленное уведомление (тестовая кнопка и Windows)
export async function showVerseNow(lang) {
    const granted = await ensurePermission();
    if (!granted) {
        throw new Error("Разрешение на уведомления отклонено системой");
    }
    await ensureChannel(lang);

    const randomIndex = Math.floor(Math.random() * VERSES_COUNT) + 1;
    await sendNotification({
        channelId: isAndroid() ? CHANNEL_ID : undefined,
        title: translations[lang]?.notificationTitle || "Word for Today",
        body: getVerse(lang, randomIndex),
    });
}

// Android: планируем уведомления на 30 дней вперёд (каждый день свой стих)
export async function scheduleAndroid(lang, timeStr) {
    const granted = await ensurePermission();
    if (!granted) return;
    await ensureChannel(lang);

    try {
        await cancelAll();
    } catch (e) {
        console.warn("cancelAll error:", e);
    }

    const [h, m] = timeStr.split(":").map(Number);
    const now = new Date();

    const first = new Date();
    first.setHours(h, m, 0, 0);
    const startOffset = first > now ? 0 : 1;

    for (let i = 0; i < DAYS_AHEAD; i++) {
        const date = new Date();
        date.setDate(date.getDate() + startOffset + i);
        date.setHours(h, m, 0, 0);

        const dayNumber = Math.floor(date.getTime() / 86400000);
        const verseIndex = (dayNumber % VERSES_COUNT) + 1;

        await sendNotification({
            id: 1000 + i,
            channelId: CHANNEL_ID,
            title: translations[lang]?.notificationTitle || "Word for Today",
            body: getVerse(lang, verseIndex),
            schedule: Schedule.at(date, false, true),
        });
    }
}