import React, { Component } from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import LayoutMain from "../src/layouts/main";

import Meta from "../src/components/Meta";
import { getMyItems } from "../src/actions/my";
import DataPanelList from "../src/components/DataPanelList";

export default class extends Component {
  static propTypes = {
    data: PropTypes.shape({})
  };

  state = {};

  componentDidMount() {
    getMyItems().then(data => {
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;

    return (
      <LayoutMain>
        <Meta title="My Data" />

        <Container>
          <DataPanelList data={data} />
        </Container>
      </LayoutMain>
    );
  }
}
