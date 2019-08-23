import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from '../Layout/Col';
import Row from '../Layout/Row';
import Container from '../Layout/Container';

const Item = props => {
  return (
    <div className="item">{ props.children }</div>
  );
};

const SummaryBar = (props) => {
  return (
    <Container
      outlineDebug={ false }
      pushRowsTop={ false }
      pullRowPadding={ false }
      paddedContent="around"
      removeGutters={ false }
      fluid={ true }
      data-oui-component={ true }
      data-test-section={ props.testSection }>
      <Row
        border="ends"
        paddedContent="ends">
        <Col paddedContent="around">
          <h2 className="push-half--bottom">
            Some Title
          </h2>
          Col with border sides
        </Col>
        <Col
          paddedContent="around"
          border="left">
          <h2 className="push-half--bottom">
            A Longer Page Title
          </h2>
          Col with border sides and long-ish content that will definitely run to multiple lines.
        </Col>
        <Col
          paddedContent="around"
          border="left">
          Col with border sides
        </Col>
        <Col
          paddedContent="around"
          border="left">
          Col with border sides
        </Col>
        <Col
          paddedContent="around"
          border="left">
          Col with border right
        </Col>
      </Row>
    </Container>
  );
};

SummaryBar.Item = Item;

export default SummaryBar;
