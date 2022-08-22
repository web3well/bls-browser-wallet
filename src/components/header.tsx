import React, { useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { NETWORKS } from '../constants';
import logo from '../assets/logo.png';
import { WalletContext } from '../WalletContext';
import { setAccount, setNetwork, useStore } from '../store';

function Header() {
  const { transactionsController } = useContext(WalletContext);
  const network = useStore((state) => state.network);

  const handleChange = async (event: SelectChangeEvent) => {
    setNetwork(event.target.value);
    await transactionsController.updateProvider();
    const address = await transactionsController.getAddress();
    setAccount(address);
  };

  return (
    <div id="header" className="w-full text-white">
      <div className="w-full container mx-auto flex flex-wrap items-center mt-0 py-2">
        <a
          className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="https://blswallet.org/"
        >
          BLS BURNER
        </a>
        <img src={logo} alt="Logo" />
        <div className="ml-auto">
          <FormControl className="ml-auto" variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="network-select">Network</InputLabel>
            <Select
              labelId="network-select"
              id="network-select-id"
              value={network}
              onChange={handleChange}
              label="Network"
            >
              {Object.entries(NETWORKS).map(([name, data]) => (
                <MenuItem value={name} key={name}>{data.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </div>
  );
}

export default Header;
