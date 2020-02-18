import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import Code from '../Code';

const langOptions = {
  'cs': 'cs',
  'css': 'css',
  'diff': 'diff',
  'html': 'html',
  'java': 'java',
  'javascript': 'javascript',
  'js': 'js',
  'jsx': 'jsx',
  'markdown': 'markdown',
  'md': 'md',
  'objectivec': 'objectivec',
  'php': 'php',
  'python': 'python',
  'ruby': 'ruby',
  'scss': 'scss',
  'swift': 'swift'};

const stories = storiesOf('Code', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ))
  .addParameters({
    knobs: {
      // Allows users to paste JSX into the text knobs (e.g. `<MyComponent>`)
      // w/o it getting rewritten as `&lt;MyComponent&gt`;
      escapeHTML: false,
    },
  });

stories
  .add('Default', (() => {
    return (
      <Code
        hasCopyButton={ boolean('hasCopyButton', true) }
        isHighlighted={ boolean('isHighlighted', true) }
        testSection='my-code-box'
        type={ select('type', {inline: 'inline', block: 'block'}, 'block') }
        language={ select('language', langOptions, 'js') }>
        { text('code', 'var foo = `bar`; \nvar bat = `baz`;') }
      </Code>
    );
  }))
  .add('With styled copy button', (() => {
    return (
      <Code
        copyButtonStyle="none"
        hasCopyButton={ boolean('hasCopyButton', true) }
        isHighlighted={ true }
        testSection='my-code-box'
        type={ select('type', {inline: 'inline', block: 'block'}, 'block') }
        language={ select('language', langOptions, 'js') }>
        { text(
          'code', 'var foo = `bar`; var bat = `baz`; var withAReallyReallyLongName = `a value with a really really long string`'
        ) }
      </Code>
    );
  }));
