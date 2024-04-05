import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useUser = () => {
  const { isAuthenticated, getIdTokenClaims, isLoading, getAccessTokenSilently } = useAuth0();

  const [userData, setUserData] = useState();

  useEffect(() => {
    const decodeUserId = async () => {
      try {
        const payload = await getIdTokenClaims();

        setUserData({ ...payload });
      } catch (error) {
        console.log(error);
      }
    };

    isAuthenticated && decodeUserId();
  }, [isAuthenticated]);

  return { userData, isAuthenticated, isLoading, getAccessTokenSilently };
};

export default useUser;
