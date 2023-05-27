import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Communities, Community, Home, PreviousProjects, Projects } from "./pages";
import { Footer, Navbar } from "./sections";
import { providers, Contract } from "ethers";
import Web3Modal from "web3modal";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("");
  const web3ModalRef = useRef();

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, []);

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change network to Mumbai.");
      throw new Error("Change network to Mumbai");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  return (
    <Router>
      <Navbar
        walletConnected={walletConnected}
        setWalletConnected={setWalletConnected}
        getProviderOrSigner={getProviderOrSigner}
        address={address}
        setAddress={setAddress}
      />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/communities/:contractAddress">
          <Community />
        </Route>
        <Route path="/communities">
          <Communities />
        </Route>
        <Route path="/previous-projects">
          <PreviousProjects />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
