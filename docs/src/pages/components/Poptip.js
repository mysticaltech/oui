
  import React from 'react';
  import ComponentContent from '../../layouts/templates/ComponentContent';

   import examples from '../../../../src/components/Poptip/example'; import readme from 'raw-loader!../../../../src/components/Poptip/README.md';

  const sassData = {"name":"Poptip\n","description":"Information bubbles on hover.","start":{"line":1,"column":1},"end":{"line":82,"column":4},"example":[{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-top-left\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-top-center\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-top-right\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-right-top\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-right-center\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-right-bottom\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-bottom-right\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-bottom-center\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-bottom-left\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-left-bottom\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-left-center\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"},{"type":"html","description":null,"code":"<div style=\"position: relative; min-height: 2rem\">\n  <div class=\"oui-pop--tip oui-pop--tip--arrow-left-top\" style=\"opacity: 1;\">\n    This is a pop-tip. Use only limited text.\n  </div>\n</div>"}]};
  const reactData = {"description":"Displays help text when hovering on an element.","displayName":"Poptip","methods":[],"props":{"children":{"type":{"name":"node"},"required":true,"description":"Content that, when hovered on, makes the Poptip appear"},"content":{"type":{"name":"string"},"required":true,"description":"Text that appears within the poptip"},"horizontalAttachment":{"type":{"name":"enum","value":[{"value":"'left'","computed":false},{"value":"'center'","computed":false},{"value":"'right'","computed":false}]},"required":false,"description":"Side of the poptip that should attach to the `children`"},"horizontalTargetAttachment":{"type":{"name":"enum","value":[{"value":"'left'","computed":false},{"value":"'center'","computed":false},{"value":"'right'","computed":false}]},"required":false,"description":"Side of `children` that should attach to the poptip"},"testSection":{"type":{"name":"string"},"required":false,"description":"Hook for automated JavaScript tests"},"verticalAttachment":{"type":{"name":"enum","value":[{"value":"'top'","computed":false},{"value":"'middle'","computed":false},{"value":"'bottom'","computed":false}]},"required":false,"description":"Vertical edge of the poptip that should touch the `children`"},"verticalTargetAttachment":{"type":{"name":"enum","value":[{"value":"'top'","computed":false},{"value":"'middle'","computed":false},{"value":"'bottom'","computed":false}]},"required":false,"description":"Vertical edge of the `children` that should touch the poptip"}},"private":false};

  let dataObject = {
    react: reactData, 
    examples: examples ? examples : null,
    readme: readme ? readme : null,
    sass: sassData,
  }
  
  class PoptipComponent extends React.Component {
  
    render() {
      return (
        <ComponentContent data={ dataObject } />
      );
    };
  }
  
  export default PoptipComponent
