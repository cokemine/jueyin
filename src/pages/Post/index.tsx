import React, { FC } from 'react';
import { useLocation } from 'wouter';

const Post:FC = () => {
  const [location, setLocation] = useLocation();
  return (
    <div>
      <h1>
        Layout,
        {location}
      </h1>
    </div>
  );
};
export default Post;
