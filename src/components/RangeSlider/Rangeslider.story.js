import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, boolean } from '@storybook/addon-knobs';

import RangeSlider from './index.js';
import { FILL_COLOR_MAP } from '../../utils/accessibility';

// build fillColorName options for a select/dropdown knob
const fillColorOptions = { None: '' };
Object.keys(FILL_COLOR_MAP).forEach(color => {
  fillColorOptions[color] = color;
});

const stories = storiesOf('RangeSlider', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories.add('Default', (() => {
  return (
    <RangeSlider
      value={ number('value', 50) }
    />
  );
}))
  .add('Disabled', (() => {
    return (
      <div>
        <input type="text" className="oui-text-input push-double--bottom" />
        <RangeSlider
          isDisabled={ true }
          value={ number('value', 50) }
        />
        <input type="text" className="oui-text-input" />
      </div>
    );
  }))
  .add('Custom Fill Color', (() => {
    return (
      <div>
        <RangeSlider
          fillColorName={ select('fillColorName', fillColorOptions, 'red') }
          value={ number('value', 50) }
        />
      </div>
    );
  }))
  .add('Use Off instead of 0%', (() => {
    return (
      <div>
        <RangeSlider
          value={ number('value', 50) }
          useOffForLabel={ boolean('useOffForLabel', true) }
        />
      </div>
    );
  }));
