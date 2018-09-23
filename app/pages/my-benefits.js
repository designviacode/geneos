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
import moment from 'moment';

import LayoutMain from '../src/layouts/main';

const data = {
  earnings: [
    { id: 1, name: 'Today', amount: '$12.81', eosAmount: '2.17', delay: 0 },
    {
      id: 2,
      name: 'This Month',
      amount: '$81.11',
      eosAmount: '4.17',
      delay: 100
    },
    {
      id: 3,
      name: 'This Year',
      amount: '$482.81',
      eosAmount: '6.17',
      delay: 200
    }
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
                <Col data-aos="fade-up" data-aos-delay={item.delay}>
                  <Card key={item.id}>
                    <CardBody>
                      <h4>{item.name}</h4>
                      <span class="card-number">{item.amount}</span>
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
            <div className="card">
              <Row className="justify-content-between">
                <Col lg="4">
                  <img src="/static/data-usage.svg" />
                  <div className="legend-table">
                    <div>
                      <div className="card-number teal-bullet">52.4%</div>
                      <div>Cancer</div>
                    </div>
                    <hr />
                    <div>
                      <div className="card-number purple-bullet">16.4%</div>
                      <div>Diabetes</div>
                    </div>
                    <hr />
                    <div>
                      <div className="card-number orange-bullet">31.2%</div>
                      <div>Arthritis</div>
                    </div>
                  </div>
                </Col>
                <Col lg="7">
                  <Card>
                    <CardHeader>Data Sold To</CardHeader>
                    <table>
                      <thead>
                        <tr>
                          <th>Subscriber</th>
                          <th>Contract Name</th>
                          <th>Duration</th>
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
                              {moment(subscriber.startDate).format(
                                'DD MMM ‘YY'
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </Col>
              </Row>
            </div>
          </section>
        </Container>
      </LayoutMain>
    );
  }
}
