import React from 'react';
import Head from 'next/head';
import '../styles/main.scss';
import AOS from 'aos';

class Meta extends React.Component {
  componentDidMount() {
    AOS.init();
  }

  componentWillReceiveProps() {
    AOS.refresh();
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
      </div>
    );
  }
}

export default Meta;
