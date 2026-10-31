// src/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './locales';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    // Проверяем localStorage, при первом запуске ставим русский ("ru")
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('app_lang') || 'ru';
    });

    useEffect(() => {
        localStorage.setItem('app_lang', lang);
    }, [lang]);

    const changeLanguage = (newLang) => {
        setLang(newLang);
    };

    // Функция перевода: t('home') выдаст перевод для текущего языка
    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}