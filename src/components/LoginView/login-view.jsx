import { React } from 'react';

export const LoginView = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const data = {
      access: username,
      secret: password,
    };

    fetch('https://openlibrary.org/account/login.json', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return (
      <form>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };
};
