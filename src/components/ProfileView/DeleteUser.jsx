import React from 'react';

import { Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function DeleteUser() {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token); // ? maybe localStorage.getItem('token') instead?
  const handleDeregister = () => {
    const userWarning = confirm(
      'Are you sure you want to delete your account?'
    );

    userWarning === false
      ? alert('Your account was not deleted.')
      : fetch(`https://mymovieapidb.herokuapp.com/users/${username}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              alert('Your account has been deleted.');
              localStorage.clear();
              window.location.reload();
            } else {
              alert('Your account could not be deleted.');
            }
          })
          .catch((e) => `Error: ${e}`);
  };

  return (
    <Col className='text-end'>
      <div>
        <Button
          className='delete-user-btn mt-3'
          onClick={() => handleDeregister(user._id)}
          variant='danger'>
          Delete Account
        </Button>
      </div>
    </Col>
  );
}

export default DeleteUser;
