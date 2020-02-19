import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number, select, text } from '@storybook/addon-knobs';

import Col from '../src/components/Layout/Col';
import Row from '../src/components/Layout/Row';
import Container from '../src/components/Layout/Container';
import { NavBar } from '../src/main';

const openLogoUrl = 'https://app.optimizely.com/dist/static/img/rebrand/logo-f64d2aed989db744b609666199d7d2a2.svg';

const stories = storiesOf('Layout', module);
stories.addDecorator(withKnobs);
stories.add('Special: App Frame', (() => {
  return (
    <Container
      outlineDebug={ boolean('outlineDebug', true) }
      pushRowsTop={ boolean('pushRowsTop', true) }
      paddedContent={ text('paddedContent', 'none') }
      fluid={ boolean('fluid', true) }>
      <Row removeGutters={ boolean('gutters', false) } shouldWrap={ false }>
        <Col small={ 'fitContent' }>
          <NavBar
            isOpen={ true }
            logoUrl={ openLogoUrl }
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
            />
            <NavBar.PrimaryLink
              iconName="experiment"
              type="link"
              linkLabel="Experiment"
              testSection="experiment"
              isActive={ true }
            />
            <NavBar.PrimaryLink
              iconName="rollouts"
              type="link"
              linkLabel="Features"
              testSection="features"
            />
            <NavBar.PrimaryLink
              iconName="audiences"
              type="link"
              linkLabel="Audiences"
              testSection="audiences"
            />
            <NavBar.PrimaryLink
              iconName="events"
              type="button"
              linkLabel="Events"
              testSection="events"
            />
            <NavBar.PrimaryLink
              iconName="settings"
              type="link"
              linkLabel="Settings"
              testSection="settings"
            />
            <NavBar.PrimaryLink
              iconName="getting-started"
              type="pushstate"
              linkLabel="Getting Started"
              testSection="getting-started"
              hasSeparator={ true }
            />
            <NavBar.SecondaryLink
              iconName="program-management"
              type="button"
              linkLabel="Program Management"
              testSection="program-management"
            />
            <NavBar.SecondaryLink
              iconName="help"
              type="link"
              linkLabel="Help"
              testSection="help"
            />
            <NavBar.SecondaryLink
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
        </Col>
        <Col small={ 'fitContent' }>
              <div style={{width: '285px'}}>Tabs/Header</div>
            </Col>
            <Col small={ 'fillSpace' } isReadingColumn={ true }>
              <div>Stage</div>
            </Col>
      </Row>
    </Container>
  );
}));
