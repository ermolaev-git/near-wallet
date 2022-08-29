import { Button } from '@chakra-ui/react';

export interface AuthProps {
  isSignedIn?: boolean;
  onSignIn: () => void;
  onSighOut: () => void;
}

const Auth: React.FC<AuthProps> = ({ isSignedIn, onSighOut, onSignIn }) => {
  return (
    <Button
      colorScheme="teal"
      onClick={() => (isSignedIn ? onSighOut() : onSignIn())}
    >
      {isSignedIn ? 'Sign out' : 'Sign in'}
    </Button>
  );
};

export default Auth;
