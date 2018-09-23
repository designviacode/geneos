import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { noop } from 'lodash';

import { iconArrowLeft, iconArrowRight } from '../../utils/fontawesome';

export default class NavRow extends React.Component {
  static defaultProps = {
    jumpToStep: noop,
    step: 0,
  };

  render() {
    const { jumpToStep, step } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {step > 0 ? (
            <Button onClick={() => jumpToStep(step - 1)}><FontAwesomeIcon icon={iconArrowLeft}/> BACK</Button>
          ) : null}
          <Button onClick={() => jumpToStep(step + 1)}>NEXT <FontAwesomeIcon icon={iconArrowRight}/></Button>
        </Col>
      </Row>
    );
  }
}
