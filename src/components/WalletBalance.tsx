import { ConnectedWalletAccount } from 'near-api-js';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

export interface WalletBalanceProps {
  account: ConnectedWalletAccount;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ account }) => {
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);

      try {
        const data = await account.getAccountBalance();
        setBalance(formatNearAmount(data.available, 5));
      } catch (error) {
        setBalance('0');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [account]);

  return (
    <Text>
      Your balance: <b>{isLoading ? 'Loading...' : `${balance} NEAR`}</b>
    </Text>
  );
};

export default WalletBalance;
