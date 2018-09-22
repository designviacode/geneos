import React from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

export default class PurchaseConfirmation extends React.PureComponent {
  static propTypes = {
    request: PropTypes.shape({
      isProcessing: PropTypes.bool,
    }).isRequired,
    isOpen: PropTypes.bool,
    onReject: PropTypes.func,
    onAccept: PropTypes.func,
  };

  static defaultProps = {
    onReject: noop,
    onAccept: noop,
  };

  handleReject = () => {
    const { onReject, request } = this.props;
    onReject(request);
  };

  handleAccept = () => {
    const { onAccept, request } = this.props;
    onAccept(request);
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

  render() {
    const { request, isOpen } = this.props;

    const isProcessing = request.isProcessing || false;

    return (
      <Modal isOpen={isOpen} toggle={this.handleReject}>
        <ModalHeader>
          <h1>INCOMING</h1>
          <span>ACCESS REQUEST</span>
        </ModalHeader>
        <ModalBody className="purchase-confirmation">
          <Row className="row-margin">
            <Col><strong>{request.user.name} would like to subscribe to your data.</strong></Col>
          </Row>
          <Row className="row-margin">
            <Col>The data you share is anonymous and secure. You can revoke access any time.</Col>
          </Row>
          {this.renderDetailRow('Subscription Period', request.formData.duration)}
          {this.renderDetailRow('You will earn', request.formData.payout)}
          {this.renderDetailRow('Research Area', request.formData.researchArea)}
          <ModalFooter>
            <Button onClick={this.handleAccept} color="primary" disabled={isProcessing}>Accept</Button>
            <Button onClick={this.handleReject} color="secondary" disabled={isProcessing}>Reject</Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    );
  }
}
