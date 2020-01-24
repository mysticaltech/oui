import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import Dropdown from '../Dropdown';
import SearchPicker from './index.js';
import Spinner from '../Spinner';

import { getSearchFunction } from './mock_api';

const searchFunction = getSearchFunction();

const stories = storiesOf('SearchPicker', module);
stories.addDecorator(withKnobs).addDecorator(story => (
  <div
    id="root-preview"
    style={{
      display: 'flex',
      flex: 1,
      height: '100vh',
    }}>
    {story()}
  </div>
));

stories
  .add('Default', () => {
    return (
      <SearchPicker
        onItemSelected={ action('keyboard selection item') }
        searchFunction={ searchFunction }
        supportedTypes={ ['feature'] }>
        {({
          availableEntities,
          renderInput,
          isLoading,
          searchQuery,
          currentFauxFocusIndex,
          resultsText,
        }) => (
          <Dropdown width={ 600 } fullWidth={ true } renderActivator={ renderInput }>
            <Dropdown.Contents minWidth={ 600 } isLoading={ isLoading }>
              <Dropdown.ListItem ignoreToggle={ true }>
                <span className="micro muted soft--sides">{resultsText.summary}</span>
              </Dropdown.ListItem>
              {availableEntities.map((item, index) => (
                <Dropdown.ListItem key={ index }>
                  <Dropdown.BlockLink
                    hasFauxFocus={ currentFauxFocusIndex === index }
                    onClick={ action(`click dropdown block link ${item.name}`) }>
                    <Dropdown.BlockLinkText text={ item.name } />
                    <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
                  </Dropdown.BlockLink>
                </Dropdown.ListItem>
              ))}
              {isLoading && <Spinner hasOverlay={ true } />}
            </Dropdown.Contents>
          </Dropdown>
        )}
      </SearchPicker>
    );
  })
  .add('With Create Button', () => {
    return (
      <SearchPicker
        onItemSelected={ action('keyboard selection item') }
        itemOffset={ 1 }
        searchFunction={ searchFunction }
        supportedTypes={ ['feature'] }>
        {({
          availableEntities,
          renderInput,
          isLoading,
          searchQuery,
          currentFauxFocusIndex,
          resultsText,
        }) => (
          <Dropdown width={ 600 } fullWidth={ true } renderActivator={ renderInput }>
            <Dropdown.Contents minWidth={ 600 } isLoading={ isLoading }>
              <Dropdown.ListItem>
                <Dropdown.BlockLink
                  hasFauxFocus={currentFauxFocusIndex === 0}
                  onClick={ action(`click create dropdown block link`) }>
                  <div className="flex flex-align--center">
                    Create new audience
                  </div>
                </Dropdown.BlockLink>
              </Dropdown.ListItem>
              <Dropdown.ListItem ignoreToggle={ true }>
                <span className="micro muted soft--sides">{resultsText.summary}</span>
              </Dropdown.ListItem>
              {availableEntities.map((item, index) => (
                <Dropdown.ListItem key={ index }>
                  <Dropdown.BlockLink
                    hasFauxFocus={ currentFauxFocusIndex === index + 1 }
                    onClick={ action(`click dropdown block link ${item.name}`) }>
                    <Dropdown.BlockLinkText text={ item.name } />
                    <Dropdown.BlockLinkSecondaryText secondaryText={ item.description } />
                  </Dropdown.BlockLink>
                </Dropdown.ListItem>
              ))}
              {isLoading && <Spinner hasOverlay={ true } />}
            </Dropdown.Contents>
          </Dropdown>
        )}
      </SearchPicker>
    );
  });
