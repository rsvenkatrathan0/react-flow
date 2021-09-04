import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/ex-1">Example 1</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
