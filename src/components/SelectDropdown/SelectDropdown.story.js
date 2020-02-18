import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SelectDropdown from './index.js';

const stories = storiesOf('SelectDropdown', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

const items = [
  {
    label: 'Cat',
    description: 'A small feline.',
    value: 'cat',
  },
  {
    label: 'Dog',
    value: 'dog',
    isSelected: true,
  },
  {
    label: 'Dog with a really long name',
    value: 'dog-long',
  },
  {
    label: 'Bear',
    description: 'Likes honey',
    value: 'bear',
    isSelected: true,
  },
  {
    label: 'Squirrel',
    description: 'Smarter than it looks',
    value: 'squirrel',
  },
];

stories.add('Default', (() => {

  return (
    <Container>
      <SelectDropdown
        items={ items }
        value={ 'dog' }
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('Initial placeholder', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        initialPlaceholder="Select a value..."
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('Width of activator', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        value={ 'dog' }
        onChange={ action('SelectDropdown value changed') }
        width={ '400px ' }
      />
    </Container>
  );
})).add('Full Width Activator with Full Width items', (() => {
  return (
    <Container>
      <div style={{'width': '400px', 'border': '1px solid', 'height': '100px' }}>
        <SelectDropdown
          items={ items }
          value={ 'dog' }
          onChange={ action('SelectDropdown value changed') }
          fullWidth={ true }
        />
      </div>
    </Container>
  );
})).add('Full Width Activator with items with a different min width', (() => {
  return (
    <Container>
      <div style={{'width': '400px', 'border': '1px solid', 'height': '100px' }}>
        <SelectDropdown
          items={ items }
          value={ 'dog' }
          onChange={ action('SelectDropdown value changed') }
          fullWidth={ true }
          minDropdownWidth={ 500 }
        />
      </div>
    </Container>
  );
})).add('Specify max width of activator', (() => {
  return (
    <div>
      <p className="push--bottom">
        Specifying the <code>maxWidth</code> property allows you to truncate longer dropdowns while keeping shorter ones short.
      </p>
      <Container>
        <SelectDropdown
          items={ items }
          value={ 'dog-long' }
          onChange={ action('SelectDropdown value changed') }
          maxWidth={ '120px ' }
        />
        <div className="push--left"></div>
        <SelectDropdown
          items={ items }
          value={ 'dog' }
          onChange={ action('SelectDropdown value changed') }
          maxWidth={ '120px ' }
        />
      </Container>
    </div>
  );
})).add('Display Error', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        displayError={ true }
        value={ 'bear' }
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('Width of dropdown', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        value={ 'dog' }
        onChange={ action('SelectDropdown value changed') }
        minDropdownWidth={ '400px ' }
      />
    </Container>
  );
})).add('Disabled', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        value={ 'dog' }
        minDropdownWidth={ '400px ' }
        isDisabled={ boolean('isDisabled', true) }
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('ActivatorLabel', (() => {
  const itemsWithActivatorLabel = [
    {
      activatorLabel: 'Production',
      label: 'Production (50%)',
      value: 'Production',
    },
    {
      activatorLabel: 'Staging',
      label: 'Staging (100%)',
      value: 'Staging',
    },
  ];
  return (
    <Container>
      <SelectDropdown
        items={ itemsWithActivatorLabel }
        value='Production'
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('Multi Select', (() => {
  return (
    <Container>
      <SelectDropdown
        isMultiSelect={ true }
        items={ items }
        initialPlaceholder="Select a value..."
        minDropdownWidth={ '400px ' }
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('Items with linkText or linkURL', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ [{label: 'Elephant', description: 'Very loud', value: 'elephant', linkText: 'I am a link, click me!', linkURL: 'https://www.google.com', linkNewWindow: true}].concat(items) }
        initialPlaceholder="Select a value..."
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
}));

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
`;
