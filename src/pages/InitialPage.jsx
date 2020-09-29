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
                    <p className={`${fonts.title} ${styles.InitialPageCard__text_regular}`}>With our calculator you can consider different business plans for your product and choose the best for you and your partners</p>
                </div>
            </div>
            <div className={styles.InitialPageCard}>
                <div className={styles.InitialPageCard__picture_1}>
                </div>
                <div className={styles.InitialPageCardTitle}>
                    <p className={`${fonts.title2} ${styles.InitialPageCard__text_main}`}>SELL IN MORE COUNTRIES</p>
                    <p className={`${fonts.title} ${styles.InitialPageCard__text_regular}`}>Use our calculator to compare different distribution options and choose the best one for you</p>
                </div>
            </div>
            <div className={styles.InitialPageCard}>
                <div className={styles.InitialPageCard__picture_3}>
                </div>
                <div className={styles.InitialPageCardTitle}>
                    <p className={`${fonts.title2} ${styles.InitialPageCard__text_main}`}>BOOST YOUR REVENUE</p>
                    <p className={`${fonts.title} ${styles.InitialPageCard__text_regular}`}>Using our calculator you can boost your revenue and make your company successful</p>
                </div>
            </div>
        </div>
        <MainPage />
    </>
    );
};

export default InitialPage;
