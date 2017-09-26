import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Menu, Popover, Tooltip, Input, Badge } from 'antd';
import steemconnect from 'sc2-sdk';
import Avatar from '../Avatar';
import Notifications from './Notifications/Notifications';
import PopoverMenu, { PopoverMenuItem } from '../PopoverMenu/PopoverMenu';
import './Topnav.less';

const Topnav = ({
  intl,
  username,
  onNotificationClick,
  onSeeAllClick,
  onMenuItemClick,
  notifications,
}) => {
  let content;

  const notificationsCount =
    notifications && notifications.filter(notification => !notification.read).length;

  const next = window.location.pathname.length > 1 ? window.location.pathname : '';

  if (username) {
    content = (
      <div className="Topnav__menu-container">
        <Menu selectedKeys={[]} className="Topnav__menu-container__menu" mode="horizontal">
          <Menu.Item key="write">
            <Tooltip placement="bottom" title={intl.formatMessage({ id: 'write_post', defaultMessage: 'Write post' })}>
              <Link to="/write" className="Topnav__link">
                <i className="iconfont icon-write" />
              </Link>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="user" className="Topnav__item-user">
            <Link className="Topnav__user" to={`/@${username}`}>
              <Avatar username={username} size={36} />
              <span className="Topnav__user__username">
                {username}
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item
            key="notifications"
            className="Topnav__item--badge"
          >
            <Tooltip placement="bottom" title={intl.formatMessage({ id: 'notifications', defaultMessage: 'Notifications' })}>
              <Popover
                placement="bottomRight"
                trigger="click"
                content={
                  <Notifications
                    notifications={notifications}
                    onClick={onNotificationClick}
                    onSeeAllClick={onSeeAllClick}
                  />
                }
                title={intl.formatMessage({ id: 'notifications', defaultMessage: 'Notifications' })}
              >
                <a className="Topnav__link Topnav__link--light">
                  <Badge count={notificationsCount}>
                    <i className="iconfont icon-remind" />
                  </Badge>
                </a>
              </Popover>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="more">
            <Popover
              placement="bottom"
              trigger="click"
              content={
                <PopoverMenu onSelect={onMenuItemClick}>
                  <PopoverMenuItem key="activity">
                    <FormattedMessage id="activity" defaultMessage="Activity" />
                  </PopoverMenuItem>
                  <PopoverMenuItem key="replies">
                    <FormattedMessage id="replies" defaultMessage="Replies" />
                  </PopoverMenuItem>
                  <PopoverMenuItem key="bookmarks">
                    <FormattedMessage id="bookmarks" defaultMessage="Bookmarks" />
                  </PopoverMenuItem>
                  <PopoverMenuItem key="drafts">
                    <FormattedMessage id="drafts" defaultMessage="Drafts" />
                  </PopoverMenuItem>
                  <PopoverMenuItem key="settings">
                    <FormattedMessage id="settings" defaultMessage="Settings" />
                  </PopoverMenuItem>
                  <PopoverMenuItem key="logout">
                    <FormattedMessage id="logout" defaultMessage="Logout" />
                  </PopoverMenuItem>
                </PopoverMenu>
              }
            >
              <a className="Topnav__link Topnav__link--light">
                <i className="iconfont icon-switch" />
              </a>
            </Popover>
          </Menu.Item>
        </Menu>
      </div>
    );
  } else {
    content = (
      <div className="Topnav__menu-container">
        <Menu className="Topnav__menu-container__menu" mode="horizontal">
          <Menu.Item key="signup">
            <a target="_blank" rel="noopener noreferrer" href="https://steemit.com/pick_account">
              <FormattedMessage id="signup" defaultMessage="Sign up" />
            </a>
          </Menu.Item>
          <Menu.Item key="divider" disabled>
            |
          </Menu.Item>
          <Menu.Item key="login">
            <a href={steemconnect.getLoginURL(next)}>
              <FormattedMessage id="login" defaultMessage="Log in" />
            </a>
          </Menu.Item>
        </Menu>
      </div>
    );
  }

  return (
    <div className="Topnav">
      <div className="topnav-layout container">
        <div className="left">
          <Link className="Topnav__brand" to="/">
            Utopian
          </Link>
        </div>
        <div className="center">
          <div className="Topnav__input-container">
            <Input
              onPressEnter={event => window.open(`https://www.google.com/search?q=${encodeURIComponent(`site:utopian.io ${event.target.value}`)}`)}
              placeholder={intl.formatMessage({ id: 'search_placeholder', defaultMessage: 'Search...' })}
            />
            <i className="iconfont icon-search" />
          </div>
        </div>
        <div className="right">
          {content}
        </div>
      </div>
    </div>
  );
};

Topnav.propTypes = {
  intl: PropTypes.shape().isRequired,
  username: PropTypes.string,
  onNotificationClick: PropTypes.func,
  onSeeAllClick: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  notifications: PropTypes.arrayOf(PropTypes.shape()),
};

Topnav.defaultProps = {
  username: undefined,
  onNotificationClick: () => {},
  onSeeAllClick: () => {},
  onMenuItemClick: () => {},
  notifications: [],
};

export default injectIntl(Topnav);
