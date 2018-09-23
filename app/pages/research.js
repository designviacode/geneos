import React, { Component } from 'react'
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import StepZilla from 'react-stepzilla';

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta'
import ProjectDetails from '../src/components/researchSteps/ProjectDetails';
import SampleSelection from '../src/components/researchSteps/SampleSelection';
import Initialize from '../src/components/researchSteps/Initialize';

export default class extends Component {
  static propTypes = {
    data: PropTypes.shape({})
  };

  state = {
    audience: null,
    form: {},
  };

  handleChange = (form) => {
    this.setState({
      form,
    });
  };

  render() {
    const { form } = this.state;

    const steps = [
      { name: <span>Step 1<div className="step-sub">test</div></span>, component: <ProjectDetails data={form} onChange={this.handleChange} /> },
      { name:  <span>Step 2</span>, component: <SampleSelection data={form} onChange={this.handleChange} /> },
      { name:  <span>Step 3</span>, component: <Initialize data={form} /> },
    ];

    return (
      <LayoutMain>
        <Meta title="Research" />

        <Container className="research-page research-wizard">
          <StepZilla
            steps={steps}
            showSteps
            showNavigation={false}
            stepsNavigation={false}
            prevBtnOnLastStep={false}
            preventEnterSubmission
            backButtonText="<- BACK"
            nextButtonText="NEXT ->"
            nextTextOnFinalActionStep="pay and receive data"
          />
        </Container>
      </LayoutMain>
    );
  }
}
