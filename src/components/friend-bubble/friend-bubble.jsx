function FriendBubble({ friend }) {
  const bgImage = {
    hasImage: `rounded-full p-18 w-20 h-20 hover:scale-[1.2] transition-all bg-[${friend.bubblepic}]`,
    noImage: `rounded-full p-18 w-20 h-20 hover:scale-[1.2] transition-all bg-cover bg-center bg-no-repeat`,
  };

  const classesToApply = bgImage[friend.bubblepic ? 'hasImage' : 'noImage'];

  return (
    <>
      <div
        className={classesToApply}
        style={{
          backgroundImage: `url(https://ui-avatars.com/api/?name=${friend.friendname}+${friend.fatherlastname})`,
        }}
      ></div>
    </>
  );
}
export default FriendBubble;
