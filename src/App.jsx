import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Setting from './Setting';
import Music from './Music';
import Home from './home';
import { LanguageProvider } from './LanguageContext';
import Navbar from './Navbar';
import NotificationScheduler from './NotificationScheduler';


export default function App() {
    return (
        <LanguageProvider>
            {/* Работает всё время, пока приложение запущено, независимо от страницы */}
            <NotificationScheduler />
            <Router>
                <Navbar />
                <Routes>
                    {/* Главная страница */}
                    <Route path="/" element={<Home />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/settings" element={<Setting />} />

                    <Route path="*" element={<Home />} />
                </Routes>
            </Router>
        </LanguageProvider>
    );
}