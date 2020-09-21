import React from 'react';
import {
  BrowserRouter, Route, Switch, Link,
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { Button } from 'xsolla-uikit';

import MainPage from './pages/MainPage';
import styles from './scss/styles.scss';
import fonts from './scss/fonts.scss';
import logo from './pics/logo.png';

const App = () => (
  <div className={styles.body}>
    <header className={styles.appHeader}>
      <div className={styles.appHeaderLogo}>
        <div className={styles.appHeaderLogoImg}>
          <img src={logo} style={{ width: '100px', height: '100px' }} />
        </div>
        <div className={styles.appHeaderLogoText}>
          <a className={fonts.display}>Xsolla Partner Calculator</a>
        </div>
      </div>
      <div className={styles.appHeaderAbout}>
        <a className={fonts.header} href="https://xsolla.com/about">About us</a>
      </div>
      <div className={styles.appHeaderContact}>
        <button
          type="button"
        >
          <a className={fonts.header} href="https://xsolla.com/contact-sales">Contact us</a>
        </button>
      </div>
    </header>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage />
          {/* Route for InitialPage */}
        </Route>
        <Route path="/calculator">
          {/* Route for MainPage */}
        </Route>
      </Switch>
    </BrowserRouter>
    <footer className={styles.appFooter} />
  </div>
);

export default hot(App);
