import { Card } from 'react-bootstrap';

export const UserInfo = ({ user }) => {
  return (
    <>
      <h1>User Info</h1>
      <Card className="user-info-card">
        <Card.Body>
          <Card.Title>Current User Info</Card.Title>
          <Card.Text>
            <span>Your name: {user.Username}</span>
            <br />
            <span>Your email: {user.Email}</span>
            <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
