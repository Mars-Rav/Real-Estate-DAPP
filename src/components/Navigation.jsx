import { ethers } from 'ethers';
import logo from '../assets/logo.svg';

const Navigation = ({ account, setAccount }) => {

    const accountHandler = async () => {
        const accounts = await window.ethereum.request({ "method": "eth_requestAccounts" });
        setAccount(accounts[0]);
    }

    return (
        <nav>
            <ul className='nav__links'>
                <li><a href="/buy">Buy</a></li>
                <li><a href="/rent">Rent</a></li>
                <li><a href="/sell">Sell</a></li>
            </ul>

            <div className='nav__brand'>
                <img src={logo} alt="Logo" />
                <h1>Millow</h1>
            </div>

            {
                account ? (
                    <button
                        type='button'
                        className='nav__connect'
                    >
                        {account.slice(0, 6) + "..." + account.slice(38, 42)}
                    </button>
                ) : (
                    <button
                        type='button'
                        className='nav__connect'
                        onClick={accountHandler}
                    >
                        Connect
                    </button>
                )
            }

        </nav>
    )
}

export default Navigation;