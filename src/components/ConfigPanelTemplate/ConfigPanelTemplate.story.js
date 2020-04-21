import React from 'react';

import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';

import ConfigPanel from '.';
import Token from '../Token';

class ConfigExampleContainer extends React.Component {
  constructor(props) {
    super(props);
    // 1.) create the reference here.
    this.pointingRef = React.createRef();
    this.state = { nubbinPointingRef: null };
  }

  componentDidMount() {
    // 3.) Use the ref to store the node in state
    this.setState({ nubbinPointingRef: this.pointingRef.current });
  }

  render() {
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <ConfigPanel>
          <ConfigPanel.MainContent mainTitle="Rules for Production">
            <p>Hi There</p>
            <div style={{ height: '100px' }}></div>
            <div className=" flex flex--column border--all" ref={ this.pointingRef }>
              The nubbin should point in the middle of this area
              <Token
                isDraggable={ true }
                name={ 'This is option 1 for reordering' }
                order={ 1 }
                showWell={ false }
              />
              <Token
                isDraggable={ true }
                name={ 'This is option 2 for reordering' }
                order={ 2 }
                showWell={ false }
              />
              <Token
                isDraggable={ true }
                name={ 'This is option 3 for reordering' }
                order={ 3 }
                showWell={ false }
              />
            </div>
          </ConfigPanel.MainContent>
          <ConfigPanel.PanelContent
            panelTitle="Configure Rule"
            nubbinRef={ this.state.nubbinPointingRef }>
            <p>oh Hello</p>
          </ConfigPanel.PanelContent>
        </ConfigPanel>
      </div>
    );
  }
}

const storiesForTemplates = storiesOf('LayoutKit/Templates', module);
storiesForTemplates
  .addDecorator(withKnobs)
  .addDecorator((story) => <div id="root-preview">{story()}</div>);

storiesForTemplates.add('Config Panel', () => {
  return <ConfigExampleContainer />;
});
