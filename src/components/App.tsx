import { Box, Divider, Text } from '@chakra-ui/react';
import useWallet from '../hooks/useWallet';
import Auth from './Auth';
import Market from './Market';
import WalletBalance from './WalletBalance';

function App() {
  const { isSignedIn, signIn, signOut, account, accountId } = useWallet();

  return (
    <Box maxW="768px" mx="auto" py={5}>
      <Box display="flex" justifyContent="space-between" mb={5}>
        {isSignedIn ? (
          <Box>
            <Text>
              Hello, <b>{accountId}</b>
            </Text>
            {!!account && <WalletBalance account={account} />}
          </Box>
        ) : (
          <Box>
            <Text>Please, connect your wallet</Text>
          </Box>
        )}

        <Auth isSignedIn={isSignedIn} onSignIn={signIn} onSighOut={signOut} />
      </Box>

      {isSignedIn && !!account && (
        <>
          <Divider mb={5} />
          <Market account={account} />
        </>
      )}
    </Box>
  );
}

export default App;
