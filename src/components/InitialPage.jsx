import React,{useState} from 'react';
import styles from '../scss/styles.scss';
import fonts from '../scss/fonts.scss';
import SelectForm from './SelectForm';

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
                            <div className={styles.InitialPageViewMainFormBoxesPicture}>
                                <p className={styles.picture1}></p>
                            </div>
                            <div className={styles.InitialPageViewMainFormBoxesText}>
                                <div className={styles.InitialPageViewMainFormBoxesTitle}>
                                    <p className={fonts.title2}>SELL IN MORE COUNTRIES</p>
                                </div>
                                <div className={styles.InitialPageViewMainFormBoxesText1}>
                                    <p className={fonts.display}>Build direct relationship with players to grow your business</p>
                                </div>
                                <div className={styles.InitialPageViewMainFormBoxesText2}>
                                    <p className={fonts.header}>Some info</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.InitialPageViewMainFormBoxes}>
                            <div className={styles.InitialPageViewMainFormBoxesPicture}>
                                <p className={styles.picture2}></p>
                            </div>
                            <div className={styles.InitialPageViewMainFormBoxesText}>
                                <div className={styles.InitialPageViewMainFormBoxesTitle}>
                                    <p className={fonts.title2}>START EARNING MORE</p>
                                </div>
                                <div className={styles.InitialPageViewMainFormBoxesText1}>
                                    <p className={fonts.display}>Build direct relationship with players to grow your business</p>
                                </div>
                                <div className={styles.InitialPageViewMainFormBoxesText2}>
                                    <p className={fonts.header}>Some info</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.InitialPageViewMainFormBoxes}>
                            <div className={styles.InitialPageViewMainFormBoxesPicture}>
                                <p className={styles.picture3}></p>
                            </div>
                            <div className={styles.InitialPageViewMainFormBoxesText}>
                                <div className={styles.InitialPageViewMainFormBoxesTitle}>
                                    <p className={fonts.title2}>BOOST YOUR REVENUE</p>
                                </div>
                                <div className={styles.InitialPageViewMainFormBoxesText1}>
                                    <p className={fonts.display}>Build direct relationship with players to grow your business</p>
                                </div>
                                <div className={styles.InitialPageViewMainFormBoxesText2}>
                                    <p className={fonts.header}>Some info</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.InitialPageViewCalculateFormButton}>
                        <div className={styles.InitialPageViewCalculateFormButtonView}>
                            <button onClick={handleClick}><p className={fonts.title2}>HOW MUCH WILL YOU EARN WITH XSOLLA?</p></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        {isClicked && <SelectForm />}
    </>
    );
};

export default InitialPage;
