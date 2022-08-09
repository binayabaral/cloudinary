import { useEffect, useState } from 'react';

import User from './domain/User';
import UserCard from './components/UserCard';
import AddUserForm from './components/AddUserForm';

import './App.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [shouldFetchUsers, setShouldFetchUsers] = useState<boolean>(true);

  useEffect(() => {
    if (!shouldFetchUsers) {
      return;
    }

    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
          method: 'GET'
        });
        const { data } = await response.json();
        setUsers(data);
        setShouldFetchUsers(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [shouldFetchUsers]);

  return (
    <>
      <section>
        <div className='container'>
          <div className='columns-wrap'>
            <AddUserForm setShouldFetchUsers={setShouldFetchUsers} />
          </div>
        </div>
      </section>
      {users.length && (
        <section>
          <div className='container'>
            <h1>Here is the list of all the users</h1>
            <div className='columns-wrap'>
              {users.map(user => (
                <UserCard {...user} key={user.id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
