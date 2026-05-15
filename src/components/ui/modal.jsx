import { createPortal } from 'react-dom';
import { CircleX } from 'lucide-react';
import { useContext } from 'react';
import { friendsContext } from '../../context/friends-context';

function Modal({ children }) {
  const { isOpen, closeModal } = useContext(friendsContext);

  if (!isOpen) return null;

  return createPortal(
    <div className='fixed inset-0 bg-zinc-800/10 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='relative p-6 rounded-2xl w-full max-w-3xl mx-auto min-h-80 bg-orange-50/80 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.9px] border border-orange-50/30'>
        <h1 className=' text-sky-600 text-3xl text-center'>Add Friends</h1>
        <CircleX
          onClick={() => closeModal()}
          size={30}
          color='oklch(75% 0.183 55.934)'
          className='ml-auto cursor-pointer hover:stroke-sky-600'
        />
        {children}
      </div>
    </div>,
    document.getElementById('modalPortal'),
  );
}
export default Modal;
