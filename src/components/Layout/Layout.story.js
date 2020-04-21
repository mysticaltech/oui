import React from 'react';

import { storiesOf, addParameters } from '@storybook/react';
import {
  withKnobs,
  boolean,
  number,
  select,
} from '@storybook/addon-knobs';
import noop from 'lodash.noop';

import Col from './Col';
import Row from './Row';
import Container from './Container';
import Card from '../Card';
import Button from '../Button';
import ButtonIcon from '../ButtonIcon';
import Code from '../Code';
import SelectDropdown from '../SelectDropdown';
import Input from '../Input';
import ButtonRow from '../ButtonRow';
import Icon from 'react-oui-icons';

const viewports = {
  iphone5: {
    name: 'Small Phone',
    styles: {
      height: '568px',
      width: '320px',
    },
    type: 'mobile',
  },
  iphonex: {
    name: 'Large Phone',
    styles: {
      height: '812px',
      width: '375px',
    },
    type: 'mobile',
  },
  ipad: {
    name: 'Tablet',
    styles: {
      height: '1024px',
      width: '768px',
    },
    type: 'tablet',
  },
};
addParameters({ viewport: { viewports: viewports } });

const items = [
  {
    label: 'does match',
    value: 'does',
  },
  {
    label: 'Simple match',
    value: 'simple',
  },
];

const paddingOptions = {
  none: 'none',
  around: 'around',
  sides: 'sides',
  ends: 'ends',
  remove: 'remove',
};

const borderOptions = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  sides: 'sides',
  ends: 'ends',
  all: 'all',
  none: 'none',
};

const storiesForContainer = storiesOf('LayoutKit/Container', module);
storiesForContainer
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

storiesForContainer
  .add('Default Overview', () => {
    return (
      <div>
        <h1>Default (Equal Widths)</h1>
        <Container
          outlineDebug={ boolean('outlineDebug', true) }
          fluid={ boolean('fluid', false) }
          pullRowPadding={ boolean('pullRowPadding', false) }
          pushRowsTop={ boolean('pushRowsTop', false) }
          paddedContent={ select('paddedContent', paddingOptions, 'none') }>
          <Row
            removeGutters={ boolean('Row removeGutters', false) }
            displayVertical={ boolean('displayVertical', false) }>
            <Col>Col</Col>
            <Col>Col</Col>
          </Row>
          <Row
            removeGutters={ boolean('Row removeGutters', false) }
            displayVertical={ boolean('displayVertical', false) }>
            <Col>Col</Col>
            <Col>Col</Col>
            <Col>Col</Col>
          </Row>
          <Row
            removeGutters={ boolean('Row removeGutters', false) }
            displayVertical={ boolean('displayVertical', false) }>
            <Col>Col</Col>
            <Col>Col</Col>
            <Col>Col</Col>
            <Col>Col</Col>
          </Row>
        </Container>
        <h1 className="push-triple--top">Widths</h1>
        <Container
          outlineDebug={ boolean('outlineDebug', true) }
          pushRowsTop={ boolean('pushRowsTop', false) }
          pullRowPadding={ boolean('pullRowPadding', false) }
          paddedContent={ select('paddedContent', paddingOptions, 'none') }
          fluid={ boolean('fluid', false) }>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 12 }>12</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 11 }>11</Col>
            <Col small={ 1 }>1</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 10 }>10</Col>
            <Col small={ 2 }>2</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 9 }>9</Col>
            <Col small={ 3 }>3</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 8 }>8</Col>
            <Col small={ 4 }>4</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 7 }>7</Col>
            <Col small={ 5 }>5</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 6 }>6</Col>
            <Col small={ 6 }>6</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 5 }>5</Col>
            <Col small={ 7 }>7</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 4 }>4</Col>
            <Col small={ 8 }>8</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 3 }>3</Col>
            <Col small={ 9 }>9</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 2 }>2</Col>
            <Col small={ 10 }>10</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 1 }>1</Col>
            <Col small={ 11 }>11</Col>
          </Row>
        </Container>
        <h1 className="push-triple--top">Equal Widths</h1>
        <Container
          outlineDebug={ boolean('outlineDebug', true) }
          pushRowsTop={ boolean('pushRowsTop', false) }
          pullRowPadding={ boolean('pullRowPadding', false) }
          paddedContent={ select('paddedContent', paddingOptions, 'none') }
          fluid={ boolean('fluid', false) }>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 6 }>6</Col>
            <Col small={ 6 }>6</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 4 }>4</Col>
            <Col small={ 4 }>4</Col>
            <Col small={ 4 }>4</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 3 }>3</Col>
            <Col small={ 3 }>3</Col>
            <Col small={ 3 }>3</Col>
            <Col small={ 3 }>3</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 2 }>2</Col>
            <Col small={ 2 }>2</Col>
            <Col small={ 2 }>2</Col>
            <Col small={ 2 }>2</Col>
            <Col small={ 2 }>2</Col>
            <Col small={ 2 }>2</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
            <Col large={ 1 }>1</Col>
          </Row>
        </Container>
        <h1 className="push-triple--top">"Auto"</h1>
        <Container
          outlineDebug={ boolean('outlineDebug', true) }
          pushRowsTop={ boolean('pushRowsTop', false) }
          pullRowPadding={ boolean('pullRowPadding', false) }
          paddedContent={ select('paddedContent', paddingOptions, 'none') }
          fluid={ boolean('fluid', false) }>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ true }>true</Col>
            <Col small={ true }>true</Col>
            <Col small={ true }>true</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 'auto' }>auto</Col>
            <Col small={ 'auto' }>auto</Col>
            <Col small={ 'auto' }>auto</Col>
          </Row>
        </Container>
        <h1 className="push-triple--top">fillSpace</h1>
        <Container
          outlineDebug={ boolean('outlineDebug', true) }
          paddedContent={ select('paddedContent', paddingOptions, 'none') }
          fluid={ boolean('fluid', false) }>
          <Row>
            <Col small={ 'fillSpace' }>fillSpace</Col>
            <Col small={ 'fillSpace' }>fillSpace</Col>
            <Col small={ 'fillSpace' }>fillSpace</Col>
          </Row>
        </Container>
        <h1 className="push-triple--top">fitContent</h1>
        <Container
          outlineDebug={ boolean('outlineDebug', true) }
          paddedContent={ select('paddedContent', paddingOptions, 'none') }
          fluid={ boolean('fluid', false) }>
          <Row>
            <Col small={ 'fitContent' }>fitContent</Col>
            <Col small={ 'fitContent' }>fitContent</Col>
            <Col small={ 'fitContent' }>fitContent</Col>
          </Row>
        </Container>
      </div>
    );
  })
  .add('Container vs No Container', () => {
    return (
      <div>
        <h1>With Container</h1>
        <Container
          outlineDebug={ boolean('outlineDebug', true) }
          pullRowPadding={ boolean('pullRowPadding', true) }
          paddedContent={ select('paddedContent', paddingOptions, 'none') }
          fluid={ boolean('fluid', true) }>
          <Row>
            <Col>Hello short example</Col>
            <Col>Hello short example</Col>
          </Row>
        </Container>
        <h1 className="push-triple--top">No Container</h1>
        <Row outlineDebug={ boolean('outlineDebug', true) }>
          <Col paddedContent={ select('paddedContent', paddingOptions, 'none') }>
            Hello short example
          </Col>
          <Col paddedContent={ select('paddedContent', paddingOptions, 'none') }>
            Hello short example
          </Col>
        </Row>
      </div>
    );
  })

  .add('Pull Row Padding', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', true) }
        pullRowPadding={ boolean('pullRowPadding', true) }
        paddedContent={ select('paddedContent', paddingOptions, 'around') }
        fluid={ boolean('fluid', false) }>
        <Row>
          <Col>pullRowPadding on the Container removes left padding here</Col>
          <Col>pullRowPadding does nothing here</Col>
          <Col>pullRowPadding does nothing here</Col>
          <Col>pullRowPadding does nothing here</Col>
          <Col>pullRowPadding removes right padding here</Col>
        </Row>
      </Container>
    );
  });

const storiesForRow = storiesOf('LayoutKit/Row', module);
storiesForRow
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

storiesForRow
  .add('Vertical Columns', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', true) }
        pushRowsTop={ boolean('pushRowsTop', true) }
        paddedContent={ select('paddedContent', paddingOptions, 'sides') }
        fluid={ boolean('fluid', false) }>
        <p>Here displayVertical is true on the {'<Row/>'}</p>
        <Row
          removeGutters={ boolean('Row removeGutters', false) }
          displayVertical={ boolean('displayVertical', true) }>
          <Col>1 of 6</Col>
          <Col>2 of 6</Col>
          <Col>3 of 6</Col>
          <Col>4 of 6</Col>
          <Col>5 of 6</Col>
          <Col>6 of 6</Col>
        </Row>
        <Row
          removeGutters={ boolean('Row removeGutters', false) }
          displayVertical={ boolean('displayVertical', true) }>
          <Col>1 of 4</Col>
          <Col>2 of 4</Col>
          <Col>3 of 4</Col>
          <Col>4 of 4</Col>
        </Row>
        <p className="push--top">
          Here displayVertical is false on the {'<Row/>'}
        </p>
        <Row
          removeGutters={ boolean('Row removeGutters', false) }
          displayVertical={ false }>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
    );
  })
  .add('Preventing Wrapping', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', true) }
        pushRowsTop={ true }
        paddedContent={ 'sides' }>
        <Row removeGutters={ false } shouldWrap={ false }>
          <Col small={ 8 }>
            <p>
              Super long content here that will take up a good amount of this
              column - shrink the display width to see the difference
            </p>
          </Col>
          <Col small={ 4 }>
            <p>
              Other long content that takes up lots of space in this column but
              will not wrap to a second line because shouldWrap is <b>false</b>{' '}
              on the Row
            </p>
          </Col>
        </Row>
        <Row removeGutters={ false } shouldWrap={ true }>
          <Col small={ 8 }>
            <p>
              Super long content here that will take up a good amount of this
              column - shrink the display width to see the difference
            </p>
          </Col>
          <Col small={ 4 }>
            <p>
              Other long content that takes up lots of space in this column but{' '}
              <b>will</b> wrap to a second row because shouldWrap is <b>true</b>{' '}
              on the Row
            </p>
          </Col>
        </Row>
      </Container>
    );
  })
  .add('Vertical Alignment', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', true) }
        pushRowsTop={ true }
        paddedContent={ 'sides' }>
        <Row
          removeGutters={ false }
          shouldWrap={ false }
          verticalAlignment={ 'start' }>
          <Col small={ 8 }>
            <p>All this content</p>
          </Col>
          <Col small={ 4 }>
            <p>will align to the start of the Row with
              <code> verticalAlignment = {'start'} </code>
            </p>
          </Col>
        </Row>
        <Row
          removeGutters={ false }
          shouldWrap={ true }
          verticalAlignment={ 'center' }>
          <Col small={ 8 }>
            <p>But this content</p>
          </Col>
          <Col small={ 4 }>
            <p>
              will align to the center of the Row with
              <code> verticalAlignment = {'center'} </code>
            </p>
          </Col>
        </Row>
        <Row
          removeGutters={ false }
          shouldWrap={ true }
          verticalAlignment={ 'end' }>
          <Col small={ 8 }>
            <p>And this content</p>
          </Col>
          <Col small={ 4 }>
            <p>
              will align to the end of the Row with
              <code> verticalAlignment = {'end'} </code>
            </p>
          </Col>
        </Row>
      </Container>
    );
  });

const storiesForCol = storiesOf('LayoutKit/Col', module);
storiesForCol
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

storiesForCol
  .add('Changing Order', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', true) }
        fluid={ boolean('fluid', false) }>
        <Row removeGutters={ boolean('Row removeGutters', false) }>
          <Col small={ true }>First, but unordered</Col>
          <Col small={{ order: 12 }}>Second, but last</Col>
          <Col small={{ order: 1 }}>Third, but second</Col>
        </Row>
      </Container>
    );
  })
  .add('Column Padding', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', false) }
        paddedContent={ 'none' }
        fluid={ boolean('fluid', false) }>
        <Row removeGutters={ boolean('Row removeGutters', false) }>
          <Col
            large={ 'fillSpace' }
            paddedContent={ select('paddedContent', paddingOptions, 'around') }
            border={ select('Col border', borderOptions, 'all') }>
            Change the padding on individual Columns via props. Try the knob to
            adjust padding in these cells together.
          </Col>
          <Col
            large={ 'fillSpace' }
            paddedContent={ select('paddedContent', paddingOptions, 'around') }
            border={ select('Col border', borderOptions, 'all') }>
            Change the padding on individual Columns via props. Try the knob to
            adjust padding in these cells together.
          </Col>
        </Row>
      </Container>
    );
  })
  .add('Borders on Columns', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', false) }
        pushRowsTop={ boolean('pushRowsTop', false) }
        pullRowPadding={ boolean('pullRowPadding', false) }
        paddedContent={ select('paddedContent', paddingOptions, 'around') }
        fluid={ boolean('fluid', true) }>
        <Row
          removeGutters={ boolean('Row removeGutters', false) }
          border={ 'ends' }
          paddedContent={ 'ends' }>
          <Col paddedContent={ 'around' }>
            <div>
              <h2 className="push--bottom">Some Title</h2>
              <p>Col with no border</p>
            </div>
          </Col>
          <Col paddedContent={ 'around' } border={ 'sides' }>
            <div>
              <h2 className="push--bottom">A Longer Page Title</h2>
              <p>
                Col with border sides and long-ish content that will definitely
                run to multiple lines.
              </p>
            </div>
          </Col>
          <Col paddedContent={ 'around' } border={ 'none' }>
            Col with border none
          </Col>
          <Col paddedContent={ 'around' } border={ 'left' }>
            Col with border left
          </Col>
          <Col paddedContent={ 'around' } border={ 'right' }>
            Col with border right
          </Col>
        </Row>
      </Container>
    );
  })
  .add('Adjustable Size', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', true) }
        fluid={ boolean('fluid', false) }>
        <Row>
          <Col>left column</Col>
          <Col small={ number('small', 6) }>
            middle column (small=6)
            <br />
            Adjust this size via knob "small"
          </Col>
          <Col>right column</Col>
        </Row>
      </Container>
    );
  })
  .add('Example: Responsive Tests', () => {
    return (
      <div>
        <h1>Simple</h1>
        <Container
          outlineDebug={ boolean('outlineDebug', true) }
          pushRowsTop={ boolean('pushRowsTop', true) }
          paddedContent={ select('paddedContent', paddingOptions, 'none') }
          fluid={ boolean('fluid', true) }>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 8 }>small=8</Col>
            <Col small={ 4 }>small=4</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ true }>small=true</Col>
            <Col small={ true }>small=true</Col>
            <Col small={ true }>small=true</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ false }>small=false</Col>
            <Col small={ false }>small=false</Col>
            <Col small={ false }>small=false</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col large={ 8 }>large=8</Col>
            <Col large={ 4 }>large=4</Col>
          </Row>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col large={ true }>large=true</Col>
            <Col large={ true }>large=true</Col>
            <Col large={ true }>large=true</Col>
          </Row>
        </Container>

        <h1 className="push-triple--top">Complex</h1>
        <Container
          fluid={ boolean('fluid', false) }
          outlineDebug={ boolean('outlineDebug', true) }
          pushRowsTop={ boolean('pushRowsTop', true) }
          paddedContent={ select('paddedContent', paddingOptions, 'none') }>
          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 12 } medium={ 8 }>
              small=12 medium=8
            </Col>
            <Col small={ 6 } medium={ 4 }>
              small=6 medium=4
            </Col>
          </Row>

          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 6 } medium={ 3 }>
              small=6 medium=3
            </Col>
            <Col small={ 6 } medium={ 3 }>
              small=6 medium=3
            </Col>
            <Col small={ 6 } medium={ 3 }>
              small=6 medium=3
            </Col>
            <Col small={ 6 } medium={ 3 }>
              small=6 medium=3
            </Col>
          </Row>

          <Row removeGutters={ boolean('Row removeGutters', false) }>
            <Col small={ 6 }>small=6</Col>
            <Col small={ 6 }>small=6</Col>
          </Row>
        </Container>
      </div>
    );
  })
  .add('Example: With Cards Inside', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', true) }
        paddedContent={ select('paddedContent', paddingOptions, 'none') }
        fluid={ boolean('fluid', false) }>
        <h1>fillSpace</h1>
        <Row>
          <Col large={ 'fillSpace' }>
            <Card title="Hello Card" shadow={ false } testSection="card">
              I am the short card example. Bye.
            </Card>
          </Col>
          <Col large={ 'fillSpace' }>
            <Card title="Hello Card" shadow={ false } testSection="card">
              I am the short card example. Bye.
            </Card>
          </Col>
        </Row>
        <h1 className="push-triple--top">fitContent</h1>
        <Row>
          <Col large={ 'fitContent' }>
            <Card title="Hello Card" shadow={ false } testSection="card">
              I am the short card example. Bye.
            </Card>
          </Col>
          <Col large={ 'fitContent' }>
            <Card title="Hello Card" shadow={ false } testSection="card">
              I am the short card example. Bye.
            </Card>
          </Col>
        </Row>
        <h1 className="push-triple--top">4/8</h1>
        <Row>
          <Col large={ 4 }>
            <Card title="Hello Card" shadow={ false } testSection="card">
              I am the short card example. Bye.
            </Card>
          </Col>
          <Col large={ 8 }>
            <Card title="Hello Card" shadow={ false } testSection="card">
              I am the short card example. Bye.
            </Card>
          </Col>
        </Row>
      </Container>
    );
  });

const storiesForExamples = storiesOf('LayoutKit/Usage Examples', module);
storiesForExamples
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

storiesForExamples
  .add('URL Rows Match', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', true) }
        paddedContent={ 'around' }
        fluid={ boolean('fluid', true) }>
        <Row border={ 'all' } paddedContent={ 'ends' } shouldWrap={ false }>
          <Col>
            <h6>URL Match</h6>
          </Col>
          <Col small={ 'auto' }>
            <Icon name="close" />
          </Col>
        </Row>
        <Row border={ 'all' } paddedContent={ 'ends' } shouldWrap={ false }>
          <Container
            pushRowsTop={ true }
            paddedContent={ 'none' }
            fluid={ boolean('fluid', true) }>
            <Row verticalAlignment={ 'center' } shouldWrap={ false }>
              <Col small={ 'auto' }>URL</Col>
              <Col small={ 'fitContent' }>
                <SelectDropdown items={ items } onChange={ noop } value={ 'does' } />
              </Col>
              <Col small={ 'auto' }>
                these <strong>URLs</strong>:
              </Col>
            </Row>
            <Row shouldWrap={ false }>
              <Col small={ 'fillSpace' }>
                <Input id="input-01" type="text" />
              </Col>
              <Col small={ 'fitContent' }>
                <SelectDropdown
                  items={ items }
                  onChange={ noop }
                  value={ 'simple' }
                  width={ '200px' }
                />
              </Col>
              <Col small={ 'fitContent' } paddedContent={ 'sides' }>
                <ButtonRow
                  centerGroup={ [
                    <ButtonIcon
                      key={ 1 }
                      iconName="add"
                      isDisabled={ false }
                      size="large"
                      title="Add Row"
                    />,
                    <ButtonIcon
                      key={ 2 }
                      iconName="close"
                      isDisabled={ false }
                      size="large"
                      title="Remove Row"
                    />,
                  ] }
                />
              </Col>
            </Row>
            <Row shouldWrap={ false }>
              <Col small={ 'fillSpace' }>
                <Input id="input-02" type="text" />
              </Col>
              <Col small={ 'fitContent' }>
                <SelectDropdown
                  items={ items }
                  onChange={ noop }
                  value={ 'simple' }
                  width={ '200px' }
                />
              </Col>
              <Col small={ 'fitContent' } paddedContent={ 'sides' }>
                <ButtonRow
                  centerGroup={ [
                    <ButtonIcon
                      key={ 3 }
                      iconName="add"
                      isDisabled={ false }
                      size="large"
                      title="Add Row"
                    />,
                    <ButtonIcon
                      key={ 4 }
                      iconName="close"
                      isDisabled={ false }
                      size="large"
                      title="Remove Row"
                    />,
                  ] }
                />
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    );
  })
  .add('Responsive Layout Showcase', () => {
    return (
      <Container
        outlineDebug={ boolean('outlineDebug', true) }
        pushRowsTop={ boolean('pushRowsTop', false) }
        paddedContent={ select('paddedContent', paddingOptions, 'none') }
        fluid={ boolean('fluid', false) }>
        <Row
          removeGutters={ boolean('Row removeGutters', false) }
          paddedContent={ 'around' }>
          <div>
            <h2>Features</h2>
            <p className="lead">Manage your app’s feature flags</p>
          </div>
        </Row>
        <Row>
          <Col small={ 6 }>
            <img src="https://s3-us-west-1.amazonaws.com/zach-designs/flagly/thing.svg" />
          </Col>
          <Col small={ 6 }>
            <h6>What’s a Feature Flag?</h6>
            {/* eslint-disable max-len */}
            <p>
              Feature flags, also known as feature toggles, are a software
              development technique that lets you turn certain functionality on
              and off without deploying new code. This allows for better control
              and more experimentation over the full lifecycle of features. You
              can toggle a feature off to release code quickly without exposing
              it to users.
            </p>
            {/* eslint-enable max-len */}
            <h6>Try it for yourself</h6>
            <Code type="block">
              {'var enabled = optimizely.isFeatureEnabled(”chat_window”, userId);' +
                '\nif(enabled)\n{\n  // Feature is enabled\n}' +
                '\nelse {\n  // Feature is disabled\n}'}
            </Code>
            <Row>
              <Col large={ 6 }>
                <Button width={ 'full' }>View Docs</Button>
              </Col>
              <Col large={ 6 }>
                <Button width={ 'full' }>Create Feature</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  });
