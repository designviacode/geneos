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
              <table>
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
                      <div className="card-number pink-text">+42</div>
                      <span className="card-number-detail">Recommended Steps per day</span>
                    </td>
                    <td>
                    <i className="far fa-file"></i><a href="#" className="standard-link">View reports</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <div className="card-number">3.2km</div>
                    <span className="card-number-detail">Recommended Distance walked per day</span>
                     </td>
                    <td>
                    <div className="card-number">4.1km</div>
                    <span className="card-number-detail">Distance walked per day</span>
                    </td>
                    <td>
                    <div className="card-number pink-text">+0.9km</div>
                    <span className="card-number-detail">Distance walked per day</span>
                    </td>
                    <td>
                      <a href="#" className="standard-link">View reports</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <div className="card-number">7.2hrs</div>
                       Avg Sleep per Night
                    </td>
                    <td><div className="card-number">8.0hrs</div>
                      <span className="card-number-detail">Avg Sleep per Night</span>
                     </td>
                    <td><div className="card-number pink-text">+0.8hrs</div>
                    <span className="card-number-detail">Recommended Sleep per Night</span>
                     </td>
                    <td>
                      <a href="#" className="standard-link">View reports</a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                    <div className="card-number">7.2hrs</div>
                       Avg Sleep per Night
                    </td>
                    <td><div className="card-number">8.0hrs</div>
                      <span className="card-number-detail">Avg Sleep per Night</span>
                     </td>
                    <td><div className="card-number pink-text">+0.8hrs</div>
                    <span className="card-number-detail">Recommended Sleep per Night</span>
                     </td>
                    <td>
                      <a href="#" className="standard-link">View reports</a>
                    </td>
                  </tr>


                </tbody>
              </table>
              </Card>
          </section>
          <a name="#recommendations" />
          <section>
            <h1>Recommendations</h1>
            <Card>
            <ul>
              <li>
                <h4>Based on your 
                  <span className="color-emphasis"> age</span>
                </h4>
                <span className="emphasis">28</span>
                
                <ul className="recommend">
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
              <li>
                <h4>Based on your 
                  <span className="color-emphasis"> genetics</span>
                </h4>
                <span className="emphasis">European, East Asian, Subsaharan African</span>

                <ul className="recommend">
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
              <li>
              <h4>Based on your 
                  <span className="color-emphasis"> location</span>
                </h4>
                <span className="emphasis">London, UK</span>


                <ul className="recommend">
                  <li>You should exercise at least 31 minutes per day</li>
                  <li>You should sleep at least 8 hours per night</li>
                </ul>
              </li>
              <li>

                <h4>Based on your 
                  <span className="color-emphasis"> gender</span>
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
        </Container>
      </LayoutMain>
    );
  }
}
