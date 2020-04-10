import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import NavBar from './index';
import Badge from '../Badge';

// TODO[1]: Do this with CSS only.
const openLogoUrl = 'https://app.optimizely.com/dist/static/img/rebrand/logo-f64d2aed989db744b609666199d7d2a2.svg';
const collapsedLogoUrl = 'https://app.optimizely.com/dist/static/img/rebrand/symbol-c90e70f8502ec71c46e528c5da800028.svg';

const getLogoUrl = isOpen => isOpen ? openLogoUrl : collapsedLogoUrl;

const stories = storiesOf('NavBar', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      { story() }
    </div>
  ));

stories
  .add('With All Options', (() => {
    return (
      <NavBar
        isOpen={ boolean('isOpen', true) }
        logoUrl={ getLogoUrl(boolean('isOpen', true)) }
        title="Test Project"
        badgeText="WEB"
        badgeColor="draft"
        homeUrl="http://optimizely.com"
        trialContent={
          <div className="push-double--bottom push-double--left truncate">
            { boolean('isOpen', true) && '5 days left in your trial' }
          </div>
        }>
        <NavBar.PrimaryLink
          iconName="projects"
          type="pushstate"
          linkLabel="Projects"
          testSection="projects"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="experiment"
          type="link"
          linkLabel={ <div>Experiments&nbsp;<Badge color="primary">New</Badge></div> }
          testSection="experiment"
          isActive={ true }
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="rollouts"
          type="link"
          linkLabel="Features"
          testSection="features"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="audiences"
          type="link"
          linkLabel="Audiences"
          testSection="audiences"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="events"
          type="button"
          linkLabel="Events"
          testSection="events"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="settings"
          type="link"
          linkLabel="Settings"
          testSection="settings"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="getting-started"
          type="pushstate"
          linkLabel="Getting Started"
          testSection="getting-started"
          hasSeparator={ true }
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.SecondaryLink
          iconName="program-management"
          type="button"
          linkLabel="Program Management"
          testSection="program-management"
          onClick={ action('SecondaryLink onClick') }
        />
        <NavBar.SecondaryLink
          iconName="help"
          type="link"
          linkLabel="Help"
          testSection="help"
          onClick={ action('SecondaryLink onClick') }
        />
        <NavBar.SecondaryLink
          onClick={ action('SecondaryLink onClick') }
          iconName="feedback"
          type="link"
          linkLabel="Feedback"
          testSection="feedback"
        />
        <NavBar.CurrentUserMenu
          showEmulate={ boolean('showEmulate', true) }
          onEmulateClick={ action('onEmulateClick') }
          accountSwitcherItems={
            [
              { text: 'Account 1', url: '#', description: 'Account 1 Description', isCurrent: false },
              { text: 'Account 3', url: '#', description: 'Account 3 Description', isCurrent: false },
              { text: 'Account 2', url: '#', description: 'Account 2 Description', isCurrent: true },
            ]
          }
          accountSwitcherHandler={ action('accountSwitcherHandler') }
          userName="Hassan Khalid"
          accountSettingsUrl="#"
          profileUrl="#"
          logoutUrl="#"
          profileAvatarUrl={ text('profileAvatarUrl', 'https://optimizely-profile-images-devel.s3.amazonaws.com/img/user/hassan.khalid%40optimizely.com/c57517e7ee4941d0a5e71f3d89df0c0d.jpg') }
        />
      </NavBar>
    );
  })).add('Collapsed State', (() => {
    return (
      <NavBar
        isOpen={ boolean('isOpen', false) }
        logoUrl={ getLogoUrl(boolean('isOpen', true)) }
        title="Test Project"
        badgeText="WEB"
        badgeColor="draft"
        homeUrl="http://optimizely.com"
        trialContent={
          <div className="push-double--bottom push-double--left truncate">
            { boolean('isOpen', true) && '5 days left in your trial' }
          </div>
        }>
        <NavBar.PrimaryLink
          iconName="projects"
          type="pushstate"
          linkLabel="Projects"
          testSection="projects"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="experiment"
          type="link"
          linkLabel={ <div>Experiments&nbsp;<Badge color="primary">New</Badge></div> }
          testSection="experiment"
          isActive={ true }
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="rollouts"
          type="link"
          linkLabel="Features"
          testSection="features"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="audiences"
          type="link"
          linkLabel="Audiences"
          testSection="audiences"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="events"
          type="button"
          linkLabel="Events"
          testSection="events"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="settings"
          type="link"
          linkLabel="Settings"
          testSection="settings"
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.PrimaryLink
          iconName="getting-started"
          type="pushstate"
          linkLabel="Getting Started"
          testSection="getting-started"
          hasSeparator={ true }
          onClick={ action('PrimaryLink onClick') }
        />
        <NavBar.SecondaryLink
          iconName="program-management"
          type="button"
          linkLabel="Program Management"
          testSection="program-management"
          onClick={ action('SecondaryLink onClick') }
        />
        <NavBar.SecondaryLink
          iconName="help"
          type="link"
          linkLabel="Help"
          testSection="help"
          onClick={ action('SecondaryLink onClick') }
        />
        <NavBar.SecondaryLink
          onClick={ action('SecondaryLink onClick') }
          iconName="feedback"
          type="link"
          linkLabel="Feedback"
          testSection="feedback"
        />
        <NavBar.CurrentUserMenu
          showEmulate={ boolean('showEmulate', true) }
          onEmulateClick={ action('onEmulateClick') }
          accountSwitcherItems={
            [
              { text: 'Account 1', url: '#', description: 'Account 1 Description', isCurrent: false },
              { text: 'Account 3', url: '#', description: 'Account 3 Description', isCurrent: false },
              { text: 'Account 2', url: '#', description: 'Account 2 Description', isCurrent: true },
            ]
          }
          accountSwitcherHandler={ action('accountSwitcherHandler') }
          userName="Hassan Khalid"
          accountSettingsUrl="#"
          profileUrl="#"
          logoutUrl="#"
          profileAvatarUrl={ text('profileAvatarUrl', 'https://optimizely-profile-images-devel.s3.amazonaws.com/img/user/hassan.khalid%40optimizely.com/c57517e7ee4941d0a5e71f3d89df0c0d.jpg') }
        />
      </NavBar>
    );
  }));
