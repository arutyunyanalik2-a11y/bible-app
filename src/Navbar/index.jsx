import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext"; // Подключаем контекст

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage(); // Получаем функцию перевода

    const menu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav>
                <div className="navbar">
                    <div className="menudiv">
                        <button className="menu" onClick={menu}>
                            {isOpen ? <span>✕</span> : <span>☰</span>}
                        </button>
                    </div>

                    <div className={`open-menu ${isOpen ? "open" : ""}`}>
                        <h1>{t("menu")}</h1>
                        <div className="div-m">
                            <Link to="/">
                                <button className="menu-btn">{t("home")}</button>
                            </Link>
                            <Link to="/music">
                                <button className="menu-btn">{t("music")}</button>
                            </Link>
                            <Link to="/settings">
                                <button className="menu-btn">{t("settings")}</button>
                            </Link>
                        </div>
                    </div>
                    <div className={`menu-overlay ${isOpen ? "active" : ""}`} onClick={menu}></div>
                </div>
            </nav>
        </>
    );
}