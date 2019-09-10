import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, boolean, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import Col from '../Layout/Col';
import Row from '../Layout/Row';
import Container from '../Layout/Container';

import SummaryBar from './index.js';

storiesOf('SummaryBar/', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo())
  .addDecorator(story => (
    <div id="root-preview">
      { story() }
    </div>
  ))
  .add('Default', (() => {
    return (
      <div>
        <Container
          outlineDebug={ false }
          pushRowsTop={ false }
          pullRowPadding={ false }
          paddedContent={ 'around' }
          removeGutters={ false }
          fluid={ true }>
          <Row
            removeGutters={ false }
            border={ 'ends' }
            paddedContent={ 'ends' }>
            <Col
              paddedContent={ 'around' }>
              <h2 className="push-half--bottom">Some Title</h2>
              Col with border sides
            </Col>
            <Col
              paddedContent={ 'around' }
              border={ 'left' }>
              <h2 className="push-half--bottom">A Longer Page Title</h2>
              Col with border sides and long-ish content that will definitely run to multiple lines.
            </Col>
            <Col
              paddedContent={ 'around' }
              border={ 'left' }>
              Col with border sides
            </Col>
            <Col
              paddedContent={ 'around' }
              border={ 'left' }>
              Col with border sides
            </Col>
            <Col
              paddedContent={ 'around' }
              border={ 'left' }>
              Col with border right
            </Col>
          </Row>
        </Container>

        <br/>

        <SummaryBar
          title={ 'Summary Bar Title' }
          subtitle={ 'Subtitle but should it contain other elements?' }>
          <Col
            paddedContent={ 'around' }>
            <h2 className="push-half--bottom">Some Title</h2>
            Col with border sides
          </Col>
          <SummaryBar.Item
            title={ 'Testing Title' }>
            <h2>Test 1</h2>
          </SummaryBar.Item>
          <SummaryBar.Item
            title={ 'Testing Title' }>
            Test 2
          </SummaryBar.Item>
          <SummaryBar.Item
            title={ 'Testing Title' }>
            Test 3
          </SummaryBar.Item>
          <SummaryBar.Item
            title={ 'Testing Title' }>
            Test 4
          </SummaryBar.Item>
          <SummaryBar.Item
            title={ 'Testing Title' }>
            Test 5
          </SummaryBar.Item>
        </SummaryBar>
      </div>
    );
  }));
