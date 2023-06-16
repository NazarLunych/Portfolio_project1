import "../styles/app.scss";
import {AppProps} from "next/app";
import {Provider} from "react-redux";
import {store} from "../store";
import Header from "../components/Header/Header";

function MyApp({Component, pageProps}: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
