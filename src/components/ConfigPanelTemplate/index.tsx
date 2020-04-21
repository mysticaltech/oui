import classNames from 'classnames';
import React from 'react';
import Container from '../Layout/Container';
import Row from '../Layout/Row';
import Col from '../Layout/Col';

type MainContentPropTypes = {
  /** Inner contents. */
  children: React.ReactNode;
  /** Inner contents. */
  mainTitle: string;
};
const MainContent: React.SFC<MainContentPropTypes> = ({
  children,
  mainTitle,
}) => {
  return (
    <div className="height--1-1 soft-double">
      <h3>{mainTitle}</h3>
      {children}
    </div>
  );
};

type PanelContentPropTypes = {
  /** Inner contents. */
  children: React.ReactNode;
  /** Inner contents. */
  nubbinRef: React.Ref<React.ReactNode>;
  /** Inner contents. */
  panelTitle: string;
};
const PanelContent: React.SFC<PanelContentPropTypes> = ({
  children,
  panelTitle,
  nubbinRef,
}) => {
  let nubbinTopPosition;
  if (nubbinRef) {
    // 17 is half the distance of the diagonal of the nubbin
    // Actually used the pythagorean theorem!
    // Nubbin is 24 x 24, so 24 * √2 == 33.94 / 2 = 17
    nubbinTopPosition = nubbinRef.offsetTop + nubbinRef.offsetHeight / 2 - 17;
  }

  return (
    <div className="height--1-1 soft-double background--light border--left">
      <div
        className="oui-config-panel__nubbin"
        style={{ top: nubbinTopPosition }}
      ></div>
      <h3>{panelTitle}</h3>
      {children}
    </div>
  );
};

type ConfigPanelPropTypes = {
  /** Inner contents. */
  children: Array<React.ReactNode>;
  /** Inner contents. */
  MainContent: React.ReactNode;
  /** Inner contents. */
  PanelContent: React.ReactNode;
};
const ConfigPanel: React.SFC<ConfigPanelPropTypes> = ({ children }) => {
  return (
    <Container fluid={true} isFullHeight={true}>
      <Row>
        <Col small={6}>{children[0]}</Col>
        <Col small={6}>{children[1]}</Col>
      </Row>
    </Container>
  );
};

ConfigPanel.displayName = 'ConfigPanel';

ConfigPanel.MainContent = MainContent;
ConfigPanel.PanelContent = PanelContent;

ConfigPanel.defaultProps = {};

export default ConfigPanel;
