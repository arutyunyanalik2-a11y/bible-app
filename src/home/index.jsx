import { useLanguage } from '../LanguageContext';

import "./style.css"


export default function Home() {
    const { t } = useLanguage();





    return (
        <>
            <div className="home">
                <h1 style={{marginLeft: "10px"}}>{t("home")}</h1>

                <div className='saxmosner-div'>
                    <p>{t("saxmosner1")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner2")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner3")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner4")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner5")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner6")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner7")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner8")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner9")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner10")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner11")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner12")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner13")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner1")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner14")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner15")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner16")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner17")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner18")}</p>
                </div>
                <div className='saxmosner-div'>
                    <p>{t("saxmosner19")}</p>
                </div>
                
            </div>
        </>
    )
}