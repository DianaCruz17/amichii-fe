import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const friendsContext = createContext({});

function FriendsProvider({ children }) {
  // state (VARIABLES)
  const [friends, setFriends] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('create');

  // use effect
  useEffect(() => {
    fetchAllFriends();
  }, []);

  // functions
  async function fetchAllFriends() {
    const response = await fetch('http://localhost:3000/api/friends');
    const data = await response.json();
    setFriends(data);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(mode = 'create') {
    setMode(mode);
    setIsOpen(true);
  }

  async function deleteFriend(id) {
    const response = await fetch('http://localhost:3000/api/friends/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }

  const valueToShare = {
    friends,
    closeModal,
    isOpen,
    openModal,
    fetchAllFriends,
    mode,
    deleteFriend,
  };

  return (
    <friendsContext.Provider value={valueToShare}>
      {children}
    </friendsContext.Provider>
  );
}

export default FriendsProvider;
