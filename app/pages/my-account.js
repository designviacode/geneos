import React, { Component } from "react";
import { Container } from "reactstrap";
import LayoutMain from "../src/layouts/main";

import Meta from "../src/components/Meta";
import ItemGrid from "../src/components/ItemGrid";

export default class extends Component {
  state = {};

  render() {
    const { data } = this.state;

    return (
      <LayoutMain>
        <Meta title="My Account" />

        <main>
          <Container>
            <ItemGrid data={data} />
          </Container>
        </main>
      </LayoutMain>
    );
  }
}
