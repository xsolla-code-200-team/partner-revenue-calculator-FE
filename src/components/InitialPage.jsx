import React,{useState} from 'react';
import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';
import SelectForm from './SelectForm';
import pic1 from '../pics/pic1.jpg';
import MainPage from '../pages/MainPage';
import ResultsField from './ResultsField';


const InitialPage = () => {
    const [isClicked, setClickedButton] = useState(false);
    const handleClick = () => {
        setClickedButton(true);
        console.log(isClicked);
    };
    return (
    <>
        {!isClicked && <div className={styles.InitialPage}>
            <div className={styles.InitialPageView}>
                <div className={styles.InitialPageViewMain}>
                    <div className={styles.InitialPageViewMainForm}>
                        <div className={styles.InitialPageViewMainFormBoxes}>
                            <div className={styles.InitialPageViewMainFormBoxesPicture2}>
                                <p className={styles.picture2}></p>
                            </div>
                            <div className={styles.InitialPageViewMainFormBoxesText}>
                                <div className={styles.InitialPageViewMainFormBoxesTitle}>
                                    <p className={fonts.title2}>START EARNING MORE</p>
                                </div>
                                <div className={styles.InitialPageViewMainFormBoxesText1}>
                                    <p className={fonts.title}>With our calculator you can consider different business plans for your product and choose the best for you and your partners</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.InitialPageViewMainFormBoxes}>
                            <div className={styles.InitialPageViewMainFormBoxesPicture1}>
                            </div>
                            <div className={styles.InitialPageViewMainFormBoxesText}>
                                <div className={styles.InitialPageViewMainFormBoxesTitle}>
                                    <p className={fonts.title2}>SELL IN MORE COUNTRIES</p>
                                </div>
                                <div className={styles.InitialPageViewMainFormBoxesText1}>
                                    <p className={fonts.title}>Use our calculator to compare different distribution options and choose the best one for you</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.InitialPageViewMainFormBoxes}>
                            <div className={styles.InitialPageViewMainFormBoxesPicture3}>
                                <p className={styles.picture3}></p>
                            </div>
                            <div className={styles.InitialPageViewMainFormBoxesText}>
                                <div className={styles.InitialPageViewMainFormBoxesTitle}>
                                    <p className={fonts.title2}>BOOST YOUR REVENUE</p>
                                </div>
                                <div className={styles.InitialPageViewMainFormBoxesText1}>
                                    <p className={fonts.title}>Using our calculator you can boost your revenue and make your company successful</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addMainPage}>
                        <MainPage />
                    </div>
                </div>
            </div>
        </div>
        }
    </>
    );
};

export default InitialPage;
