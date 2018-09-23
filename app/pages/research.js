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
    form: {
      researchName: 'NYU Oncology Department',
      researchArea: 'Cancer',
      duration: '1 Month',
      ageRange: [1, 100],
      weightRange: [1, 300],
      sleepRange: [0, 10],
      activityRange: [0, 10],
    },
  };

  handleChange = (form) => {
    this.setState({
      form,
    });
  };

  render() {
    const { form } = this.state;

    const steps = [
      { name: <div className="step-head">Step 1<div className="step-sub">Project Details</div></div>, component: <ProjectDetails data={form} onChange={this.handleChange} /> },
      { name:  <div className="step-head">Step 2<div className="step-sub">Sample Selection</div></div>, component: <SampleSelection data={form} onChange={this.handleChange} /> },
      { name:  <div className="step-head">Step 3<div className="step-sub">Initialize</div></div>, component: <Initialize data={form} /> },
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
