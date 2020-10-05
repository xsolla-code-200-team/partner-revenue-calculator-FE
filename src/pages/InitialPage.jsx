import React from 'react';

import MainPage from './MainPage';
import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';

const InitialPage = () => {
    return (
    <>
        <div className={styles.InitialPage}>
            <div className={styles.InitialPageCard}>
                <div className={styles.InitialPageCard__picture_2}>
                </div>
                <div className={styles.InitialPageCardTitle}>
                    <p className={`${fonts.title2} ${styles.InitialPageCard__text_main}`}>START EARNING MORE</p>
                    <p className={`${fonts.title} ${styles.InitialPageCard__text_regular}`}>Are you a game developer? Xsolla Partner Calculator is a new instrument that will help you forecast your revenue from partnership with Xsolla. All you have to do is fill in a short form.</p>
                </div>
            </div>
            <div className={styles.InitialPageCard}>
                <div className={styles.InitialPageCard__picture_1}>
                </div>
                <div className={styles.InitialPageCardTitle}>
                    <p className={`${fonts.title2} ${styles.InitialPageCard__text_main}`}>SELL IN MORE COUNTRIES</p>
                    <p className={`${fonts.title} ${styles.InitialPageCard__text_regular}`}>Has your game been released? Hit the pink button to answer some questions and get our expert advice.</p>
                </div>
            </div>
            <div className={styles.InitialPageCard}>
                <div className={styles.InitialPageCard__picture_3}></div>
                <div className={styles.InitialPageCardTitle}>
                    <p className={`${fonts.title2} ${styles.InitialPageCard__text_main}`}>BOOST YOUR REVENUE</p>
                    <p className={`${fonts.title} ${styles.InitialPageCard__text_regular}`}>Still working on your game? Hit the gray button to answer some questions and see an insightful action plan.</p>
                </div>
            </div>
        </div>
        <MainPage />
    </>
    );
};

export default InitialPage;
