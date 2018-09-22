import Document, { Head, Main, NextScript } from 'next/document'
import '../src/utils/fontawesome';

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const { req } = ctx;
    const pathname = req ? req.path : document.location.pathname;

    return {
      ...Document.getInitialProps(ctx),
      routeName: pathname.replace(/\//g, ''),
    };
  }

  render() {
    const { routeName } = this.props;

    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>

        <body className={`page-${routeName}`}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
