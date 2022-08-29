import {
  connect,
  ConnectedWalletAccount,
  keyStores,
  WalletConnection,
} from 'near-api-js';
import { useEffect, useState } from 'react';
import { CONTRACT_ID } from './useContract';

export interface WalletResponse {
  isSignedIn: boolean;
  accountId: string;
  account?: ConnectedWalletAccount;
  signIn: () => void;
  signOut: () => void;
}

const useWallet = (): WalletResponse => {
  const [wallet, setWallet] = useState<WalletConnection | null>();

  useEffect(() => {
    if (!wallet) {
      connectWallet();
    }
  }, [wallet]);

  const connectWallet = async () => {
    const connectionConfig = {
      networkId: 'testnet',
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    };

    const nearConnection = await connect(connectionConfig);
    const walletConnection = new WalletConnection(
      nearConnection,
      'near-wallet-app'
    );

    setWallet(walletConnection);
  };

  const signIn = () => wallet?.requestSignIn({ contractId: CONTRACT_ID });

  const signOut = () => {
    wallet?.signOut();
    setWallet(null);
  };

  return {
    isSignedIn: !!wallet?.isSignedIn(),
    accountId: wallet?.getAccountId(),
    account: wallet?.account(),
    signIn,
    signOut,
  };
};

export default useWallet;
