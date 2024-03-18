import './login.css';
import { fetchData } from './fetch.js';

// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const createUser = document.querySelector('.createuser');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt luodaan käyttäjä');

  const url = 'https://hyte-server-vichy.northeurope.cloudapp.azure.com/api/users';

  const form = document.querySelector('.create_user_form');

  const data = {
    username: form.querySelector('input[name=username]').value,
    password: form.querySelector('input[name=password]').value,
    email: form.querySelector('input[name=email]').value,
  };

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('Database error');
      } else if (response.status === 400) {
        throw new Error('Invalid username/password or email');
        
      }

    }


    const responseData = await response.json();
    console.log(responseData);
    // Handle successful user creation
    alert('User created successfully!');

    //reset fields
    form.querySelector('input[name=username]').value = '';
    form.querySelector('input[name=password]').value = '';
    form.querySelector('input[name=email]').value = '';


  } catch (error) {
    console.error('Error creating user:', error);


    // Show appropriate alert to the user based on the error message
    if (error.message === 'Database error') {
      alert('Database error occurred. Please try again later.');
    } else if (error.message === 'Invalid username/password or email') {
      alert('Invalid username/password or email.');
    } else {
      alert('An unknown error occurred. Please try again later.');
    }
  }
});

// haetaan nappi josta haetaan formi ja logataan sisään
// tästä saadaan TOKEN
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');



  const url = 'https://hyte-server-vichy.northeurope.cloudapp.azure.com/api/auth/login';

  const form = document.querySelector('.login_form');

  const data = {
    username: form.querySelector('input[name=username]').value,
    password: form.querySelector('input[name=password]').value,
  };

  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
    console.log(data.token);
    localStorage.setItem('token', data.token);

    if (data.token == undefined) {
      alert('Invalid password or username!')

      form.querySelector('input[name=username]').value = '';
      form.querySelector('input[name=password]').value = '';
    } else
    alert('Login succesful!')
    localStorage.setItem('name', data.user.username);
    localStorage.setItem('user_level', data.user.user_level);

    window.location.href = 'home.html';
  
    logResponse('loginResponse', `localStorage set with token value: ${data.token}`);
  });
});
