import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Communities, Community, Home, PreviousProjects, Projects } from "./pages";
import { Footer, Navbar } from "./sections";
import { providers } from "ethers";
import Web3Modal from "web3modal";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [wallets, setWallets] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [stageProjects, setStageProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);

  const web3ModalRef = useRef();

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [walletConnected]);

  const getProviderOrSigner = async (needSigner = false) => {
    const web3Provider = new providers.Web3Provider(window.ethereum);

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
        web3ModalRef={web3ModalRef}
        setSelectedStage={setSelectedStage}
      />

      <Switch>
        <Route exact path="/">
          <Home getProviderOrSigner={getProviderOrSigner} />
        </Route>
        <Route path="/communities/:contractAddress">
          <Community getProviderOrSigner={getProviderOrSigner} />
        </Route>
        <Route path="/communities">
          <Communities
            getProviderOrSigner={getProviderOrSigner}
            setWallets={setWallets}
            setCommunities={setCommunities}
            communities={communities}
            wallets={wallets}
            address={address}
          />
        </Route>
        <Route path="/previous-projects">
          <PreviousProjects
            projects={allProjects}
            setProjects={setAllProjects}
            getProviderOrSigner={getProviderOrSigner}
            selectedStage={selectedStage}
          />
        </Route>
        <Route path="/projects">
          <Projects
            stageProjects={stageProjects}
            setStageProjects={setStageProjects}
            getProviderOrSigner={getProviderOrSigner}
            address={address}
          />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
