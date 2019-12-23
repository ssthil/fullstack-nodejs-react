// @ts-ignore
import React, { useState, useEffect } from 'react';
import './App.css';
import { BASE_URL } from './index';
function App() {
  // const [count, setCount] = useState(0);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople();
  }, []);

  async function getPeople() {
    const response = await fetch(`${BASE_URL}`);
    const resData = await response.json();
    setPeople(resData.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Fullstack React Node </h2>
        <div>
          {people.map(person => (
            <div
              // @ts-ignore
              style={styles.container}
              key={person.email}
            >
              <img src={person.picture.medium} alt={person.name.first} />
              <div
                // @ts-ignore
                style={styles.info}
              >
                <p
                  style={styles.title}
                >{`${person.name.first} ${person.name.last}`}</p>
                <p style={styles.email}>{person.email}</p>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

const styles = {
  container: {
    display: 'flex',
    width: '450px',
    flexDirection: 'row',
    border: '1px solid #7a869e',
    marginBottom: '10px',
    padding: '5px',
    background: '#1c1f27',
  },
  info: {
    textAlign: 'left',
    marginLeft: '20px',
  },
  title: {
    fontSize: 18,
  },
  email: {
    fontSize: 15,
  },
};
