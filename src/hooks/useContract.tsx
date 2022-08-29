import { ConnectedWalletAccount, Contract } from 'near-api-js';
import { useEffect, useState } from 'react';
import { MarketItem } from '../components/Market/MarketSelect';
import { MarketTableData } from '../components/Market/MarketTable';

export interface AppContract extends Contract {
  markets?: () => Promise<MarketItem[]>;
  view_market?: (options: { market_id: number }) => Promise<MarketTableData>;
}

export const CONTRACT_ID = 'app_2.spin_swap.testnet';

const useContract = (account: ConnectedWalletAccount): AppContract | null => {
  const [contract, setContract] = useState<AppContract | null>(null);

  useEffect(() => {
    const connectContract = async () => {
      try {
        if (account) {
          const res = await new Contract(account, CONTRACT_ID, {
            viewMethods: ['markets', 'view_market'],
            changeMethods: [],
          });

          setContract(res);
        }
      } catch (error) {
        setContract(null);
      }
    };

    connectContract();
  }, [account]);

  return contract;
};

export default useContract;
