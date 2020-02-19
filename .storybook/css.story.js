import React from 'react';
import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import Input from '../src/components/Input';
import css from '../data/csswhat/oui.css.json';

const HEX_LENGTH = 7;
const colorTokens = require('../src/tokens/src/color.json').tokens;
var tokens = {};
colorTokens.map(colorToken => (
  tokens[colorToken.name] = colorToken.hex
));
var nearestColor = require('nearest-color').from(tokens);

css.nearestColors = [];
css.uniqueColors.map(function(c) {
  if (c.color.length == HEX_LENGTH) {
    var newColor = nearestColor(c.color);
    if (newColor.distance > 0) {
      newColor.original = c.color;
      newColor.count = c.count;
      newColor.distance = Math.round(newColor.distance);
      css.nearestColors.push(newColor);
    }
  }
});
css.oneOfAKindColors.map(function(c) {
  if (c.color.length == HEX_LENGTH) {
    var newColor = nearestColor(c.color);
    if (newColor.distance > 0) {
      newColor.original = c.color;
      newColor.distance = Math.round(newColor.distance);
      css.nearestColors.push(newColor);
    }
  }
});

// [@dave.rau] This file is a work-in-progress

const searchSelectors = function(e) {
  console.log(e);
  console.log(this);
}

const stories = storiesOf('CSS Analytics', module);
stories
  .addDecorator(story => (
    <div id="root-preview" className="reading-column">
      {story()}
    </div>
  ));

stories
.add('Stats', () => {
  console.log(css);
  return (
    <div>
      <h1>Stats</h1>
      <ul>
        <li><h3><span className="muted">Size</span> {css.filesize}</h3></li>
        <li><h3><span className="muted">Rules</span> {css.rules.length}</h3></li>
        <li><h3><span className="muted">Selectors</span> {css.selectors.length}</h3></li>
        <li><h3><span className="muted">Declarations</span> {css.declarations.length}</h3></li>

        <li><h3><span className="muted">Properties</span> {_.uniq(css.properties).length}</h3></li>
        <li><h3><span className="muted">Values</span> {_.uniq(css.values).length}</h3></li>
        <li><h3><span className="muted">!important</span> {css.importants}</h3></li>
        <li><h3><span className="muted">Colors</span> {_.uniq(css.hexCounts).length}</h3></li>
      </ul>
    </div>
  );
})
.add('Colors', () => {
  return (
    <div>
      <h1>Colors</h1>
      <h2 className="push--bottom">Frequently Used Colors
       ({ css.uniqueColors.length })</h2>
       <p>To find these colors first we convert every known color value to hex (rgb(a), hsl(a), and HTML named colors (rebeccapurple). What it doesn't yet cover is color variables/tokens.</p>
      <div className="oui--swatches flex flex-wrap push--ends push-double--top">
        { css.uniqueColors.map(item => (
          <span key={ item.color } title={ item.color } className="width--50 height--50 flex flex--dead-center" style={{ backgroundColor: item.color }}>{ item.count }</span>
        )) }
      </div>

      <h2 className="push-quad--top">One-off Colors
       ({ css.oneOfAKindColors.length })</h2>
      <div className="oui--swatches flex flex-wrap push--ends">
        { css.oneOfAKindColors.map(item => (
          <span key={ item.color } title={ item.color } className="width--50 height--50 flex flex--dead-center" style={{ backgroundColor: item.color }}>{ item.count }</span>
        )) }
      </div>

      <h2 className="push-quad--top">One-off Alpha Colors
       ({ css.oneOfAKindAlphaHexesColors.length })</h2>
      <div className="oui--swatches flex flex-wrap push--ends">
        { css.oneOfAKindAlphaHexesColors.map(item => (
          <span key={ item.color } title={ item.color } className="width--50 height--50 flex flex--dead-center" style={{ backgroundColor: item.color }}>{ item.count }</span>
        )) }
      </div>

      <h2 className="push-quad--top">Nearest Tokens ({ css.nearestColors.length })</h2>
      <div className="push--ends">
        <table className="oui-table">
        {css.nearestColors.map(c => (
          <tr className="vertical-align--middle push--top">
            <td className="vertical-align--middle text--right soft-double--right">{ c.original }</td>
              <td key={ c.value } title={ c.original } className="oui--swatches vertical-align--middle text--center width--250 height--250 push--bottom hard" style={{ borderBottom: '10px solid white', backgroundColor: c.original }}>{ c.count }</td>
              <td key={ c.value } title={ c.color } className="oui--swatches vertical-align--middle text--center width--250 height--250 hard background--c.color" style={{ borderBottom: '10px solid white', backgroundColor: c.value }}>{ c.distance }</td>
              <td className="vertical-align--middle">{ c.name }</td>
            </tr>
        ))}
        </table>
      </div>

    </div>
)})
.add('Table of Properties', () => {
  return (
    <div>
      <h1>Table of CSS Properties</h1>
      <table width={700} className="overflow--hidden">
          { Object.keys(css.propertiesObj).map((key,i)=>(
            <tr key={i}>
              <td className="vertical-align--top border--top soft-double--ends width--300 push-quad--top push--bottom"><h2 className="flush">{key}</h2></td>
              <td className="border--top soft-double--ends">
                {css.propertiesObj[key].map((k,index)=>(
                  <p key={`${i}_${index}`} className="flush push-half--bottom">{k.selector}: <span className="color--brand">{k.value}</span></p>
                ))}
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
})
.add('Search (Coming soon)', () => {
  return (
    <div>
      <h1>Search</h1>
      <p>Soon you will be able to search across OUI CSS helper classes, selectors, properties and values, all from one search box!</p>
      <Input type="text" onKeyUp={ searchSelectors } />

      <div className="push-double--ends border--bottom soft-double--bottom">
        <h3>float</h3>
        <ul className="soft-quad--left">
          <li>.img--right: right</li>
          <li>.img--left: left</li>
          <li>.oui-attention__close: right</li>
          <li>.oui-disclose--right .oui-disclose__symbol: right</li>
          <li>.float--right: right !important</li>
          <li>.float--left: left !important</li>
          <li>.float--none: none !important</li>
          <li>.tippy-tooltip [x-circle]:before: left</li>
          <li>.tippy-backdrop::after: left</li>
        </ul>
      </div>

      <div className="push-double--ends border--bottom soft-double--bottom">
        <h3>margin</h3>
        <ul className="soft-quad--left">
          <li>.img--right: right</li>
          <li>.img--left: left</li>
          <li>.oui-attention__close: right</li>
          <li>.oui-disclose--right .oui-disclose__symbol: right</li>
          <li>.float--right: right !important</li>
          <li>.float--left: left !important</li>
          <li>.float--none: none !important</li>
          <li>.tippy-tooltip [x-circle]:before: left</li>
          <li>.tippy-backdrop::after: left</li>
        </ul>
      </div>

    </div>
  );
});
