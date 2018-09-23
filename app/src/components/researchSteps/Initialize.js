import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getListings, requestData } from '../../actions/research';
import { iconCheckCircle } from '../../utils/fontawesome';

const AUDIENCE_COUNT_DEFAULT = 120;

export default class Initialize extends React.Component {
  state = {
    listings: null,
    loading: false,
    requesting: false,
  };

  componentDidMount() {
    this.loadListings();
  }

  loadListings() {
    this.setState({ loading: true });
    getListings().then(data => {
      this.setState({
        listings: data.data,
        loading: false,
      });
    }).catch(err => {
      this.setState({
        listings: null,
        error: err,
        loading: false,
      });
    });
  };

  handleRequestClick = () => {
    const { data } = this.props;

    this.setState({ requesting: true });
    requestData(data).then(() => {
      this.setState({ requesting: false });
      this.props.jumpToStep(3);
    });
  };

  renderListing(listing) {
    return (
      <tr key={listing.id}>
        <td></td>
        <td>{listing.genetics}</td>
        <td>{listing.age}</td>
        <td>{listing.location}</td>
        <td>{listing.weight}</td>
        <td>{listing.sleep}</td>
        <td>{listing.activity}</td>
        <td>{listing.rate}</td>
      </tr>
    );
  }

  render() {
    const { listings, loading, error } = this.state;

    if (error) {
      return <span>Error! {error}</span>;
    }

    let totalCost = null;
    if (listings) {
      totalCost = listings.reduce((cost, user) => {
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
            {listings && listings.map(this.renderListing)}
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
