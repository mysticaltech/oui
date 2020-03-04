/* eslint-disable react/jsx-no-bind */
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import DatePicker from './DatePicker.js';
import Input from '../Input';


const stories = storiesOf('DatePicker', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

stories.add('Default single date picker', (() => (
  <Container>
    <DatePicker
      inputId="date-picker-id"
      initialDate={ null }
      isFocused={ boolean('isFocused', false) }
      onDateChange={ action('onDateChange') }
    />
    <p>I appear after the calendar</p>
  </Container>
)))
  .add('With absolute positioning', (() => (
    <Container>
      <DatePicker
        inputId="date-picker-id"
        initialDate={ null }
        isFocused={ boolean('isFocused', false) }
        onDateChange={ action('onDateChange') }
        isAbsolutelyPositioned={ boolean('isAbsolutelyPositioned', true) }
      />
      <p>I should be behind the calendar when opened</p>
    </Container>
  )))
  .add('Part of a form', (() => (
    <FlexContainer>
      <DatePicker
        inputId="date-picker-id"
        inputLabel={ text('inputLabel', 'Start Time') }
        inputPlaceholder={ text('inputPlaceholder', 'Select Date') }
        initialDate={ null }
        isFocused={ boolean('isFocused', false) }
        onDateChange={ action('onDateChange') }
        isAbsolutelyPositioned={ boolean('isAbsolutelyPositioned', true) }
      />
      <div className="push--left">
        <Input label="Another Input" id="another-input-01" placeholder="Enter Info" type="text"/>
      </div>
    </FlexContainer>
  )))
  .add('With an initial date', (() => (
    <Container>
      <DatePicker
        inputId="date-picker-id"
        inputLabel={ text('inputLabel', 'Start Time') }
        inputPlaceholder={ text('inputPlaceholder', 'Select Date') }
        initialDate={ moment() }
        isFocused={ boolean('isFocused', false) }
        onDateChange={ action('onDateChange') }
      />
    </Container>
  )))
  .add('Allow any dates', (() => (
    <Container>
      <DatePicker
        inputId="date-picker-id"
        initialDate={ null }
        isFocused={ boolean('isFocused', true) }
        isFutureDateSelectable={ boolean('isFutureDateSelectable', true) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        onDateChange={ action('onDateChange') }
      />
    </Container>
  )))
  .add('Only allow past dates', (() => (
    <Container>
      <DatePicker
        inputId="date-picker-id"
        initialDate={ null }
        isFocused={ boolean('isFocused', true) }
        isFutureDateSelectable={ boolean('isFutureDateSelectable', false) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        onDateChange={ action('onDateChange') }
      />
    </Container>
  )))
  .add('Only allow future dates', (() => (
    <Container>
      <DatePicker
        inputId="date-picker-id"
        initialDate={ null }
        isFocused={ boolean('isFocused', true) }
        isFutureDateSelectable={ boolean('isFutureDateSelectable', true) }
        isPastDateSelectable={ boolean('isPastDateSelectable', false) }
        onDateChange={ action('onDateChange') }
      />
    </Container>
  )))
  .add('With a custom range checker', (() => (
    <Container>
      <p>Custom function for
        <code>  isOutsideRange  </code> prop may look something like
        <code>  {'{ (day) => {return day.day() % 2 === 0; } }'}</code>
      </p>
      <DatePicker
        inputId="date-picker-id"
        initialDate={ null }
        isFocused={ boolean('isFocused', true) }
        isOutsideRange={ (day) => {return day.day() % 2 === 0; } }
        onDateChange={ action('onDateChange') }
      />
    </Container>
  )))
  .add('With a custom initial starting month', (() => (
    <Container>
      <p>Adjust the left hand month using a function like:
        <code>  () => moment().subtract(1, 'months')</code> with the
        <code>  initialVisibleMonth  </code> prop.
      </p>
      <DatePicker
        inputId="date-picker-id"
        initialDate={ null }
        initialVisibleMonth={ () => moment().subtract(1, 'months') }
        isFocused={ boolean('isFocused', true) }
        onDateChange={ action('onDateChange') }
      />
    </Container>
  )))
  .add('Remains open after date selection', (() => (
    <Container>
      <DatePicker
        inputId="date-picker-id"
        initialDate={ null }
        isFocused={ boolean('isFocused', false) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        keepOpenOnDateSelect={ boolean('keepOpenOnDateSelect', true) }
        onDateChange={ action('onDateChange') }
      />
    </Container>
  )))
  .add('Remains open always, even when clicking outside the component', (() => (
    <Container>
      <DatePicker
        inputId="date-picker-id"
        initialDate={ null }
        keepOpenAlways={ boolean('keepOpenAlways', true) }
        isFocused={ boolean('isFocused', false) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        onDateChange={ action('onDateChange') }
      />
    </Container>
  )));

const Container = styled.div`
  height: 100vh;
`;

const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
`;
