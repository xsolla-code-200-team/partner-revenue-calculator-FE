import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import MainPage from './MainPage';
import styles from './scss/styles.scss';

const App = () => (
  <div className={styles.content}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        {/* <Route path="/events/:id/:name">
          <EventPage /> */}
        {/* </Route> */}
      </Switch>
    </BrowserRouter>
  </div>
);

export default hot(App);
