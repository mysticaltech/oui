import requestAnimationFrame from './tempPollyfills.js';

requestAnimationFrame();

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

if (global.HTMLElement) {
  global.HTMLElement.prototype.scrollIntoView = function() {};
}
