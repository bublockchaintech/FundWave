import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Communities, Community, Home, PreviousProjects, Projects } from "./pages";
import { Footer, Navbar } from "./sections";
import { providers } from "ethers";
import Web3Modal from "web3modal";

const _communities = [
  {
    approved: true,
    contractAddress: "0x4f54417479A535Ea0091dBb51FB3374892a4B5d0",
    executedProjectCounts: 2,
  },
  {
    approved: true,
    contractAddress: "0xa420bBD1B85787A078C5af0Da37f13e9015445Be",
    executedProjectCounts: 2,
  },
  {
    approved: true,
    contractAddress: "0x9c725aE0EC7f636DbA9489D6EBD3E2a8312b86bB",
    executedProjectCounts: 1,
  },
  {
    approved: false,
    contractAddress: "0x8786Bc4cac71a541A4a7975C483CCeb0211fe0a2",
    executedProjectCounts: 0,
  },
];

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
            communities={communities.length > 0 ? communities : _communities}
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
