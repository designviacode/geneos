import React from 'react';
import { Card, CardBody } from 'reactstrap';

export default () => (
  <section>
    <a name="heart-rate" />
    <h1>Heart Rate</h1>
    <Card data-aos="fade-up">
      <CardBody>
        <img src="/static/heart-rate.svg" />
      </CardBody>
    </Card>
  </section>
);
