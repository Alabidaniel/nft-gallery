import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import NftGallery from './components/NftGallery';

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold">NFT Gallery</h1>
      <ConnectButton />
      <NftGallery />
    </div>
  );
}

export default App;
