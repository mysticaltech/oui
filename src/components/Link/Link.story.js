import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import Icon from 'react-oui-icons';
import Link from './index.js';
import Button from '../Button';

const stories = storiesOf('Link', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default', (() => {
    return (
      <ul>
        <li>
          <Link
            href={ text('href', 'http://google.com') }
            isDisabled={ boolean('isDisabled', false) }
            style={ select('style',
              {
                default: 'default',
                dark: 'dark',
                muted: 'muted',
                'bad-news': 'bad-news',
                reverse: 'reverse',
              }, 'default') }>
            { text('children', 'Link') }
          </Link>
        </li>
      </ul>
    );
  }))
  .add('New window', (() => {
    return (
      <ul>
        <li>
          <Link
            href={ text('href', 'http://google.com') }
            newWindow={ boolean('newWindow', true) }
            style={ select('style',
              {
                default: 'default',
                dark: 'dark',
                muted: 'muted',
                'bad-news': 'bad-news',
                reverse: 'reverse',
              }, 'default') }>
            { text('children', 'Link') }
          </Link>
        </li>
      </ul>
    );
  }))
  .add('All links', () => {
    return (
      <ul>
        <li><Link href="http://google.com" isDisabled={ boolean('isDisabled', false) } onClick={ action('click blocklist item home') }>{ text('default', 'Link') }</Link></li>
        <li><Link href="http://google.com" isDisabled={ boolean('isDisabled', false) } style="dark">{ text('dark', 'Link Dark') }</Link></li>
        <li><Link href="http://google.com" isDisabled={ boolean('isDisabled', false) } style="muted">{ text('muted', 'Link Muted') }</Link></li>
        <li><Link href="http://google.com" isDisabled={ boolean('isDisabled', false) } style="bad-news">{ text('bad-news', 'Link Bad News') }</Link></li>
        <li className="background--brand"><Link href="http://google.com" isDisabled={ boolean('isDisabled', false) } style="reverse">{ text('reverse', 'Link Reverse') }</Link></li>
      </ul>
    );
  })
  .add('All disabled', () => {
    return (
      <ul>
        <li><Link href="http://google.com" isDisabled={ true }>Link</Link></li>
        <li><Link href="http://google.com" isDisabled={ true } style="dark">Link Dark</Link></li>
        <li><Link href="http://google.com" isDisabled={ true } style="muted">Link Muted</Link></li>
        <li><Link href="http://google.com" isDisabled={ true } style="bad-news">Link Bad News</Link></li>
        <li className="background--brand"><Link href="http://google.com" isDisabled={ true } style="reverse">Link Reverse</Link></li>
      </ul>
    );
  })
  .add('Link that looks like a Button', () => {
    return (
      <div>
        <p>
          <span className="push--right">
            <Icon fill="red" name="exclamation"/>
          </span>
          Be sure to set the
          <code className="underline"><strong>isLink</strong></code>
          prop to `true` on the inner button when using this implementation
        </p>
        <Link
          newWindow={ true }
          href={ text('href', 'http://google.com') }>
          <Button isLink={ true } onClick={ null }>Go To Google</Button>
        </Link>
      </div>
    );
  });

storiesOf('Link (Fake)', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ))
  .add('Enabled', () => {
    return (
      <Link>Faux Link</Link>
    );
  })
  .add('Disabled', () => {
    return (
      <Link
        isDisabled={ true }>
        Faux Link
      </Link>
    );
  });
