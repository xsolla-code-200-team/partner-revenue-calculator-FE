import React from 'react';
import {
  BrowserRouter, Route, Switch, Link,
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import AboutUsButton from './components/AboutUsButton';
import ContactUsButton from './components/ContactUsButton';
import styles from './scss/styles.scss';
import fonts from './scss/fonts.scss';
import logo from './pics/logo.png';
import InitialPage from './pages/InitialPage';

const App = () => (
  <div className={styles.body}>
    <header className={styles.appHeader}>
      <div className={styles.appHeaderLogo}>
        <div className={styles.appHeaderLogo__img}>
          <a href="https://xsolla.com/" target="_blank">
            <img src={logo} />
          </a>
        </div>
        <div className={styles.appHeaderLogo__text}>
          <a className={fonts.display} href="/">Xsolla Partner Calculator</a>
        </div>
      </div>
      <div className={styles.appHeaderButtons}>
        <AboutUsButton />
        <ContactUsButton />
      </div>
    </header>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <InitialPage />
        </Route>
      </Switch>
    </BrowserRouter>
    <footer className={styles.appFooter} />
  </div>
);

export default hot(App);
