import BubbleGrid from './components/friend-bubble/bubble-container';
import FriendBubble from './components/friend-bubble/friend-bubble';
import Title from './components/ui/title';
import { useState, useEffect } from 'react';

function App() {
  const [friends, setFriends] = useState([]);

  async function fetchAllFriends() {
    const response = await fetch('http://localhost:3000/api/friends');
    const data = await response.json();
    setFriends(data);
  }

  useEffect(() => {
    fetchAllFriends();
  }, []);

  return (
    <>
      <Title text='Amichii' size={4} />
      <div className='p-4'>
        <BubbleGrid
          items={friends}
          cols={5}
          size={128}
          gap={32}
          renderItem={(item, i) => (
            <div className='flex flex-col items-center '>
              <FriendBubble friend={item} />
              <span className='text-center'>
                {' '}
                {item.friendname} {item.fatherlastname}
              </span>
            </div>
          )}
        />
      </div>
    </>
  );
}

export default App;
