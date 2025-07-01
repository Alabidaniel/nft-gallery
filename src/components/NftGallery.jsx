import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';

const NftGallery = () => {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNFTs = async () => {
    if (!address) return;

    setLoading(true);
    const apiKey = import.meta.env.VITE_MORALIS_API_KEY;
    const url =
      'https://deep-index.moralis.io/api/v2.2/' +
      address +
      '/nft?chain=sepolia&format=decimal&normalizeMetadata=true';

    try {
      const response = await axios.get(url, {
        headers: {
          'X-API-Key': apiKey,
        },
      });

      setNfts(response.data.result || []);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchNFTs();
    }
  }, [address, isConnected]);

  return (
    <div className="w-full max-w-5xl">
      {loading && <p className="text-center">Loading NFTs...</p>}
      {!loading && nfts.length === 0 && isConnected && (
        <p className="text-center">No NFTs found for this address.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {nfts.map((nft, index) => (
          <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow">
            <img
              src={nft?.normalized_metadata?.image || 'https://via.placeholder.com/300'}
              alt={nft?.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold truncate">{nft?.name || 'Unnamed NFT'}</h2>
              <p className="text-sm text-gray-400 truncate">{nft?.token_address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftGallery;
