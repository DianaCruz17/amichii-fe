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

  const formatDateFromTimestamp = (lastcontact) => {
    if (!lastcontact) return 'No date';
    const date = new Date(lastcontact);

    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  function ChangeColorAlert() {}

  return (
    <div className='min-h-screen w-full bg-sky-100 px-4 py-6 flex items-start justify-center'>
      <div className='w-full max-w-7xl rounded-[32px] bg-sky-100 p-4 shadow-md sm:p-8'>
        <div className='grid gap-6'>
          <div className='text-center text-3xl font-semibold text-sky-400'>
            FRIEND PAGE
          </div>

          <div className='grid gap-6 lg:grid-cols-[280px_1fr]'>
            <div className='rounded-[15px] bg-white p-6 shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
              <div className='flex flex-col items-center justify-center gap-4 text-center'>
                <FriendBubble friend={friend} />
                <p className='text-xl font-medium text-sky-700'>
                  {friend.friendname} {friend.fatherlastname}{' '}
                  {friend.motherlastname}
                </p>
              </div>
            </div>

            <div className='grid gap-6 col start'>
              <div className='grid gap-6 md:grid-cols-2'>
                <div className='grid grid-cols-1 gap-4 rounded-[15px] bg-white p-6 shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
                  <div className='flex items-center justify-between gap-2 text-sky-400'>
                    <span className='flex items-center gap-2'>
                      <Cake size={16} />
                      Birthday
                    </span>
                    <span className='text-sky-700'>{friend.birthday}</span>
                  </div>
                  <div className='flex items-center justify-between gap-2 text-sky-400'>
                    <span className='flex items-center gap-2'>
                      <Smartphone size={16} /> Phone
                    </span>
                    <span className='text-sky-700 break-all'>
                      {friend.phonenumber}
                    </span>
                  </div>
                  <div className='flex items-center justify-between gap-2 text-sky-400'>
                    <span className='flex items-center gap-2'>
                      <ZodiacOphiuchus size={16} /> Horoscope
                    </span>
                    <span className='text-sky-700'>{friend.horoscopesign}</span>
                  </div>
                </div>

                <div className='rounded-[15px] bg-white p-5 shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
                  <p className='mb-3 flex items-center gap-1.5 text-sm font-medium text-sky-700'>
                    <Heart size={16} /> Hobbies
                  </p>
                  <div className='flex flex-wrap gap-2'>
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
              </div>

              <div className='grid gap-6 md:grid-cols-2'>
                <div className='rounded-[15px] bg-white p-5 shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
                  <p className='mb-3 flex flex-wrap items-center gap-2 text-sky-700'>
                    Notes
                  </p>
                  <p className='text-sm leading-6 text-slate-700'>
                    {friend.notes ? friend.notes : 'No notes available.'}
                  </p>
                </div>

                <div className='rounded-[15px] bg-white p-5 shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0]'>
                  <p className='mb-3 flex flex-wrap items-center gap-2 text-sky-700'>
                    <ContactRound size={16} /> Social Networks
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {Object.entries(friend.socialnetworks || {}).map(
                      ([network, value]) => (
                        <Badge
                          key={network}
                          className='bg-slate-100 text-slate-700'
                        >
                          {network}: {value}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='rounded-[15px] bg-white p-5 shadow-[inset_5px_5px_10px_#f2e7da,inset_-5px_-5px_10px_#fffff0] w-70 mr-auto'>
            <div className='flex flex-col gap-4 '>
              <div className='items-center grid grid-rows-2 gap-2 text-sky-700 '>
                <span className='flex items-center gap-2'>
                  <BellRing size={16} /> Last Contact
                </span>
                <span>{formatDateFromTimestamp(friend.lastcontact)}</span>
              </div>
              <p className='text-sm font-medium text-gray-800'>
                Days ago ¡contact your friend!
              </p>
              <button className='mt-2 inline-flex items-center justify-center rounded-lg bg-orange-200 px-4 py-2 text-sm text-sky-700 transition hover:bg-orange-300'>
                Call
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-wrap items-center justify-center gap-2 text-sky-700'></div>
            <div className='flex flex-wrap justify-center gap-3'>
              <button
                className='inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sky-700 shadow-sm transition hover:bg-orange-100'
                onClick={() => openModal('delete')}
              >
                <Trash2 className='mr-2' /> Delete
              </button>
              <button
                className='inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sky-700 shadow-sm transition hover:bg-orange-100'
                onClick={() => openModal('edit')}
              >
                <Pencil className='mr-2' /> Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal>
        {mode === 'edit' && <NewFriendForm friendData={friend} />}
        {mode === 'delete' && (
          <div className='grid grid-cols-2 justify-items-center h-50 content-center gap-4'>
            <button
              className='w-30 rounded-2xl bg-orange-300 px-4 py-2 text-slate-800 transition hover:bg-amber-600'
              onClick={() => deleteFriend(friend.id)}
            >
              Yes
            </button>
            <button
              className='w-30 rounded-2xl bg-orange-300 px-4 py-2 text-slate-800 transition hover:bg-amber-600'
              onClick={() => closeModal()}
            >
              No
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FriendPage;
