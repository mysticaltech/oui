import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';

import Avatar from './index.js';
import Container from '../Layout/Container';
import Row from '../Layout/Row';


const stories = storiesOf('Avatar', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default', (() => {
    return (
      <Container>
        <p>Size options are small and medium (large is the default and therefore achieved by not specifying a size)</p>
        <Row>
          <Avatar
            size={
              select('size', {
                'small': 'small',
                'medium': 'medium',
                'large (default)': null,
              }, 'small') }
          />
          <Avatar size="medium"/>
          <Avatar/>
        </Row>
        <Row paddedContent="ends">
          <Avatar
            size="small" imageUrl={ text('imageUrl', 'https://parkseed.com/images/xxl/52081-pk-p1.jpg') }
          />
          <Avatar
            size="medium" imageUrl={ text('imageUrl', 'https://parkseed.com/images/xxl/52081-pk-p1.jpg') }
          />
          <Avatar imageUrl={ text('imageUrl', 'https://parkseed.com/images/xxl/52081-pk-p1.jpg') }/>
        </Row>
        <Row>
          <Avatar
            size="small" isEmulating={ boolean('isEmulating', true) }
          />
          <Avatar
            size="medium" isEmulating={ boolean('isEmulating', true) }
          />
          <Avatar
            isEmulating={ boolean('isEmulating', true) }
          />
        </Row>
      </Container>
    );
  }));
