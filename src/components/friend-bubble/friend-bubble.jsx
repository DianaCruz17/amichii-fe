function FriendBubble({ friend }) {
  const fullName = `${friend.friendname} ${friend.fatherlastname}`;

  const imageUrl = friend.bubblepic
    ? friend.bubblepic
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.friendname)}+${encodeURIComponent(friend.fatherlastname)}&background=93c5fd&color=ffffff&size=128`;

  return (
    <div
      className='rounded-full w-35 h-35 bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${imageUrl})` }}
      role='img'
      aria-label={fullName}
    ></div>
  );
}

export default FriendBubble;
