import { useLoaderData } from 'react-router';
import Badge from '../components/ui/badge';
import { Trash2, Pencil } from 'lucide-react';
import Modal from '../components/ui/modal';
import { useContext } from 'react';
import { friendsContext } from '../context/friends-context';
import NewFriendForm from '../components/new-friend-form';

function FriendPage() {
  let { friend } = useLoaderData();
  const { openModal, mode, deleteFriend } = useContext(friendsContext);

  return (
    <div className='flex h-screen w-full items-center justify-center '>
      <div className='grid h-full w-full gap-8 bg-sky-800 p-2 grid-cols-12 grid-rows-5 rounded-lg shadow-md px-12 py-8'>
        <div className='col-span-3 row-span-1 flex items-center justify-around relative rounded-[35px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
          <p className='flex w-full min-w-0 items-center justify-around gap-2 px-3 text-2xl text-sky-700'>
            <span className='shrink-0'>📱</span>
            <span className='truncate'>{friend.phonenumber}</span>
          </p>
        </div>
        <div className='col-span-3 row-span-1 flex row-start-2 items-center justify-around relative rounded-[35px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
          <p className='flex w-full min-w-0 items-center justify-around gap-2 px-3 text-2xl text-sky-700'>
            <span className='text-auto shrink-0'>🎂 </span>
            {friend.birthday}
          </p>
        </div>

        <div className='col-span-3 row-span-1 col-start-1 row-start-3 flex items-center justify-center relative rounded-[35px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
          <p className='flex w-full items-center justify-around text-2xl  text-sky-700'></p>
        </div>

        <div className='col-span-4 row-span-3 row-start-2 col-start-5 flex items-center justify-center relative rounded-[35px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
          <p className='flex w-full items-center justify-around text-2xl  text-sky-700'>
            {friend.friendname} {friend.fatherlastname} {friend.motherlastname}
          </p>
        </div>

        <div className='col-span-3 row-span-2 col-start-1 row-start-4 flex items-center justify-center relative rounded-[35px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
          <p className='flex w-full items-center justify-around text-2xl  text-sky-700'>
            {friend.horoscopesign}
          </p>
        </div>

        <div className='col-span-3 row-span-2 flex col-start-10 items-center justify-center relative rounded-[35px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
          <p className='flex gap-2 flex-wrap  '>
            {friend.hobbies?.map((hobby, i) => (
              <Badge key={i}>{hobby}</Badge>
            ))}
          </p>
        </div>
        <div className='col-span-3 row-span-2 col-start-10  flex items-center justify-center relative rounded-[35px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
          {' '}
          <p>
            {Object.entries(friend.socialnetworks)?.map(([network, value]) => (
              <Badge key={network}>
                {network}: {value}
              </Badge>
            ))}
          </p>
        </div>
        <div className='col-span-1 col-start-11 row-start-5 flex items-center justify-center hover:text-sky-50 '>
          <Trash2 onClick={() => openModal('delete')} />
        </div>
        <div className='col-span-1 col-start-12 row-start-5 flex items-center justify-center hover:text-sky-50'>
          {' '}
          <Pencil onClick={() => openModal('edit')} />
        </div>
      </div>
      <Modal>
        {mode === 'edit' && <NewFriendForm friendData={friend} />}
        {mode === 'delete' && (
          <button onClick={() => deleteFriend(friend.id)}>Yes</button>
        )}
      </Modal>
    </div>
  );
}

export default FriendPage;
