import React from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Container,
  Card
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getListings, requestData } from '../../actions/research';
import { iconCheckCircle } from '../../utils/fontawesome';
import ResearchConfirmation from '../ResearchConfirmation';

const AUDIENCE_COUNT_DEFAULT = 120;

export default class Initialize extends React.Component {
  state = {
    listings: null,
    loading: false,
    requesting: false,
    done: false,
  };

  componentDidMount() {
    this.loadListings();
  }

  loadListings() {
    this.setState({ loading: true });
    getListings(this.props.data)
      .then(data => {
        this.setState({
          listings: data.data,
          loading: false
        });

      })
      .catch(err => {
        this.setState({
          listings: null,
          error: err.response ? err.response.data : err,
          loading: false
        });
      });
  }

  calculateTotalcost(listings) {
    let totalCost = 0;
    if (listings) {
      totalCost = listings.reduce((cost, user) => {
        const rate = parseFloat(user.rate);
        return cost + (isNaN(rate) ? 0 : rate);
      }, 0);
    }
    return totalCost;
  }

  handleRequestClick = () => {
    const { data } = this.props;

    this.setState({ requesting: true });
    requestData(data).then(() => {
      this.setState({
        requesting: false,
        done: true,
      });
      this.props.jumpToStep(3);
    });
  };

  formatDecimal(num, decimals = 1) {
    return typeof num === 'number' ? num.toFixed(decimals) : '';
  }

  renderListing = (listing) => {
    return (
      <tr key={listing.id}>
        <td />
        <td>{listing.genetics}</td>
        <td>{this.formatDecimal(listing.age, 0)}</td>
        <td>{listing.location}</td>
        <td>{this.formatDecimal(listing.weight, 0)}</td>
        <td>{this.formatDecimal(listing.sleep)}</td>
        <td>{this.formatDecimal(listing.activity)}</td>
        <td>{listing.rate}</td>
      </tr>
    );
  };

  renderConfirmation() {
    const { listings } = this.state;
    const { data } = this.props;

    const totalCount = listings.length;
    const totalCost = this.calculateTotalcost(listings);

    const finalData = {
      ...data,
      totalCount,
      totalCost,
    };

    return (
      <div className="research-step-initialize">
        <Row>
          <Col>
            <h4>You're all set.</h4>
          </Col>
        </Row>
        <ResearchConfirmation request={finalData} />
      </div>
    );
  }

  render() {
    const { listings, done, error } = this.state;

    const totalCost = this.calculateTotalcost(listings);

    if (done) {
      return this.renderConfirmation();
    }

    return (
      <Container>
        <Card>
      <div className="research-step-initialize">
        <Row>
          <Col>
            <h4>Select your dataset</h4>
          </Col>
        </Row>
        <div className="results-div">
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
          {error ? (
            <tbody><tr><td>Error loading listings!</td></tr></tbody>
          ) : (
            <tbody>{listings && listings.map(this.renderListing)}</tbody>
          )}
        </table>
        </div>
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
          <div className="summary-value">
            {totalCost === null ? 'calculating...' : totalCost.toFixed(2)}
          </div>
          <div className="summary-currency">EOS</div>
        </FormGroup>
        <Row>
          <Col>
            <Button className="submit-button" onClick={this.handleRequestClick}>
              Pay and receive data <FontAwesomeIcon icon={iconCheckCircle} />
            </Button>
          </Col>
        </Row>
      </div>
  </Card>
      </Container>
    );
  }
}
