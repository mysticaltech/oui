import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

import ArrowsInline from '../ArrowsInline';
import Attention from '../Attention';

const stories = storiesOf('ArrowsInline', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      <div className="push-double--bottom">
        <Attention type="bad-news" alignment="center">
          <p>
            <strong>Deprecated: </strong>ArrowsInline is deprecated. If you think you
            need to use this component, please reach out to the OUI reps.
          </p>
        </Attention>
      </div>
      {story()}
    </div>
  ));

stories
  .add('Select the arrow', (() => {
    return (
      <ArrowsInline
        direction={ select('direction', { up: 'up', down: 'down', left: 'left', right: 'right' }, 'down') }
        testSection="arrow-test"
      />
    );
  }));
