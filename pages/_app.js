
import '../styles/global.css' //import the stylesheet from global.css

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}