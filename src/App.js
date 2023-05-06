import React, { useState } from 'react';

import './App.css';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState(true);
  const [noPg, setNoPg] = useState(false);
  const [flagP,setFlagP]= useState(false);
  const [prf,setprf]= useState({"id":1,"firstName":"Terry","lastName":"Medhurst","maidenName":"Smitham","age":50,"gender":"male","email":"atuny0@sohu.com","phone":"+63 791 675 8914","username":"atuny0","password":"9uQFF1Lh","birthDate":"2000-12-25","image":"https://robohash.org/hicveldicta.png","bloodGroup":"A−","height":189,"weight":75.4,"eyeColor":"Green","hair":{"color":"Black","type":"Strands"},"domain":"slashdot.org","ip":"117.29.86.254","address":{"address":"1745 T Street Southeast","city":"Washington","coordinates":{"lat":38.867033,"lng":-76.979235},"postalCode":"20020","state":"DC"},"macAddress":"13:69:BA:56:A3:74","university":"Capitol University","bank":{"cardExpire":"06/22","cardNumber":"50380955204220685","cardType":"maestro","currency":"Peso","iban":"NO17 0695 2754 967"},"company":{"address":{"address":"629 Debbie Drive","city":"Nashville","coordinates":{"lat":36.208114,"lng":-86.58621199999999},"postalCode":"37076","state":"TN"},"department":"Marketing","name":"Blanda-O'Keefe","title":"Help Desk Operator"},"ein":"20-9487066","ssn":"661-64-2976","userAgent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24"});

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setFlag(false);
        setNoPg(false);
        const user = await response.json();
        // TODO: Save user object including token and id in redux state and navigate to profile page
        fetch(`https://dummyjson.com/users/${user.id}`)
        .then((res) => res.json())
        .then((data) => {console.log(data);
        setprf(data);
        setFlagP(true);})
        .catch((err) => console.error(err));
              
        

        console.log(user.id);
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error);
        setNoPg(true);
        setFlag(false);
      }
    } catch (error) {
      
      console.error(error);
      setError('An error occurred while logging in.');
    }
    

  };

  return (
    <div className="App">
       <div style={{display:flag ?"block":"none"}}>
      <h1>Login</h1>
      {error && <div>{error}</div>}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Log In</button>
    </div>

    <div style={{display:noPg ?"block":"none"}}>
        <h1>Invalid username or password</h1>
    </div>

    <div style={{display:flagP ?"block":"none"}}>
    <div><img src={`${prf.image}`}></img></div>
        <p>First Name: {prf.firstName}</p>
        <p>Last Name: {prf.lastName}</p>
        <p>Maiden Name: {prf.maidenName}</p>
        <p>Age: {prf.age}</p>
        <p>Gender: {prf.gender}</p>
        <p>Email: {prf.email}</p>
        <p>Phone: {prf.phone}</p>
        <p>Birthday: {prf.birthDate}</p>
        
        <p>Blood Group: {prf.bloodGroup}</p>
        <p>Height: {prf.height}</p>
        <p>Weight: {prf.weight}</p>
        <p>Eye Color: {prf.eyeColor}</p>
        <p>Hair Color: {prf.hair.color}</p>
        <p>Hair Type: {prf.hair.type}</p>
        <p>Domain:{prf.domain}</p>
        <p>IP Address: {prf.ip}</p>
        <p>Address: {prf.address.address}, {prf.address.city}, {prf.address.state} {prf.address.postalCode}</p>
        <p>Latitude: {prf.address.coordinates.lat}</p>
        <p>Longitude: {prf.address.coordinates.lng}</p>
        <p>MAC Address: {prf.macAddress}</p>
        <p>University: {prf.university}</p>
        <p>Card Expiration Date: {prf.bank.cardExpire}</p>
        <p>Card Number: {prf.bank.cardNumber}</p>
        <p>Card Type: {prf.bank.cardType}</p>
        <p>Currency: {prf.bank.currency}</p>
        <p>IBAN: {prf.bank.iban}</p>
        <p>Company Address: {prf.company.address.address}, {prf.company.address.city}, {prf.company.address.state} {prf.company.address.postalCode}</p>
        <p>Company Department: {prf.company.department}</p>
        <p>Company Name: {prf.company.name}</p>
        <p>Company Title: {prf.company.title}</p>
        <p>EIN: {prf.ein}</p>
        <p>SSN: {prf.ssn}</p>
        <p>User Agent: {prf.userAgent}</p>`
    </div>

   

    </div>
  );
}

export default App;
