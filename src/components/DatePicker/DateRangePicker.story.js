/* eslint-disable react/jsx-no-bind */
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '../Button';
import DateRangePicker from './DateRangePicker';

const presetPanelOptions = [
  {
    label: 'Last 7 days',
    startDate: moment().subtract(7, 'days').startOf('day'),
    endDate: moment().endOf('day'),
  },
  {
    label: 'Last 30 days',
    startDate: moment().subtract(30, 'days').startOf('day'),
    endDate: moment().endOf('day'),
  },
  {
    label: 'Last 60 days',
    startDate: moment().subtract(60, 'days').startOf('day'),
    endDate: moment().endOf('day'),
  },
  {
    label: 'This Month',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  },
];

const stories = storiesOf('DateRangePicker', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

stories
  .add('Default date range picker', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
      <p>I appear after the calendar.</p>
    </Container>
  )))
  .add('With absolute positioning', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        isAbsolutelyPositioned={ boolean('isAbsolutelyPositioned', true) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
      <p>I should be behind the calendar when opened</p>
    </Container>
  )))
  .add('Focused initially', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput={ text('focusedInput (either "startDate" or "endDate"', 'startDate') }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With initial start date', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput={ text('focusedInput', 'endDate') }
        initialStartDate={ moment() }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('Allow any dates', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='endDate'
        initialStartDate={ moment() }
        isFutureDateSelectable={ boolean('isFutureDateSelectable', true) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('Only allow future dates', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='endDate'
        initialStartDate={ moment() }
        isFutureDateSelectable={ boolean('isFutureDateSelectable', true) }
        isPastDateSelectable={ boolean('isPastDateSelectable', false) }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('Only allow past dates', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='endDate'
        initialVisibleMonth={ () => moment().subtract(1, 'months') }
        isFutureDateSelectable={ boolean('isFutureDateSelectable', false) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With custom range checker', (() => (
    <Container>
      <p>Custom function for
        <code>  isOutsideRange  </code> prop may look something like
        <code>  {'{ (day) => {return day.day() % 2 === 0; } }'}</code>
      </p>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='endDate'
        initialStartDate={ moment() }
        isOutsideRange={ (day) => {return day.day() % 2 === 0; } }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With an initial starting month', (() => (
    <Container>
      <p>Adjust the left hand month using a function like:
        <code>  () => moment().subtract(1, 'months')</code> with the
        <code>  initialVisibleMonth  </code> prop.
      </p>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='endDate'
        initialVisibleMonth={ () => moment().subtract(1, 'months') }
        isOutsideRange={ action('isOutsideRange') }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('Remains open after date selection', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='startDate'
        keepOpenOnDateSelect={ boolean('keepOpenOnDateSelect', true) }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('Remains open always, even when clicking outside component', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='startDate'
        keepOpenAlways={ boolean('keepOpenAlways', true) }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With time inputs', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        endTimeInputId='endTimeInputId'
        focusedInput='startDate'
        hasTimeInputs={ boolean('hasTimeInputs', true) }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
        startTimeInputId='startTimeInputId'
      />
    </Container>
  )))
  .add('With preset options panel', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='startDate'
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        keepOpenOnDateSelect={ boolean('keepOpenOndateSelect', true) }
        onDatesChange={ action('onDatesChange') }
        panelButtons={ [
          <Button key={ 0 } style="plain" onClick={ action('onClick Clear') }>Clear</Button>,
          <Button key={ 1 } style="highlight" onClick={ action('onClick Apply') }>Apply</Button>,
        ] }
        presetPanelOptions={ presetPanelOptions }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With buttons panel', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='startDate'
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        keepOpenOnDateSelect={ boolean('keepOpenOndateSelect', true) }
        onDatesChange={ action('onDatesChange') }
        panelButtons={ [
          <Button key={ 0 } style="plain" onClick={ action('onClick Clear') }>Clear</Button>,
          <Button key={ 1 } style="highlight" onClick={ action('onClick Apply') }>Apply</Button>,
        ] }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With no border on calendar', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='startDate'
        isBorderless={ boolean('isBorderless', true) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        keepOpenOnDateSelect={ boolean('keepOpenOndateSelect', true) }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With no border and time inputs', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        endTimeInputId='endTimeInputId'
        focusedInput='startDate'
        isBorderless={ boolean('isBorderless', true) }
        hasTimeInputs={ boolean('hasTimeInputs', true) }
        onDatesChange={ action('onDatesChange') }
        startDateInputId='start-date-id-0'
        startTimeInputId='startTimeInputId'
      />
    </Container>
  )))
  .add('With preset options and no border on calendar', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='startDate'
        isBorderless={ boolean('isBorderless', true) }
        hasTimeInputs={ boolean('hasTimeInputs', false) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        keepOpenOnDateSelect={ boolean('keepOpenOndateSelect', true) }
        onDatesChange={ action('onDatesChange') }
        panelButtons={ [
          <Button key={ 0 } style="plain" onClick={ action('onClick Clear') }>Clear</Button>,
          <Button key={ 1 } style="highlight" onClick={ action('onClick Apply') }>Apply</Button>,
        ] }
        presetPanelOptions={ presetPanelOptions }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With panelButtons as an array (not render props)', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='startDate'
        isBorderless={ boolean('isBorderless', true) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        keepOpenOnDateSelect={ boolean('keepOpenOndateSelect', true) }
        onDatesChange={ action('onDatesChange') }
        panelButtons={ [
          <Button key={ 0 } style="plain" onClick={ action('onClick Clear') }>Clear</Button>,
          <Button key={ 1 } style="highlight" onClick={ action('onClick Apply') }>Apply</Button>,
        ] }
        presetPanelOptions={ presetPanelOptions }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With panelButtons as render props function returning an array', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        focusedInput='startDate'
        isBorderless={ boolean('isBorderless', true) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        keepOpenOnDateSelect={ boolean('keepOpenOndateSelect', true) }
        onDatesChange={ action('onDatesChange') }
        panelButtons={ ({ endDate, onDatesChange, startDate }) => ([
          <Button
            key={ 0 }
            style="plain"
            onClick={ () => {
              action('onClick Clear with onDatesChange via render props')();
              onDatesChange({ startDate: null, endDate: null });
            } }>
            Clear
          </Button>,
          <Button
            key={ 1 }
            style="highlight"
            onClick={ () => action('onClick Apply')({ startDate, endDate }) }>
            Apply
          </Button>,
        ]) }
        presetPanelOptions={ presetPanelOptions }
        startDateInputId='start-date-id-0'
      />
    </Container>
  )))
  .add('With hasTimeInput and presetPanelOptions', (() => (
    <Container>
      <DateRangePicker
        endDateInputId='end-date-id-0'
        endTimeInputId='endTimeInputId'
        focusedInput='startDate'
        hasTimeInputs={ boolean('hasTimeInputs', true) }
        isBorderless={ boolean('isBorderless', true) }
        isPastDateSelectable={ boolean('isPastDateSelectable', true) }
        keepOpenOnDateSelect={ boolean('keepOpenOndateSelect', true) }
        onDatesChange={ action('onDatesChange') }
        panelButtons={ ({ endDate, onDatesChange, startDate }) => ([
          <Button
            key={ 0 }
            style="plain"
            onClick={ () => {
              action('onClick Clear with onDatesChange via render props')();
              onDatesChange({ startDate: null, endDate: null });
            } }>
            Clear
          </Button>,
          <Button
            key={ 1 }
            style="highlight"
            onClick={ () => action('onClick Apply')({ startDate, endDate }) }>
            Apply
          </Button>,
        ]) }
        presetPanelOptions={ presetPanelOptions }
        startDateInputId='start-date-id-0'
        startTimeInputId='startTimeInputId'
      />
    </Container>
  )));

const Container = styled.div`
  height: 100vh;
  width: 100vh;
`;
