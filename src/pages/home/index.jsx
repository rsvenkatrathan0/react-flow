import React from 'react';
import { Link } from 'react-router-dom';

const examples = [
  { key: 1, path: 'ex-1' },
  { key: 2, path: 'ex-2' },
  { key: 3, path: 'ex-3' },
];

const Home = () => (
  <div>
    <ul>
      {examples.map((ex) => (
        <li key={ex.key}>
          <Link to={`/ex-${ex.key}`}>
            Example
            {' '}
            {ex.key}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Home;
