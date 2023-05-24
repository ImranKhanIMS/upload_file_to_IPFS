import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {

  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Component {...pageProps} /> <br /> <br /> <br />

      {/* React Method of using component */}
      {/* <Home />  <br /> <br />  */}

    </ThirdwebProvider>
  );
}

export default MyApp;
