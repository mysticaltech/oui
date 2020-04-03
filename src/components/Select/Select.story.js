import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Select from './index.js';
import Attention from '../Attention/index.tsx';

const stories = storiesOf('Select', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

stories
  .add('Default', () => {
    return (
      <Select
        label="My favorite zoo animal"
        isDisabled={ boolean('isDisabled', false) }
        isOptional={ boolean('isOptional', false) }
        name="zoo"
        id="zoo"
        onChange={ action('On Change Called') }
        testSection="favorite-zoo-animal-select">
        <option value="one">This is option one - a Lion</option>
        <option value="two">And this is option two - a Tiger</option>
      </Select>
    );
  })
  .add('Required (adds empty first value)', () => {
    return (
      <Select
        label="My favorite zoo animal"
        isDisabled={ false }
        isRequired={ boolean('isOptional', true) }
        name="zoo"
        id="zoo"
        onChange={ action('On Change Called') }>
        <option value="one">This is option one - a Lion</option>
        <option value="two">And this is option two - a Tiger</option>
      </Select>
    );
  })
  .add('With an error and note', () => {
    return (
      <Select
        displayError={ true }
        label="My favorite zoo animal"
        isDisabled={ false }
        isRequired={ true }
        name="zoo"
        note="This field is required"
        id="zoo"
        onChange={ action('On Change Called') }>
        <option value="one">This is option one - a Lion</option>
        <option value="two">And this is option two - a Tiger</option>
      </Select>
    );
  })
  .add('Full width variation', () => {
    return (
      <Select
        label="My favorite zoo animal"
        isDisabled={ false }
        name="zoo"
        id="zoo"
        isFullWidth={ boolean('isFullWidth', true) }
        onChange={ action('On Change Called') }>
        <option value="one">This is option one - a Lion</option>
        <option value="two">And this is option two - a Tiger</option>
      </Select>
    );
  })
  .add('Without a label', () => {
    return (
      <div>
        <Attention type="bad-news">
          <p>
            Please avoid using Select without a label. For accessibility and
            general usability reasons, a Select should always have a
            corresponding label.
          </p>
        </Attention>
        <div className="push--top">
          <Select isDisabled={ false } name="zoo" id="zoo" onChange={ action('On Change Called') }>
            <option value="one">This is option one - a Lion</option>
            <option value="two">And this is option two - a Tiger</option>
          </Select>
        </div>
      </div>
    );
  });
