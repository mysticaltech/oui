
  import React from 'react';
  import ComponentContent from '../../layouts/templates/ComponentContent';

   import data from '../../../../data/components/Input/react.json'; import examples from '../../../../src/components/Input/example'; import readme from 'raw-loader!../../../../src/components/Input/README.md';

  let dataObject = {
    react: data ? data : null, 
    examples: examples ? examples : null,
    readme: readme ? readme : null
  }
  
  class InputComponent extends React.Component {
  
    render() {
      return (
        <ComponentContent data={ dataObject } />
      );
    };
  }
  
  export default InputComponent
