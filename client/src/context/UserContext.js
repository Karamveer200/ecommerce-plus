import { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext();

const UserContextComponent = (props) => {
  const {
    isAuthenticated,
    getIdTokenClaims,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    logout
  } = useAuth0();

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

  return (
    <UserContext.Provider
      value={{
        userData,
        isAuthenticated,
        isLoading,
        getAccessTokenSilently,
        loginWithRedirect,
        logout
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextComponent;
