function Gridcard({ children }) {
  return (
    <div className='relative p-6 rounded-2xl  bg-orange-50/80 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.9px] border border-orange-50/30'>
      {children}
    </div>
  );
}

export default Gridcard;
