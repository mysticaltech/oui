import * as storybook from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';

require('../dist/styles.js');
require('../src/oui/oui.scss');

const options = {
  name: 'OUI Storybook',
  url: 'https://github.com/optimizely/oui',
  isFullScreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  showSearchBox: true,
  sortStoriesByKind: false
};

const a11y = {
  a11y: {
    // ... axe options
    element: '#root-preview', // optional selector which element to inspect
    config: {}, // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
    options: {} // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
  },
};

const req = require.context('../src/', true, /story\.js$/);

function loadStories() {
  require('./overview.story.js');
  require('./tokens.story.js');
  require('./css.story.js');
  require('./borderradius.story.js');
  req.keys().forEach(req);
  require('./AppFrame.story.js');
}

storybook.configure(loadStories, module);
storybook.addParameters(options);
storybook.addDecorator(withA11y);
storybook.addDecorator( withInfo({
  source: false,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 20,
  maxPropStringLength: 200,})
);
storybook.addParameters(a11y);
