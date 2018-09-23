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
      <div className="next-button">
      <Row>
        <Col xs={12}>
          {step > 0 ? (
            <Button className="back-button" onClick={() => jumpToStep(step - 1)}><FontAwesomeIcon icon={iconArrowLeft}/> BACK</Button>
          ) : null}
          <Button onClick={() => jumpToStep(step + 1)}>NEXT <FontAwesomeIcon icon={iconArrowRight}/></Button>
        </Col>
      </Row>
      </div>
    );
  }
}
