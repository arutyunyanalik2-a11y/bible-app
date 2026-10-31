import React, { useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import "./style.css";

const tracks = [
    { id: 1, name: 'Преклоняюсь', src: '/audio1.mp3' },
    { id: 2, name: 'Иешуа', src: '/audio2.mp3' },
    { id: 3, name: 'Я знаю, кто я в Тебе', src: '/audio3.mp3' },
    { id: 4, name: 'Շնորհավոր Սուրբ Ծնունդ', src: '/audio4.mp3' },
];

export default function Music() {
    const [activeId, setActiveId] = useState(null);
    const audioRef = useRef(null);
    const { t } = useLanguage();

    const handlePlay = (track) => {
        if (activeId === track.id) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setActiveId(null);
            return;
        }

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const audio = new Audio(track.src);
        audioRef.current = audio;

        audio.play()
            .then(() => {
                setActiveId(track.id);
            })
            .catch((error) => console.error("Ошибка воспроизведения:", error));

        audio.onended = () => {
            setActiveId(null);
        };
    };

    return (
        <>
            <div className='menu-music'>
                <h2 className='playlist'>{t("playlist")}</h2>
                <div className='player-div'>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {tracks.map((track) => {
                            const isPlaying = activeId === track.id;
                            return (
                                <button
                                    key={track.id}
                                    onClick={() => handlePlay(track)}
                                    className='music-btn'
                                    style={{
                                        backgroundColor: isPlaying ? '#ff9d00' : 'rgb(112, 210, 255)',
                                        boxShadow: isPlaying ? '0px 0px 20px gold' : '0px 0px 1px white',
                                    }}
                                >
                                    {isPlaying 
                                        ? `⏸ ${t("stop")} ${track.name}` 
                                        : `▶ ${t("play")} ${track.name}`}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className='krugner'>
                    <div className='krug1'></div>
                    <div className='krug2'></div>
                </div>
            </div>
        </>
    );
}