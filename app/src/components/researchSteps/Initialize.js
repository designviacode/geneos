import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getTargetAudience, requestData } from '../../actions/research';
import { iconCheckCircle } from '../../utils/fontawesome';

const AUDIENCE_COUNT_DEFAULT = 120;

export default class Initialize extends React.Component {
  state = {
    audience: null,
    loading: false,
    requesting: false,
  };

  componentDidMount() {
    this.loadAudience();
  }

  loadAudience() {
    this.setState({ loading: true });
    getTargetAudience().then(data => {
      this.setState({
        audience: data.data,
        loading: false,
      });
    }).catch(err => {
      this.setState({
        audience: null,
        error: err,
        loading: false,
      });
    });
  };

  handleRequestClick = () => {
    const { data } = this.props;

    this.setState({ requesting: true });
    requestData(data).then(() => {
      this.setState({ requesting: false })
    });
  };

  renderAudienceMember(user) {
    return (
      <tr key={user.id}>
        <td></td>
        <td>{user.genetics}</td>
        <td>{user.age}</td>
        <td>{user.location}</td>
        <td>{user.weight}</td>
        <td>{user.sleep}</td>
        <td>{user.activity}</td>
        <td>{user.rate}</td>
      </tr>
    );
  }

  render() {
    const { audience, loading, error } = this.state;

    if (error) {
      return <span>Error! {error}</span>;
    }

    let totalCost = null;
    if (audience) {
      totalCost = audience.reduce((cost, user) => {
        const rate = parseFloat(user.rate);
        return cost + (isNaN(rate) ? 0 : rate);
      }, 0);
    }

    return (
      <div className="research-step-initialize">
        <Row>
          <Col><h4>Select your dataset</h4></Col>
        </Row>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Genetics</th>
              <th>Age</th>
              <th>Location</th>
              <th>Weight</th>
              <th>Sleep Range</th>
              <th>Activity Level</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {audience && audience.map(this.renderAudienceMember)}
          </tbody>
        </table>
        <FormGroup>
          <div className="summary-label">Select</div>
          <div className="summary-input">
            <Input type="select">
              <option>First</option>
            </Input>
          </div>
          <div className="summary-input">
            <Input defaultValue={AUDIENCE_COUNT_DEFAULT} />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="summary-label">Total</div>
          <div className="summary-value">{totalCost === null ? 'calculating...' : totalCost.toFixed(2)}</div>
          <div className="summary-currency">EOS</div>
        </FormGroup>
        <Row>
          <Col>
            <Button onClick={this.handleRequestClick}>
              Pay and receive data <FontAwesomeIcon icon={iconCheckCircle}/>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
