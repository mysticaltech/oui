import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from '../Layout/Col';
import Row from '../Layout/Row';
import Container from '../Layout/Container';

const Item = props => {
  return (
    <Col paddedContent="around">{ props.children }</Col>
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
        { props.children }
      </Row>
    </Container>
  );
};

SummaryBar.Item = Item;

export default SummaryBar;
