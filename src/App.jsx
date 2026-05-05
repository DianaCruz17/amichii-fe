import BubbleGrid from './components/friend-bubble/bubble-container';
import FriendBubble from './components/friend-bubble/friend-bubble';
import Title from './components/ui/title';
import { useContext } from 'react';
import { friendsContext } from './context/friends-context';

function App() {
  const { friends } = useContext(friendsContext);
  return (
    <>
      <Title text='Amichii' size={4} />
      <div className='p-8'>
        <BubbleGrid
          items={friends}
          cols={5}
          size={128}
          gap={32}
          renderItem={(item, i) => (
            <div className='flex flex-col items-center hover:scale-[1.2] transition-all cursor-pointer'>
              <FriendBubble friend={item} />
              <span className='text-center'>
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
