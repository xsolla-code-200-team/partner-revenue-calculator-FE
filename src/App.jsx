import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import MainPage from './MainPage';
import styles from './scss/styles.scss';
import fonts from './scss/fonts.scss';
import logo from './pics/logo.png';

const App = () => (
  <div className={styles.body}>
    <header className={styles.appHeader}>
      <div className={styles.appHeaderLeft}>
        <div className={styles.appHeaderLogoImg}>
          <img src={logo} style={{ width: '100px', height: '100px' }} />
        </div>
        <div className={styles.appHeaderLogoText}>
          <a className={fonts.display}>Xsolla Partner Calculator</a>
        </div>
      </div>
      <div className={styles.appHeaderRight}>
        {/* <button type="button">
          <span>contact us</span>
        </button> */}
      </div>
    </header>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
    <footer className={styles.appFooter} />
  </div>
);

export default hot(App);
