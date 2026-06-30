function Card({ children }) {
  return (
    <div className='w-254 rounded-[32px] bg-orange-200 p-4 shadow-xl'>
      {children}
    </div>
  );
}
export default Card;
