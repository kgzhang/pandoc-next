import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { Server, Sheet } from 'styletron-engine-atomic'
import { styletron } from '../lib/styletron'

class MyDocument extends Document<{ stylesheets: Sheet[] }> {
  static getInitialProps(props: any) {
    const page = props.renderPage((App: any) => (props: any) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ))
    const stylesheets = (styletron as Server).getStylesheets() || []
    return { ...page, stylesheets }
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
          <link rel="stylesheet" href="/index.css" />
        </Head>
        <body>
          <Main />
          <NextScript />

          <footer
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: '24px',
              textAlign: 'center',
            }}
          >
            <a
              href="https://beian.miit.gov.cn/"
              style={{
                fontSize: '14px',
                color: '#0085ff',
              }}
            >
              京ICP备19054223号-1
            </a>
          </footer>
        </body>
      </Html>
    )
  }
}

export default MyDocument
