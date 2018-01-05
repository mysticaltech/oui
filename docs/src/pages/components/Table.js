
  import React from 'react';
  import ComponentContent from '../../layouts/templates/ComponentContent';

   import data from '../../../../data/components/Table/react.json'; import examples from '../../../../src/components/Table/example'; import readme from 'raw-loader!../../../../src/components/Table/README.md'; import sassExamples from '../../../../data/components/Table/sass.json';

  let dataObject = {
    react: data ? data : null, 
    examples: examples ? examples : null,
    readme: readme ? readme : null,
    sass: sassExamples ? sassExamples.example : null,
  }
  
  class TableComponent extends React.Component {
  
    render() {
      return (
        <ComponentContent data={ dataObject } />
      );
    };
  }
  
  export default TableComponent