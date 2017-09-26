import React from 'react';

import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { Route, Switch } from 'react-router-dom';
import Wrapper from './Wrapper';
import Settings from './app/AppSettings';
import ProfileSettings from './app/ProfileSettings';
import Activity from './activity/Activity';

import Page from './feed/Page';
import Replies from './replies/Replies';
import User from './user/User';
import Tags from './tags/Tags';
import Donors from './statics/Donors';
import Post from './post/Post';
import Bookmarks from './bookmarks/Bookmarks';
import About from './statics/About';
import Help from './statics/Help';
import Team from './statics/Team';
import Write from './post/Write/Write';
import Drafts from './post/Write/Drafts';
import RequireLogin from './auth/RequireLogin';

export default (
  <Wrapper>
    <Switch>
      <Route exact path="/" component={Page} />
      <Route
        path="/replies"
        render={() => (
          <RequireLogin>
            <Replies />
          </RequireLogin>
        )}
      />
      {/*
      <Route path="/help" component={Help} />
      <Route path="/about" component={About} />
      <Route path="/team" component={Team} />
      <Route path="/tags" component={Tags} />
      <Route path="/donors" component={Donors} />
      */}
      <Route
        path="/bookmarks"
        render={() => (
          <RequireLogin>
            <Bookmarks />
          </RequireLogin>
        )}
      />
      <Route
        path="/write"
        render={() => (
          <RequireLogin>
            <Write />
          </RequireLogin>
        )}
      />
      <Route
        path="/drafts"
        render={() => (
          <RequireLogin>
            <Drafts />
          </RequireLogin>
        )}
      />
      <Route
        path="/activity"
        render={() => (
          <RequireLogin>
            <Activity />
          </RequireLogin>
        )}
      />
      <Route
        path="/settings"
        render={() => (
          <RequireLogin>
            <Settings />
          </RequireLogin>
        )}
      />
      <Route
        path="/edit-profile"
        render={() => (
          <RequireLogin>
            <ProfileSettings />
          </RequireLogin>
        )}
      />
      <Route path="/@:name" component={User} />
      <Route path="/:category/@:author/:permlink" component={Post} />
      <Route path="/" component={Page} />
    </Switch>
  </Wrapper>
);

export const history =
  typeof window === 'undefined' ? createMemoryHistory() : createBrowserHistory();
