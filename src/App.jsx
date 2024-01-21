import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Cards from './components/Cards';
import Home from './components/Home';

// ABIs
import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

// Config
import config from './config.json';

function App() {

  const [provider, setProvider] = useState(null);
  const [escrow, setEscrow] = useState(null);
  const [account, setAccount] = useState(null);
  const [homes, setHomes] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();

      const realEstateAddress = config[network.chainId].realEstate.address
      const escrowAddress = config[network.chainId].escrow.address
      
      const realEstate = new ethers.Contract(realEstateAddress, RealEstate, provider);
      const escrow = new ethers.Contract(escrowAddress, Escrow, provider);

      const totalSupply = await realEstate.totalSupply(); // Number of homes
      setEscrow(escrow);

      const homes = [];

      for (let i = 1; i <= totalSupply; i++){
        const uri = await realEstate.tokenURI(i);
        const response = await fetch(uri);
        const metadata = await response.json();
        homes.push(metadata);
      }
      setHomes(homes);

      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({ "method": "eth_requestAccounts" });
        const account = accounts[0];
        setAccount(account);
      })
    }

    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <Search />

      <div className='cards__section'>
        <h3>Homes... For you.</h3>

        <hr />

        <Cards homes={homes} />
      </div>
    </div>
  );
}

export default App;
