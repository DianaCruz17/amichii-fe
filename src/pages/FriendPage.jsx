import { useLoaderData } from 'react-router';
import Badge from '../components/ui/badge';
import { Trash2, Pencil } from 'lucide-react';
import Modal from '../components/ui/modal';
import { useContext } from 'react';
import { friendsContext } from '../context/friends-context';
import NewFriendForm from '../components/new-friend-form';
import FriendBubble from '../components/friend-bubble/friend-bubble';
import {
  Heart,
  BellRing,
  ContactRound,
  Cake,
  Smartphone,
  ZodiacOphiuchus,
} from 'lucide-react';

function FriendPage() {
  let { friend } = useLoaderData();
  const { openModal, mode, deleteFriend, closeModal } =
    useContext(friendsContext);

  return (
    <div className='flex h-screen w-full items-center justify-center '>
      <div className='grid h-full w-full gap-8 bg-sky-100 p-2 grid-cols-12 grid-rows-6 rounded-lg shadow-md px-12 py-8'>
        <div className=' col-span-12 text-3xl text-blue-50 justify-center text-center items-center'>
          {' '}
          <h>FRIEND PAGE</h>
        </div>
        <div className='col-span-4 row-span-2 row-start-2 col-start-3 items-center justify-center relative rounded-[15px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0] grid grid-rows-2'>
          <section className='mt-15'>
            {' '}
            <FriendBubble friend={friend} />
          </section>
          <p className='flex w-full items-center  text-xl  text-sky-700'>
            {friend.friendname} {friend.fatherlastname} {friend.motherlastname}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 col-span-4 row-span-2 row-start-4 col-start-3 items-center relative rounded-[15px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0] p-6'>
          <span className='flex items-center justify-end gap-2 text-sky-400'>
            <Cake size={16} />
            Birthday
          </span>
          <span className='text-left text-sky-700'>{friend.birthday}</span>
          <span className='flex items-center justify-end gap-2 text-sky-400'>
            <Smartphone size={16} /> Phone Number{' '}
          </span>
          <span className='text-left text-sky-700 truncate'>
            {friend.phonenumber}
          </span>
          <span className='flex items-center justify-end gap-2 text-sky-400'>
            {' '}
            <ZodiacOphiuchus size={16} /> Horoscope sign
          </span>
          <span className='text-left text-sky-700'>{friend.horoscopesign}</span>
        </div>
        <div className='col-span-4 col-start-7 row-start-2 flex flex-col items-start justify-center gap-2 relative rounded-[15px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0] p-5'>
          <p className='flex items-center gap-2 text-sky-700'>
            <BellRing size={16} />
            Last Contact
          </p>
          <p className='font-medium text-sm text-gray-800'>
            Days ago ¡contact your friend!
          </p>
        </div>

        <div className='col-span-4 col-start-7 row-start-3 row-span-2 flex flex-col gap-3 relative rounded-[15px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0] p-5'>
          <p className='font-medium text-sm flex items-center gap-1.5 text-sky-700'>
            <Heart size={16} />
            Hobbies
          </p>
          <div className='flex gap-2 flex-wrap'>
            {friend.hobbies?.map((hobby, i) => (
              <Badge
                key={i}
                className='bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-md font-normal'
              >
                {hobby}
              </Badge>
            ))}
          </div>
        </div>
        <div className='col-span-4 row-span-1 col-start-7 row-start-5 flex items-center justify-center relative rounded-[15px] bg-[#ffffff] shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
          {' '}
          <p className='flex items-center gap-2 text-sky-700'>
            <ContactRound size={16} />
            SocialNetworks
          </p>
          <p>
            {Object.entries(friend.socialnetworks)?.map(([network, value]) => (
              <Badge key={network}>
                {network}: {value}
              </Badge>
            ))}
          </p>
        </div>

        <div className='col-span-1 col-start-8 row-start-6 flex items-center justify-center hover:text-sky-50 cursor-pointer'>
          <Trash2 onClick={() => openModal('delete')} />
        </div>
        <div className='col-span-1 col-start-9 row-start-6 flex items-center justify-center hover:text-sky-50 cursor-pointer'>
          {' '}
          <Pencil onClick={() => openModal('edit')} />
        </div>
      </div>
      <Modal>
        {mode === 'edit' && <NewFriendForm friendData={friend} />}
        {mode === 'delete' && (
          <div className='grid grid-cols-2 justify-items-center h-50  content-center'>
            <button
              className='border-amber-600 w-30 rounded-2xl bg-orange-300 h-10 hover:bg-amber-600 cursor-pointer'
              onClick={() => deleteFriend(friend.id)}
            >
              Yes
            </button>
            <button
              className='border-amber-600 w-30 rounded-2xl bg-orange-300 h-10 hover:bg-amber-600 cursor-pointer '
              onClick={() => closeModal()}
            >
              No{' '}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FriendPage;
