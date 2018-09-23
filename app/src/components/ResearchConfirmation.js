import React from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { iconArrowRight } from '../utils/fontawesome';

export default class ResearchConfirmation extends React.PureComponent {
  static propTypes = {
    request: PropTypes.shape({
    }).isRequired,
  };

  renderDetailRow(label, value) {
    return (
      <Row>
        <Col>
          <div className="purchase-confirmation__label">{label}:</div>
          <div className="purchase-confirmation__value">{value}</div>
        </Col>
      </Row>
    );
  }

  /*
  {
    "offerId": 84,
    "tokenId": 0,
    "from": "jens",
    "price": "35.0000 EOS",
    "researchName": "1",
    "researchArea": "2",
    "duration": "1 Month"
    },
 */

  render() {
    const { request } = this.props;

    return (
      <Modal isOpen={true}>
        <ModalHeader>
          <h1>CONGRATULATIONS</h1>
          <span>YOUR PROJECT HAS BEEN CREATED</span>
        </ModalHeader>
        <ModalBody className="purchase-confirmation">
          {this.renderDetailRow('Sample Size', `${request.totalCount} SUBJECTS`)}
          {this.renderDetailRow('Study Duration', request.duration)}
          {this.renderDetailRow('Dataset', 'Age, Location, Weight')}
          {this.renderDetailRow('Cost', (
            <span>
              <img
                src="/static/eos-yellow.svg"
                style={{ width: 25, marginRight: 15 }}
              />
              <span>{request.totalCost.toFixed(2)} EOS</span>
            </span>
          ))}
          <ModalFooter>
            <Button color="primary">
              Download Dataset <FontAwesomeIcon icon={iconArrowRight} />
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    );
  }
}
