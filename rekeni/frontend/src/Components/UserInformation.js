import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../Services/UserContext";
import "../Styles/ComponentStyles/userInfo.css";
import axios from "axios";

function UserInformation() {
  const { user } = useContext(UserContext);
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/auth/${user.userId}`);
        setFetchedUser(response.data);
        setLoading(false); // Update loading state here
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setLoading(false);
      }
    };

    if (user && user.userId) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row className="pfp-name d-flex justify-content-center align-items-center text-center">
        <Col xs={4} className="user-info ">
          <h2 className="username d-flex justify-content-center align-items-center text-center">
            @<span>{fetchedUser.username}</span>
          </h2>
          <p className="bio">{fetchedUser.bio}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default UserInformation;
