import React from 'react';
import icons from './icons.json';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import Icon from 'react-oui-icons';
import Button from '../components/Button';
import Table from '../components/Table';

const stories = storiesOf('Icons', module);

// this add some decorators for making addons available
stories
  .addDecorator(withKnobs)
  .addDecorator(withInfo('react <Icon /> component'))
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories.add('Everything', () => {
  const iconsElements = icons.map((icon, index) => {
    const Box = styled.div`
    border: 1px dashed #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
    height: 100px;
    justify-content: center;
    margin: 5px;
    padding: 20px 10px
    text-align: center;
    width: 100px;
    &:after {
      color: white;
      transition: all 0.4s ease;
      content: '${icon.title}';
      font-family: Helvetica;
      font-size: 0.5rem;
      max-width: 90px;
      position: absolute;
      margin-top: 70px;
    }
    &:hover:after {
      color: #666;
    }
  `;
    return (
      <Box key={ index } style={ styles.iconBox }>
        <Icon
          style={ styles.icon }
          description={ icon.title }
          name={ icon.title.split(' ').join('-') }
          fill={ text('color', 'black') }
          size={ select('size', {small: 'small', medium: 'medium', large: 'large'}, 'medium') }
        />
      </Box>
    );
  });
  return (
    <div className="App">
      <h1>All Icons (via react-oui-icons)</h1>
      <Container>
        { iconsElements }
      </Container>
    </div>
  );
});

stories.add('Knobs', (() => {
  return (
    <Icon
      name={ select('name', {bell: 'bell', ban: 'ban', calendar: 'calendar'}, 'bell') }
      fill={ text('color', 'black') }
      size={ select('size', {small: 'small', medium: 'medium', large: 'large'}, 'medium') }
    />
  );
}
));

/* eslint-disable max-len */

stories.add('Alignment', (() => (<div className="reading-column--new">
  <h1>Icon alignment</h1>
  <p>These example stories shows approaches to align icons using various techniques and demonstrates some solutions and potential short-comings.</p>

  <h2>Inside a table</h2>
  <p>Tables vertical alignment within the entire TD, but often you want to align an icon with the text:</p>

  <h2>Text alignment <span className="muted">(using flex)</span></h2>
  <p>Example using <code>divs, spans, and flex helpers</code></p>
  <Table density="loose" style="rule" tableLayoutAlgorithm="fixed">
    <Table.THead>
      <Table.TR>
        <Table.TH> Experiment </Table.TH>
        <Table.TH isNumerical={ true }> Some Button </Table.TH>
      </Table.TR>
    </Table.THead>
    <Table.TBody>
      <Table.TR>
        <Table.TD>
          <div className="flex flex-align--start">
            <span className="flex push-half--right">
              <Icon name={ select('name', {bell: 'bell', archive: 'archive', close: 'close', exclamation: 'exclamation', add: 'add', inconclusive: 'inconclusive', redo: 'redo', calendar: 'calendar'}, 'calendar') } />
            </span>
            Flex align start
          </div>
        </Table.TD>
        <Table.TD isNumerical={ true }><Button>Hello</Button></Table.TD>
      </Table.TR>
      <Table.TR>
        <Table.TD>
          <div className="flex flex-align--center">
            <span className="flex push-half--right">
              <Icon name={ select('name', {bell: 'bell', archive: 'archive', close: 'close', exclamation: 'exclamation', add: 'add', inconclusive: 'inconclusive', redo: 'redo', calendar: 'calendar'}, 'calendar') } />
            </span>
            Flex align center
          </div>
        </Table.TD>
        <Table.TD isNumerical={ true }><Button>Hello</Button></Table.TD>
      </Table.TR>
      <Table.TR>
        <Table.TD>
          <div className="flex flex-align--end">
            <span className="flex push-half--right">
              <Icon name={ select('name', {bell: 'bell', archive: 'archive', close: 'close', exclamation: 'exclamation', add: 'add', inconclusive: 'inconclusive', redo: 'redo', calendar: 'calendar'}, 'calendar') } />
            </span>
            Flex align end
          </div>
        </Table.TD>
        <Table.TD isNumerical={ true }><Button>Hello</Button></Table.TD>
      </Table.TR>
    </Table.TBody>
  </Table>

  <h2>Row alignment <span className="muted">(via TD verticalAlign prop)</span></h2>
  <p>Another example using <code>verticalAlign='middle'</code></p>
  <Table density="loose" style="rule" tableLayoutAlgorithm="fixed">
    <Table.THead>
      <Table.TR>
        <Table.TH> Experiment </Table.TH>
        <Table.TH isNumerical={ true }> Some Button </Table.TH>
      </Table.TR>
    </Table.THead>
    <Table.TBody>
      <Table.TR>
        <Table.TD verticalAlign='top'>
          <span className="push-half--right">
            <Icon name={ select('name', {bell: 'bell', archive: 'archive', close: 'close', exclamation: 'exclamation', add: 'add', inconclusive: 'inconclusive', redo: 'redo', calendar: 'calendar'}, 'calendar') } />
          </span>
          verticalAlign top <span className="muted">(default)</span>
        </Table.TD>
        <Table.TD isNumerical={ true }><Button>Hello</Button></Table.TD>
      </Table.TR>
      <Table.TR>
        <Table.TD verticalAlign='middle'>
          <span className="push-half--right">
            <Icon name={ select('name', {bell: 'bell', archive: 'archive', close: 'close', exclamation: 'exclamation', add: 'add', inconclusive: 'inconclusive', redo: 'redo', calendar: 'calendar'}, 'calendar') } />
          </span>
          verticalAlign middle
        </Table.TD>
        <Table.TD isNumerical={ true }><Button>Hello</Button></Table.TD>
      </Table.TR>
      <Table.TR>
        <Table.TD verticalAlign='bottom'>
          <span className="push-half--right">
            <Icon name={ select('name', {bell: 'bell', archive: 'archive', close: 'close', exclamation: 'exclamation', add: 'add', inconclusive: 'inconclusive', redo: 'redo', calendar: 'calendar'}, 'calendar') } />
          </span>
          verticalAlign bottom
        </Table.TD>
        <Table.TD isNumerical={ true }><Button>Hello</Button></Table.TD>
      </Table.TR>
    </Table.TBody>
  </Table></div>)));

stories.add('Animated', () => {
  return (
    <Icon className='rotating' name='settings' size='large' />
  );
});

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const styles = {
  icon: {
    alignSelf: 'center',
  },
};
