import { createContext, useState, useEffect } from 'react';

export const friendsContext = createContext({});

function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([]);

  async function fetchAllFriends() {
    const response = await fetch('http://localhost:3000/api/friends');
    const data = await response.json();
    setFriends(data);
  }

  useEffect(() => {
    fetchAllFriends();
  }, []);

  const valueToShare = { friends };

  return (
    <friendsContext.Provider value={valueToShare}>
      {children}
    </friendsContext.Provider>
  );
}

export default FriendsProvider;
