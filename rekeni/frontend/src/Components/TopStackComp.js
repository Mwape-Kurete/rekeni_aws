import React from "react";
import placeholderImg from "../Asset/pexels-scenicspire-358690216-28216688.jpg";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";

import "../Styles/ComponentStyles/top-five.css";

function TopStackComp() {
  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col
          xs={12}
          className="mb-4 d-flex justify-content-center align-items-center flex-wrap"
        >
          {/* Card 1 */}
          <div className="card-box">
            <Card
              className="bg-dark text-white top-five-card"
              style={{ width: "10rem" }}
            >
              <Card.Img src={placeholderImg} alt="Card image" />
              <Card.ImgOverlay className="meta-overlay">
                <Card.Title className="top-title">Album Title</Card.Title>
                <Card.Text className="top-details">
                  By: <span className="artist">artist name</span>
                </Card.Text>
                <Card.Text className="top-details">
                  Release Date: <span className="date">date</span>{" "}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>

          {/* Card 2 */}
          <div className="card-box">
            <Card
              className="bg-dark text-white top-five-card"
              style={{ width: "10rem" }}
            >
              <Card.Img src={placeholderImg} alt="Card image" />
              <Card.ImgOverlay className="meta-overlay">
                <Card.Title className="top-title">Album Title</Card.Title>
                <Card.Text className="top-details">
                  By: <span className="artist">artist name</span>
                </Card.Text>
                <Card.Text className="top-details">
                  Release Date: <span className="date">date</span>{" "}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>

          {/* Card 3 */}
          <div className="card-box">
            <Card
              className="bg-dark text-white top-five-card"
              style={{ width: "10rem" }}
            >
              <Card.Img src={placeholderImg} alt="Card image" />
              <Card.ImgOverlay className="meta-overlay">
                <Card.Title className="top-title">Album Title</Card.Title>
                <Card.Text className="top-details">
                  By: <span className="artist">artist name</span>
                </Card.Text>
                <Card.Text className="top-details">
                  Release Date: <span className="date">date</span>{" "}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>

          {/* Card 4 */}
          <div className="card-box">
            <Card
              className="bg-dark text-white top-five-card"
              style={{ width: "10rem" }}
            >
              <Card.Img src={placeholderImg} alt="Card image" />
              <Card.ImgOverlay className="meta-overlay">
                <Card.Title className="top-title">Album Title</Card.Title>
                <Card.Text className="top-details">
                  By: <span className="artist">artist name</span>
                </Card.Text>
                <Card.Text className="top-details">
                  Release Date: <span className="date">date</span>{" "}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>

          {/* Card 5 */}
          <div className="card-box">
            <Card
              className="bg-dark text-white top-five-card"
              style={{ width: "10rem" }}
            >
              <Card.Img src={placeholderImg} alt="Card image" />
              <Card.ImgOverlay className="meta-overlay">
                <Card.Title className="top-title">Album Title</Card.Title>
                <Card.Text className="top-details">
                  By: <span className="artist">artist name</span>
                </Card.Text>
                <Card.Text className="top-details">
                  Release Date: <span className="date">date</span>{" "}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TopStackComp;
