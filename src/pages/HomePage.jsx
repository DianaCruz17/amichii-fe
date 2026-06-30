import BubbleGrid from '../components/friend-bubble/bubble-container';
import FriendBubble from '../components/friend-bubble/friend-bubble';
import Title from '../components/ui/title';
import { useContext } from 'react';
import { friendsContext } from '../context/friends-context';
import Carrousel from '../components/carrousel';
import Modal from '../components/ui/modal';
import { SmilePlus } from 'lucide-react';
import NewFriendForm from '../components/new-friend-form';
import { NavLink } from 'react-router';
import Card from '../components/ui/card';

function HomePage() {
  const { friends, openModal } = useContext(friendsContext);

  return (
    <div className='min-h-screen bg-orange-200 '>
      <Title text='Amichii' size={4} />

      <div className='p-8'>
        <Card>
          <div className='grid grid-cols-[3fr_1fr] ml-30 mr-20'>
            <BubbleGrid
              items={friends}
              cols={5}
              size={128}
              gap={32}
              renderItem={(item, i) => (
                <NavLink
                  to={`/friends/${item.id}`}
                  className='flex flex-col items-center hover:scale-[1.2] transition-all cursor-pointer'
                >
                  <FriendBubble friend={item} />
                  <span className='text-center text-cyan-700'>
                    {item.friendname} {item.fatherlastname}
                  </span>
                </NavLink>
              )}
            />

            <div className='flex justify-end'>
              <Carrousel />
            </div>
            <SmilePlus
              size={36}
              onClick={() => openModal()}
              className='cursor-pointer hover:text-sky-700 hover:scale-[1.2] transition-all'
            />
          </div>
        </Card>
      </div>
      <Modal>
        <NewFriendForm />
      </Modal>
    </div>
  );
}

export default HomePage;
