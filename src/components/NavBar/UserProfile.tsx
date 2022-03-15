import React from 'react';
import Image from 'next/image';
import { MeQuery } from '../../generated/graphql';

interface UserProfileProps {
  className?: string;
  user: MeQuery | undefined;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, className }) => {
  if (!user) {
    return null;
  }

  return (
    <div className={`${className ? className : ''}`}>
      {/* <div className=""><Image src="" layout="fill" alt={user.me?.username} /></div> */}
      <p>{user.me?.username}</p>
    </div>
  );
};

export default UserProfile;
