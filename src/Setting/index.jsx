import React from "react";
import { useLanguage } from "../LanguageContext";
import "./style.css";

export default function Setting() {
    const { lang, changeLanguage, t } = useLanguage();

    return (
        <div className="set-div" >
            <h2>{t("settings")}</h2>
            <div style={{ marginTop: "15px" }}>
                <label style={{ marginRight: "10px" }}>{t("language")}:</label>
                <select 
                    value={lang} 
                    onChange={(e) => changeLanguage(e.target.value)}
                    style={{ padding: "5px 10px", borderRadius: "5px" }}
                >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="hy">Հայերեն</option>
                </select>
            </div>
            <div className='krugner'>
                    <div className='krug1'></div>
                    <div className='krug2'></div>
                </div>
        </div>
    );
}