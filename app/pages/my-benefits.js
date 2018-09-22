import React, { Component } from "react";
import { Container } from "reactstrap";
import LayoutMain from "../src/layouts/main";

import Meta from "../src/components/Meta";

export default class extends Component {
  state = {};

  render() {
    const { data } = this.state;

    return (
      <LayoutMain>
        <Meta title="My Account" />

        <Container>hello</Container>
      </LayoutMain>
    );
  }
}
