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
import moment from 'moment';

import Meta from '../src/components/Meta';
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
      rating: '3 Months',
      earned: '25 EOS',
      startDate: '2018-09-22T18:11:42Z',
      delay: 300 
    },{
      name: 'NYU',
      purpose: 'Lung cancer research',
      rating: 71,
      earned: 3.4,
      startDate: '2018-09-22T18:11:42Z',
    },{
      name: 'NYU',
      purpose: 'Lung cancer research',
      rating: 71,
      earned: 3.4,
      startDate: '2018-09-22T18:11:42Z',
    },{
      name: 'NYU',
      purpose: 'Lung cancer research',
      rating: 71,
      earned: 3.4,
      startDate: '2018-09-22T18:11:42Z',
    },{
      name: 'NYU',
      purpose: 'Lung cancer research',
      rating: 71,
      earned: 3.4,
      startDate: '2018-09-22T18:11:42Z',
    },{
      name: 'NYU',
      purpose: 'Lung cancer research',
      rating: 71,
      earned: 3.4,
      startDate: '2018-09-22T18:11:42Z',
    },{
      name: 'NYU',
      purpose: 'Lung cancer research',
      rating: 71,
      earned: 3.4,
      startDate: '2018-09-22T18:11:42Z',
    },{
      name: 'NYU',
      purpose: 'Lung cancer research',
      rating: 71,
      earned: 3.4,
      startDate: '2018-09-22T18:11:42Z',
    },
    {
      name: 'Johns Hopkins',
      purpose: 'Atrial fibrillation research',
      rating: 43,
      earned: 4.1,
      startDate: '2018-09-22T18:11:42Z',
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
            <a name="#reports" />
            <h1>Reports</h1>
            <Card>
              <table>
                <thead>
                <tr>
                  <th>Researcher</th>
                  <th>Subject</th>
                  <th>Release date</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>NYU</td>
                  <td>Diabetes Prevention</td>
                  <td>Sept 24, 2018</td>
                  <td>
                    <a href="#">View</a> | <a href="#">Share</a>
                  </td>
                </tr>
                <tr>
                  <td>NYU</td>
                  <td>Cancer Research Report</td>
                  <td>Sept 24, 2018</td>
                  <td>
                    <a href="#">View</a> | <a href="#">Share</a>
                  </td>
                </tr>
                <tr>
                  <td>NYU</td>
                  <td>Heart Disease Report</td>
                  <td>Sept 24, 2018</td>
                  <td>
                    <a href="#">View</a> | <a href="#">Share</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </Card>
          </section>
          <hr />
          <section>
            <a name="#usage" />
            <h1>Data Usage</h1>
            <div className="card" data-aos="fade-up" data-aos-delay="600">
              <Row className="justify-content-between">
                <Col lg="3">
                  <img src="/static/data-usage.svg" width="300" />
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
                <Col lg="8">
                  <Card data-aos="fade-up" data-aos-delay="700">
                    <CardHeader>Data Sold To</CardHeader>
                    <table>
                      <thead>
                        <tr>
                          <th>Subscriber</th>
                          <th>Project</th>
                          <th>Duration</th>
                          <th>Earned</th>
                          <th>Start date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.subscribers.map((subscriber, index) => (
                          <tr key={index}>
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
