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

export default class extends Component {
  render() {
    return (
      <LayoutMain>
        <Meta title="My Insights" />

        <Container>
          <Nav>
            <NavItem>
              <NavLink href="#insights">Insights</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#recommendations">Recommendations</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#reports">Reports</NavLink>
            </NavItem>
          </Nav>
          <a name="#insights" />
          <section>
            <h3>Insights</h3>
            <Table>
              <thead>
                <tr>
                  <th>Your metrics</th>
                  <th>Personalized benchmarks</th>
                  <th>Goal</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>798 steps per day</td>
                  <td>824 steps per day</td>
                  <td>+42 steps per day</td>
                  <td>
                    <a href="#">View reports</a>
                  </td>
                </tr>
                <tr>
                  <td>3.2km distance walked per day</td>
                  <td>4.1km distance walked per day</td>
                  <td>+0.9km distance walked per day</td>
                  <td>
                    <a href="#">View reports</a>
                  </td>
                </tr>
                <tr>
                  <td>7.2 hours per night</td>
                  <td>8 hours per night</td>
                  <td>0.8 hours per night</td>
                  <td>
                    <a href="#">View reports</a>
                  </td>
                </tr>
              </tbody>
            </Table>
          </section>
          <a name="#recommendations" />
          <section>
            <h3>Recommendations</h3>
            <ul>
              <li>
                Based on your age—
                <ul>
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
              <li>
                Based on your genetics—
                <ul>
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
              <li>
                Based on your location—
                <ul>
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
              <li>
                Based on your lifestyle—
                <ul>
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
            </ul>
          </section>
          <a name="#reports" />
          <section>
            <h3>Reports</h3>
            <Card>
              <Table>
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
              </Table>
            </Card>
          </section>
        </Container>
      </LayoutMain>
    );
  }
}
