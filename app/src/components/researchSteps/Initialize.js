import React from 'react';
import { Row, Col } from 'reactstrap';
import { getTargetAudience } from '../../actions/research';

export default class Initialize extends React.Component {
  state = {
    audience: null,
    loading: false,
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

  renderAudienceMember() {

  }

  render() {
    const { audience, error } = this.state;

    if (error) {
      return <span>Error! {error}</span>;
    }

    return (
      <div>
        <Row>
          <Col><h4>Select your dataset</h4></Col>
        </Row>
        {audience && audience.map(user => (
          <Row key={user.id}>
            <Col xs={1}>{user.id}</Col>
            <Col>{user.id}</Col>
          </Row>
        ))}
      </div>
    );
  }
}
