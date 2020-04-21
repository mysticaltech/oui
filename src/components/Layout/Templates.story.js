import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Token from '../Token';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import ColWithNubbin from './ColWithNubbin';
import NavBar from '../NavBar';
import Attention from '../Attention';

const openLogoUrl =
  'https://app.optimizely.com/dist/static/img/rebrand/logo-f64d2aed989db744b609666199d7d2a2.svg';

class ConfigPanelExample extends React.Component {
  constructor(props) {
    super(props);
    // 1) Create the reference here.
    this.pointingRef = React.createRef();
    this.state = { nubbinPointingRef: null };
  }

  componentDidMount() {
    // 2) Use the ref to store the node in state
    this.setState({ nubbinPointingRef: this.pointingRef.current });
  }

  render() {
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <Container fluid={ true } isFullHeight={ true }>
          <Row>
            <Col small={ 6 }>
              <div className="height--1-1 soft-double">
                <h3>Rules</h3>
                <p>Explanatory content here</p>
                <div style={{ height: '100px' }}></div>
                <div
                  className=" flex flex--column border--all"
                  // 3) Assign ref to element you want nubbin pointing to
                  ref={ this.pointingRef }>
                  The nubbin should point in the middle of this area
                  <Token
                    isDraggable={ true }
                    name={ 'This is option 1 for reordering' }
                    order={ 1 }
                    showWell={ false }
                  />
                  <Token
                    isDraggable={ true }
                    name={ 'This is option 2 for reordering' }
                    order={ 2 }
                    showWell={ false }
                  />
                  <Token
                    isDraggable={ true }
                    name={ 'This is option 3 for reordering' }
                    order={ 3 }
                    showWell={ false }
                  />
                </div>
              </div>
            </Col>
            <ColWithNubbin
              small={ 6 }
              // 4) Pass ref to ColWithNubbin
              nubbinRef={ this.state.nubbinPointingRef }>
              <h3>Rule Configuration</h3>
            </ColWithNubbin>
          </Row>
        </Container>
      </div>
    );
  }
}

const storiesForTemplates = storiesOf('LayoutKit/Templates', module);
storiesForTemplates
  .addDecorator(withKnobs)
  .addDecorator((story) => <div id="root-preview">{story()}</div>);

storiesForTemplates
  .add('Config Panel', () => {
    return (
      <React.Fragment>
        <div className="push-double--bottom">
          <Attention type="brand">
            Use a ref passed to ColWithNubbin to place the nubbin properly
          </Attention>
        </div>
        <ConfigPanelExample />
      </React.Fragment>
    );
  })
  .add('Entire App Frame', () => {
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
                  {boolean('isOpen', true) && '5 days left in your trial'}
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
                accountSwitcherItems={ [
                  {
                    text: 'Account 1',
                    url: '#',
                    description: 'Account 1 Description',
                    isCurrent: false,
                  },
                  {
                    text: 'Account 3',
                    url: '#',
                    description: 'Account 3 Description',
                    isCurrent: false,
                  },
                  {
                    text: 'Account 2',
                    url: '#',
                    description: 'Account 2 Description',
                    isCurrent: true,
                  },
                ] }
                accountSwitcherHandler={ action('accountSwitcherHandler') }
                userName="Hassan Khalid"
                accountSettingsUrl="#"
                profileUrl="#"
                logoutUrl="#"
                profileAvatarUrl={ text(
                  'profileAvatarUrl',
                  'https://optimizely-profile-images-devel.s3.amazonaws.com/img/user/hassan.khalid%40optimizely.com/c57517e7ee4941d0a5e71f3d89df0c0d.jpg'
                ) }
              />
            </NavBar>
          </Col>
          <Col small={ 'fitContent' }>
            <div style={{ width: '285px' }}>Tabs/Header</div>
          </Col>
          <Col small={ 'fillSpace' } isReadingColumn={ true }>
            <div>Stage (using isReadingColumn on the Col)</div>
          </Col>
        </Row>
      </Container>
    );
  });
