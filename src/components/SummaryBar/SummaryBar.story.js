import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, boolean, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

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
      <SummaryBar
        title={ 'Summary Bar Title' }
        subtitle={ 'Subtitle but should it contain other elements?' }>
        <SummaryBar.Item>
          Test 1
        </SummaryBar.Item>
        <SummaryBar.Item>
          Test 2
        </SummaryBar.Item>
        <SummaryBar.Item>
          Test 3
        </SummaryBar.Item>
      </SummaryBar>
    );
  }));
