import React, { Component } from 'react';
import { Card, Table, Container, Nav, NavItem, NavLink } from 'reactstrap';
import Meta from '../src/components/Meta';
import LayoutMain from '../src/layouts/main';

export default class extends Component {
  render() {
    return (
      <LayoutMain>
        <Meta title="My Insights" />

        <Container className="my-insights-page">
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
            <h1>Insights</h1>
            <Card>
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
                    <td>
                      <div className="card-number">798</div>
                      <span className="card-number-detail">Steps per day</span>
                    </td>
                    <td>
                      <div className="card-number">798</div>
                      <span className="card-number-detail">Steps per day</span>
                    </td>
                    <td>
                      <div className="card-number">+42</div>
                      <span className="card-number-detail">Steps per day</span>
                    </td>
                    <td>
                      <a href="#"><i className="far fa-file"></i>View reports</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <div className="card-number">3.2km</div>
                    <span className="card-number-detail">Distance walked per day</span>
                     </td>
                    <td>
                    <div className="card-number">4.1km</div>
                    <span className="card-number-detail">Distance walked per day</span>
                    </td>
                    <td>
                    <div className="card-number">+0.9km</div>
                    <span className="card-number-detail">Distance walked per day</span>
                    </td>
                    <td>
                      <a href="#">View reports</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <div className="card-number">7.2hrs</div>
                       sleep per night
                    </td>
                    <td><div className="card-number">8.0hrs</div>
                      <span className="card-number-detail">sleep per night</span>
                     </td>
                    <td><div className="card-number">+0.8hrs</div>
                     per night
                     </td>
                    <td>
                      <a href="#">View reports</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
              </Card>
          </section>
          <a name="#recommendations" />
          <section>
            <h1>Recommendations</h1>
            <Card>
            <ul>
              <li>
                <h4>Based on your 
                  <span class="color-emphasis"> age</span>
                </h4>
                <span className="emphasis">28</span>
                
                <ul className="recommend">
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
              <li>
                <h4>Based on your 
                  <span class="color-emphasis"> genetics</span>
                </h4>
                <span className="emphasis">European, East Asian, Subsaharan African</span>

                <ul className="recommend">
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
              <li>
              <h4>Based on your 
                  <span class="color-emphasis"> location</span>
                </h4>
                <span className="emphasis">London, UK</span>


                <ul className="recommend">
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
              <li>

                <h4>Based on your 
                  <span class="color-emphasis"> gender</span>
                </h4>
                <span className="emphasis">Male</span>


                <ul className="recommend">
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
            </ul>
            </Card>
          </section>
          <a name="#reports" />
          <section>
            <h1>Reports</h1>
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
