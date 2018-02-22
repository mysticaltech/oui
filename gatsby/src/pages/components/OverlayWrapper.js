
  import React from 'react';
  import ComponentContent from '../../layouts/templates/ComponentContent';

   import examples from '../../../../src/components/OverlayWrapper/example'; import readme from 'raw-loader!../../../../src/components/OverlayWrapper/README.md';

  const sassData = null;
  const reactData = {"description":"Intelligently position elements on a page.","displayName":"OverlayWrapper","methods":[{"name":"enableTether","docblock":null,"modifiers":[],"params":[],"returns":null},{"name":"disableTether","docblock":null,"modifiers":[],"params":[],"returns":null},{"name":"removeBodyEventListner","docblock":null,"modifiers":[],"params":[],"returns":null},{"name":"isClickWithinOverlayOrChildren","docblock":"Disable Tether if a user clicks outside of the `overlay` and `children`.\n@param {Object} event - Click event","modifiers":[],"params":[{"name":"event","description":"Click event","type":{"name":"Object"}}],"returns":null,"description":"Disable Tether if a user clicks outside of the `overlay` and `children`."},{"name":"createTether","docblock":null,"modifiers":[],"params":[{"name":"options","type":null}],"returns":null},{"name":"onChildClick","docblock":null,"modifiers":[],"params":[{"name":"event","type":null},{"name":"child","type":null}],"returns":null},{"name":"onChildMouseOver","docblock":null,"modifiers":[],"params":[{"name":"event","type":null},{"name":"child","type":null}],"returns":null},{"name":"onChildMouseOut","docblock":null,"modifiers":[],"params":[{"name":"event","type":null},{"name":"child","type":null}],"returns":null},{"name":"onEscapeKey","docblock":null,"modifiers":[],"params":[{"name":"event","type":null}],"returns":null}],"props":{"behavior":{"type":{"name":"enum","value":[{"value":"'click'","computed":false},{"value":"'hover'","computed":false}]},"required":false,"description":"Event to listen to and open the overlay","defaultValue":{"value":"'click'","computed":false}},"children":{"type":{"name":"node"},"required":true,"description":"Element that the `overlay` should attach to"},"horizontalAttachment":{"type":{"name":"enum","value":[{"value":"'left'","computed":false},{"value":"'center'","computed":false},{"value":"'right'","computed":false}]},"required":false,"description":"Side of the `overlay` that should attach to the `children`","defaultValue":{"value":"'center'","computed":false}},"horizontalTargetAttachment":{"type":{"name":"enum","value":[{"value":"'left'","computed":false},{"value":"'center'","computed":false},{"value":"'right'","computed":false}]},"required":false,"description":"Side of `children` that should attach to the `overlay`"},"isConstrainedToScreen":{"type":{"name":"bool"},"required":true,"description":"Attach `overlay` to an edge of the screen if it is going to move off","defaultValue":{"value":"false","computed":false}},"onHide":{"type":{"name":"func"},"required":false,"description":"Function that runs when the `overlay` is hidden. Return `false` to prevent\nthe `overlay` from closing."},"onShow":{"type":{"name":"func"},"required":false,"description":"Function that runs when the `overlay` is shown"},"overlay":{"type":{"name":"node"},"required":true,"description":"The element that is attached to the children"},"shouldHideOnClick":{"type":{"name":"bool"},"required":false,"description":"Should the `overlay` close when clicking outside of it","defaultValue":{"value":"true","computed":false}},"testSection":{"type":{"name":"string"},"required":false,"description":"Hook for automated JavaScript tests"},"verticalAttachment":{"type":{"name":"enum","value":[{"value":"'top'","computed":false},{"value":"'middle'","computed":false},{"value":"'bottom'","computed":false}]},"required":false,"description":"Vertical edge of the `overlay` that should touch the `children`","defaultValue":{"value":"'top'","computed":false}},"verticalTargetAttachment":{"type":{"name":"enum","value":[{"value":"'top'","computed":false},{"value":"'middle'","computed":false},{"value":"'bottom'","computed":false}]},"required":false,"description":"Vertical edge of the `children` that should touch the `overlay`"}},"private":false};

  let dataObject = {
    react: reactData, 
    examples: examples ? examples : null,
    readme: readme ? readme : null,
    sass: sassData,
  }
  
  class OverlayWrapperComponent extends React.Component {
  
    render() {
      return (
        <ComponentContent data={ dataObject } />
      );
    };
  }
  
  export default OverlayWrapperComponent