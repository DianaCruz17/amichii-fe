import { useLoaderData } from 'react-router';

function FriendPage() {
  let data = useLoaderData();

  return <div>FriendPage - {JSON.stringify(data)}</div>;
}

export default FriendPage;
