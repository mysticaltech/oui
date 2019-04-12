import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import EditableInput from './index.js';

const stories = storiesOf('EditableInput', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('EditableInput', withInfo()(() => {
    return (
      <EditableInput
        value="Click me to edit"
        onChange={ action('on change') }
        type="text"
      />);
  }))
  .add('Error state', withInfo()(() => {
    return (
      <EditableInput
        label="Field label"
        displayError={ true }
        value="Click me to fix errors"
        note="Form error note."
        placeholder="Just a placeholder"
        type="text"
      />);
  }));

