import React from 'react';
import Head from 'next/head'

import '../styles/main.scss'

export default (props) => {
  const { title } = props;

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
    </div>
  );
}
