import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Dropdown from './index.js';
import Button from '../Button';
import ButtonRow from '../ButtonRow';
import Icon from 'react-oui-icons';
import Link from '../Link';

const data = [
  { title: 'Manual', description: 'Dolcelatte cheeseburger swiss paneer cow gouda edam cheese slices' },
  {
    title: 'Maximize Conventions',
    header: 'Automation',
    description: 'Everyone loves cut the cheese cow squirty cheese emmental jarlsberg halloumi camembert de normandie.',
  },
  { title: 'Faster Results', description: 'Cauliflower cheese stilton paneer hard cheese fondue.' },
];

const dataLarge = [
  { title: 'Manual', description: 'Dolcelatte cheeseburger' },
  { title: 'Maximize Conventions', header: 'Automation', description: 'Everyone loves cut the cheese cow ' },
  { title: 'Faster Results', description: 'Cauliflower cheese stilton paneer hard cheese fondue.' },
  { title: 'Manual', description: 'Dolcelatte cheeseburger' },
  { title: 'Maximize Conventions', header: 'Automation', description: 'Everyone loves cut the cheese cow ' },
  { title: 'Faster Results', description: 'Cauliflower cheese stilton paneer hard cheese fondue.' },
  { title: 'Manual', description: 'Dolcelatte cheeseburger' },
  { title: 'Maximize Conventions', header: 'Automation', description: 'Everyone loves cut the cheese cow ' },
  { title: 'Faster Results', description: 'Cauliflower cheese stilton paneer hard cheese fondue.' },
  { title: 'Manual', description: 'Dolcelatte cheeseburger' },
  { title: 'Maximize Conventions', header: 'Automation', description: 'Everyone loves cut the cheese cow ' },
  { title: 'Faster Results', description: 'Cauliflower cheese stilton paneer hard cheese fondue.' },
];

const stories = storiesOf('Dropdown', module);
stories.addDecorator(withKnobs).addDecorator(story => <div id="root-preview">{story()}</div>);

stories.add('Default', () => {
  return (
    <Container>
      <Dropdown
        buttonContent={ text('buttonContent', 'Default Dropdown') }
        width={ number('width', 300) }
        arrowIcon={ select('arrowIcon', { up: 'up', down: 'down', left: 'left', right: 'right', none: 'none' }, 'down') }>
        <Dropdown.Contents>
          {data.map((item, index) => {
            return (
              <Dropdown.ListItem key={ index }>
                <Dropdown.BlockLink onClick={ action('click on complex item') }>
                  <Dropdown.BlockLinkText text={ item.title } />
                  <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
                </Dropdown.BlockLink>
              </Dropdown.ListItem>
            );
          })}
        </Dropdown.Contents>
      </Dropdown>
    </Container>
  );
});

stories.add('Error', () => {
  return (
    <Container>
      <Dropdown
        buttonContent={ text('buttonContent', 'Error State') }
        width={ number('width', 300) }
        displayError={ true }
        arrowIcon={ select('arrowIcon', { up: 'up', down: 'down', left: 'left', right: 'right', none: 'none' }, 'down') }>
        <Dropdown.Contents>
          {data.map((item, index) => {
            return (
              <Dropdown.ListItem key={ index }>
                <Dropdown.BlockLink onClick={ action('click on complex item') }>
                  <Dropdown.BlockLinkText text={ item.title } />
                  <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
                </Dropdown.BlockLink>
              </Dropdown.ListItem>
            );
          })}
        </Dropdown.Contents>
      </Dropdown>
    </Container>
  );
});

stories.add('Icon', () => {
  return (
    <Container>
      <Dropdown
        isDisabled={ boolean('isDisabled', false) }
        fullWidth={ boolean('fullWidth', false) }
        buttonContent={
          <div className="flex flex-align--center">
            Hamburgers{' '}
            <span className="push-half--left flex">
              <Icon name="hamburger" />
            </span>
          </div>
        }
        width={ number('width', 350) }>
        <Dropdown.Contents>
          {data.map((item, index) => {
            return (
              <Dropdown.ListItem key={ index }>
                <Dropdown.BlockLink onClick={ action('click on complex item') }>
                  <Dropdown.BlockLinkText text={ item.title } />
                  <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
                </Dropdown.BlockLink>
              </Dropdown.ListItem>
            );
          })}
        </Dropdown.Contents>
      </Dropdown>
    </Container>
  );
});

stories.add('With a Label', () => {
  return (
    <Container>
      <Dropdown
        isDisabled={ boolean('isDisabled', false) }
        fullWidth={ boolean('fullWidth', false) }
        buttonContent={{
          label: 'Date',
          content: 'Anytime',
        }}
        style="plain"
        arrowIcon="down"
        width={ number('width', 350) }>
        <Dropdown.Contents>
          {data.map((item, index) => {
            return (
              <Dropdown.ListItem key={ index } role="option">
                <Dropdown.BlockLink onClick={ action('click on complex item') }>
                  <Dropdown.BlockLinkText text={ item.title } />
                  <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
                </Dropdown.BlockLink>
              </Dropdown.ListItem>
            );
          })}
        </Dropdown.Contents>
      </Dropdown>
    </Container>
  );
});

stories.add('Z-index', () => {
  return (
    <Container className="background--faint">
      <SubContainer>
        <ScrollContainer>
          <Dropdown
            isDisabled={ boolean('isDisabled', false) }
            buttonContent={ text('buttonContent', 'Dropdown') }
            width={ number('width', 300) }
            zIndex={ number('zIndex', 9999) }>
            <Dropdown.Contents>
              {data.map((item, index) => {
                return (
                  <Dropdown.ListItem key={ index }>
                    <Dropdown.BlockLink onClick={ action('click on complex item') }>
                      <Dropdown.BlockLinkText text={ item.title } />
                      <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
                    </Dropdown.BlockLink>
                  </Dropdown.ListItem>
                );
              })}
            </Dropdown.Contents>
          </Dropdown>
          <h1>This text should be behind the open dropdown</h1>
        </ScrollContainer>
      </SubContainer>
    </Container>
  );
});

const renderActivator = (
  { onBlur, onClick, buttonRef } // eslint-disable-line
) => (
  <Button buttonRef={ buttonRef } onClick={ onClick } onBlur={ onBlur }>
    Click to activate
  </Button>
);

stories.add('List', () => {
  return (
    <Container className="background--faint">
      <SubContainer>
        <Dropdown
          isDisabled={ boolean('isDisabled', false) }
          renderActivator={ renderActivator }
          placement={ 'top-start' }
          width={ number('width', 300) }>
          <Dropdown.Contents minWidth={ 300 } direction={ 'up' }>
            <Dropdown.ListItem>
              <Dropdown.BlockLink onClick={ action('click dropdown block link') }>
                <Dropdown.BlockLinkText text={ 'This is a label' } />
                <Dropdown.BlockLinkSecondaryText secondaryText={ 'This is a smaller description' } />
              </Dropdown.BlockLink>
            </Dropdown.ListItem>
            <Dropdown.ListItem>
              <Dropdown.BlockLink onClick={ action('click dropdown block link 2') }>
                <Dropdown.BlockLinkText text={ 'This is a second label' } />
                <Dropdown.BlockLinkSecondaryText secondaryText={ 'This is a second smaller description' } />
              </Dropdown.BlockLink>
            </Dropdown.ListItem>
          </Dropdown.Contents>
        </Dropdown>
        <h1>This text should be behind the open dropdown</h1>
      </SubContainer>
    </Container>
  );
});

stories.add('With faux highlighting', () => {
  return (
    <Container>
      <Dropdown buttonContent={ text('buttonContent', 'Activate') } width={ number('width', 300) }>
        <Dropdown.Contents minWidth={ 300 }>
          {dataLarge.map((item, idx) => (
            <Dropdown.ListItem key={ idx }>
              <Dropdown.BlockLink
                onClick={ action(`click dropdown block link ${idx + 1}`) }
                hasFauxFocus={ idx === dataLarge.length - 2 }>
                <Dropdown.BlockLinkText text={ item.title } />
                <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
              </Dropdown.BlockLink>
            </Dropdown.ListItem>
          ))}
        </Dropdown.Contents>
      </Dropdown>
    </Container>
  );
});

const renderHeader = () => (
  <div className="flex soft">
    <div className="flex--1 milli">Attic and Button</div>
    <div>
      <a href="https://www.example.com/" className="milli">
        https://www.atticandbutton.com/
      </a>
    </div>
  </div>
);

stories.add('With a header and separators', () => {
  return (
    <Container>
      <Dropdown buttonContent={ text('buttonContent', 'Activate') } width={ number('width', 600) }>
        <Dropdown.Contents renderHeader={ renderHeader }>
          <Dropdown.ListItem role="separator" ignoreToggle={ true }>
            Large Things
          </Dropdown.ListItem>
          {dataLarge.map((item, idx) => (
            <Dropdown.ListItem role="menuitem" key={ idx }>
              <Dropdown.BlockLink onClick={ action(`click dropdown block link ${idx + 1}`) } hasFauxFocus={ idx === 1 }>
                <Dropdown.BlockLinkText text={ item.title } />
                <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
              </Dropdown.BlockLink>
            </Dropdown.ListItem>
          ))}
          <Dropdown.ListItem role="separator" ignoreToggle={ true }>
            Small Things
          </Dropdown.ListItem>
          {data.map((item, idx) => (
            <Dropdown.ListItem role="menuitem" key={ idx }>
              <Dropdown.BlockLink onClick={ action(`click dropdown block link ${idx + 1}`) }>
                <Dropdown.BlockLinkText text={ item.title } />
                <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
              </Dropdown.BlockLink>
            </Dropdown.ListItem>
          ))}
        </Dropdown.Contents>
      </Dropdown>
    </Container>
  );
});

stories.add('Warnings', () => {
  const longSecondaryText = 'exclamation! '.repeat(10);
  return (
    <Container>
      <Dropdown buttonContent={ text('buttonContent', 'Activate') } width={ number('width', 300) }>
        <Dropdown.Contents minWidth={ 300 }>
          <Dropdown.ListItem hasFauxFocus={ true }>
            <Dropdown.BlockLink onClick={ action('click dropdown block link 1') } isLink={ false }>
              <Dropdown.BlockLinkText text="This is a warning" />
              <Dropdown.BlockLinkSecondaryText isWarning={ true } secondaryText="Warning: There is an exclamation mark" />
            </Dropdown.BlockLink>
          </Dropdown.ListItem>
          <Dropdown.ListItem>
            <Dropdown.BlockLink onClick={ action('click dropdown block link 2') } isLink={ false }>
              <Dropdown.BlockLinkText text="Another Warning" />
              <Dropdown.BlockLinkSecondaryText isWarning={ true } secondaryText={ longSecondaryText } />
            </Dropdown.BlockLink>
          </Dropdown.ListItem>
        </Dropdown.Contents>
      </Dropdown>
    </Container>
  );
});

stories.add('Multi Select', () => {
  return (
    <Container>
      <div>
        <p>Add <code>isMultiSelect = true</code>
          for each BlockLink that should include a checkbox, and
          <code>isItemSelected = true</code> for each item that
          should appear as checked/selected
        </p>
      </div>
      <Dropdown
        buttonContent={{
          label: 'Type',
          content: 'Any',
        }}
        style="plain"
        arrowIcon="down"
        shouldHideChildrenOnClick={ boolean('shouldHideChildrenOnClick', false) }>
        <Dropdown.Contents>
          {data.map((item, index) => {
            return (
              <Dropdown.ListItem key={ index } >
                <Dropdown.BlockLink
                  isMultiSelect={ true }
                  isItemSelected={ item.title === 'Manual' }
                  onClick={ action('click on complex item') }>
                  <Dropdown.BlockLinkText text={ item.title } />
                </Dropdown.BlockLink>
              </Dropdown.ListItem>
            );
          })}
        </Dropdown.Contents>
      </Dropdown>
    </Container>
  );
});

stories.add('Custom hide function', () => {
  return [
    <p key="sourceLink" className="push--bottom">
      This story's children use the optional{' '}
      <Link href="https://reactjs.org/docs/render-props.html" newWindow={ true }>
        render props pattern
      </Link>
      .{' '}
      <Link
        href="https://github.com/optimizely/oui/blob/devel/src/components/Dropdown/Dropdown.story.js"
        newWindow={ true }>
        Click here
      </Link>{' '}
      to see this story's source code.
    </p>,
    <Container key="story">
      <Dropdown
        arrowIcon={ select('arrowIcon', { up: 'up', down: 'down', left: 'left', right: 'right', none: 'none' }, 'down') }
        buttonContent={{
          label: 'Date',
          content: 'Anytime',
        }}
        placement={ select(
          'placement',
          {
            top: 'top',
            'top-start': 'top-start',
            'top-end': 'top-end',
            bottom: 'bottom',
            'bottom-start': 'bottom-start',
            'bottom-end': 'bottom-end',
            right: 'right',
            'right-start': 'right-start',
            'right-end': 'right-end',
            left: 'left',
            'left-start': 'left-start',
            'left-end': 'left-end',
          },
          'bottom-start'
        ) }
        shouldHideChildrenOnClick={ boolean('shouldHideChildrenOnClick', false) }
        style="plain"
        width={ number('width', 300) }>
        {({ handleHideChildren }) => (
          <div className="soft background--white">
            <div className="soft--bottom">This is some initial text! Click me, nothing happens.</div>
            <ButtonRow
              leftGroup={ [
                <Button key="nothing" onClick={ action('some other action') }>
                  Doesn't Hide
                </Button>,
                <Button key="something" onClick={ handleHideChildren }>
                  Hide Dropdown
                </Button>,
              ] }
            />
          </div>
        )}
      </Dropdown>
    </Container>,
  ];
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
`;

const SubContainer = styled.div`
  width: 700px;
  height: 400px;
  background: lightgrey;
  margin: 100px auto;
  overflow: scroll;
  padding: 20px;
  padding-top: 300px;
`;

const ScrollContainer = styled.div`
  width: 1000px;
  height: 1000px;
`;
