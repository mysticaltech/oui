import React from 'react';
import { storiesOf } from '@storybook/react';

import Attention from '../src/components/Attention';
import Badge from '../src/components/Badge';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import Popover from '../src/components/Popover';
import ProgressBar from '../src/components/ProgressBar';
import RangeSlider from '../src/components/RangeSlider';
import SelectDropdown from '../src/components/SelectDropdown';
import Token from '../src/components/Token';
import Textarea from '../src/components/Textarea';

const stories = storiesOf('Overview', module);
stories
  .addDecorator(story => (
    <div id="root-preview" className="reading-column">
      {story()}
    </div>
  ));

stories
  .add('Borders Radius', () => {
    return (
      <div>
        <h1>OUI Components with a Border Radius</h1>

        <div className="push--bottom">
          <Attention type='brand'>Brand: This is a short attention bar.</Attention>
        </div>
        <div className="push--bottom">
          <Attention type='good-news'>Good News: This is a short attention bar.</Attention>
        </div>
        <div className="push--bottom">
          <Attention type='bad-news'>Bad News: This is a short attention bar.</Attention>
        </div>
        <div className="push--bottom">
          <Attention type='warning'>Warning: This is a short attention bar.</Attention>
        </div>

        <div className="position--relative text--center">
          <Popover title="Popover Title">
            <p>
              This is Popover content.
            </p>
          </Popover>
        </div>

        <div className="push--ends">
          <Badge color="default">Default</Badge>
          <Badge color="draft">Draft</Badge>
          <Badge color="live">Live</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="plain">Plain</Badge>
        </div>

        <div className="push--ends">
          <Token
            isDismissible={ true }
            name="Primary Token"
            style="primary"
          />
          <Token
            name="Secondary Token"
            style="secondary"
          />
        </div>

        <div className="push--ends flex">
          <Button key="1">Button</Button>
          <Button key="2" style="highlight">Highlight</Button>
          <Button key="3" style="danger">Danger</Button>
          <Button key="4" style="danger-outline">Danger Outline</Button>
          <Button key="5" style="outline">Outline</Button>
          <Button key="6" style="plain">Plain</Button>
          <Button key="7" style="toggle">Toggle</Button>

          <SelectDropdown
            items={[
              {label: 'Cat',description: 'A small feline.',value: 'cat'},
              {label: 'Dog',value: 'dog'},
              {label: 'Bear',description: 'Likes honey',value: 'bear'}
            ]}
            value="dog"
            onChange={ () => {} }
          />
        </div>

        <div className="push--ends">
          <ProgressBar
            max={100}
            min={0}
            progress={60}
            topLabel="Progress Bar of Hope..."
            leftLabel="None"
            rightLabel="Some"
          />
        </div>

        <div className="push--ends">
          <RangeSlider value={ 50 } />
        </div>

        <div className="push--ends">
          <Input
            label="Field label"
            note="A short description or note about this field."
            placeholder="Just a placeholder"
            type="text"
          />
        </div>

        <div className="push--ends">
          <Textarea />
        </div>

      </div>
    );
  });
