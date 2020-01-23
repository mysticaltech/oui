import Icon from 'react-oui-icons';
import classNames from 'classnames';
import React from 'react';

import Button from '../Button';

import { getAssistiveTextFromColorClass } from '../../utils/accessibility';

const renderDismissButton = (testSection?: string) => {
  return (
    <div className="oui-attention__close">
      <Button style="plain" size="small" ariaLabel="Close alert" testSection={`${testSection}-dismiss`}>
        <Icon name="close" size="small" />
      </Button>
    </div>
  );
};

export type AttentionProps = {
  alignment?: 'left' | 'center';
  children?: any;
  isDismissible?: boolean;
  testSection?: string;
  type?: 'bad-news' | 'brand' | 'good-news' | 'warning';
};

const Attention = ({ alignment = 'left', children, isDismissible, testSection, type = 'brand' }: AttentionProps) => {
  const colorClassName = `oui-attention--${type}`;
  const alignmentClassName = `oui-text--${alignment}`;
  const attentionAriaLabel = getAssistiveTextFromColorClass(type);
  const alignClass = `oui-attention ${colorClassName} ${alignmentClassName}`.trim();
  const classes = classNames({
    [`${alignClass}`]: true,
  });
  const dismissBtn = isDismissible ? renderDismissButton(testSection) : null;
  return (
    <div
      data-oui-component={true}
      className={classes}
      data-test-section={testSection}
      aria-label={attentionAriaLabel}
      role="alert"
    >
      {children}
      {dismissBtn}
    </div>
  );
};

export default Attention;
