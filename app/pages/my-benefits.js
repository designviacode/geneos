import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  Table,
  CardHeader,
  CardBody,
  Container,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Meta from '../src/components/Meta';
import LayoutMain from '../src/layouts/main';
import moment from 'moment';

const data = {
  earnings: [
    { id: 1, name: 'Today', amount: '$12.81' },
    { id: 2, name: 'This Month', amount: '$81.11' },
    { id: 3, name: 'This Year', amount: '$482.81' }
  ],
  subscribers: [
    {
      name: 'NYU',
      purpose: 'Lung cancer research',
      rating: 71,
      earned: 3.4,
      startDate: 'Sat Sep 22 2018 18:11:42 GMT+0100 (British Summer Time)'
    },
    {
      name: 'Johns Hopkins',
      purpose: 'Atrial fibrillation research',
      rating: 43,
      earned: 4.1,
      startDate: 'Sat Sep 10 2018 18:11:42 GMT+0100 (British Summer Time)'
    }
  ]
};

export default class extends Component {
  render() {
    return (
      <LayoutMain>
        <Meta title="My Benefits" />

        <Container className="my-benefits-page">
          <Nav>
            <NavItem>
              <NavLink href="#earnings">Earnings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#subscribers">Data Usage</NavLink>
            </NavItem>
          </Nav>
          <section>
            <a name="#earnings" />
            <h1>Earnings</h1>
            <Row>
              {data.earnings.map(item => (
                <Col>
                  <Card key={item.id}>
                    <CardBody>
                      <h5>{item.name}</h5>
                      <h1>{item.amount}</h1>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
          <hr />
          <section>
            <a name="#earnings" />
            <h1>Data Usage</h1>
            <Row>
              <Col lg="8">
                <Card>
                  <CardHeader>Data Sold To</CardHeader>
                  <Table>
                    <thead>
                      <tr>
                        <th>Subscriber</th>
                        <th>Purpose</th>
                        <th>Rating</th>
                        <th>Earned</th>
                        <th>Start date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.subscribers.map(subscriber => (
                        <tr>
                          <td>{subscriber.name}</td>
                          <td>{subscriber.purpose}</td>
                          <td>{subscriber.rating}</td>
                          <td>{subscriber.earned}</td>
                          <td>
                            {moment(subscriber.startDate).format('DD MMM ‘YY')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
      </LayoutMain>
    );
  }
}
