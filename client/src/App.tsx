import { useEffect, useState } from 'react';
import './App.css';
import AddUserForms from './components/AdduserForms';
import UserCard from './components/UserCard';
import User from './domain/User';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
          method: 'GET'
        });
        const { data } = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <section>
        <div className='container'>
          <div className='columns-wrap'>
            <AddUserForms />
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <h1>Here is the list of all the users</h1>
          <div className='columns-wrap'>
            {users.map(user => (
              <UserCard {...user} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
