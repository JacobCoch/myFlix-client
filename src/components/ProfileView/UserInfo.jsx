import React from 'react';

import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function UserInfo() {
  const user = useSelector((state) => state.user.user);
  const userBirthday = moment(user.Birthday).format('DD-MM-YYYY');

  return (
    <Row
      className='d-flex flex-column flex-lg-row ms-2 text-lg-center mt-lg-3 mt-3 text-black'
      id='user-info'>
      <Col>
        <span>Username: </span>
        <span className='fw-bolder'>{user.Username}</span>
      </Col>
      <Col>
        <span>Email: </span>
        <span className='fw-bolder'>{user.Email}</span>
      </Col>
      <Col>
        <span>Birthday: </span>
        <span className='fw-bolder'>{userBirthday}</span>
      </Col>
    </Row>
  );
}

export default UserInfo;
