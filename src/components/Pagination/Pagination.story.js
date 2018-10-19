import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import Pagination from './index.js';

const stories = storiesOf('Pagination', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('default', withInfo()(() => {
    return (
      <Pagination
        currentPage={ number('currentPage', 1) }
        totalPages={ number('totalPages', 10) }
        onChange={ action('page changed') }
      />
    );
  }));

