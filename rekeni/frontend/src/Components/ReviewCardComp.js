import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Services/UserContext";
import "../Styles/ComponentStyles/reviewcard.css";
import placeholderImg from "../Asset/pexels-scenicspire-358690216-28216688.jpg";

function ReviewCardComp({ allReviews }) {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const userId = user?.userId || null;
  const [reviewData, setReviewData] = useState(allReviews);
  const [showModal, setShowModal] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [currentReviewId, setCurrentReviewId] = useState(null);

  useEffect(() => {
    setReviewData(allReviews);
    setLoading(false);
  }, [allReviews]);

  const handleShow = (review) => {
    setEditContent(review.content);
    setEditRating(review.rating);
    setCurrentReviewId(review._id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditContent("");
    setEditRating(0);
    setCurrentReviewId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User not authenticated.");
      return;
    }

    try {
      const reviewData = {
        content: editContent,
        rating: editRating,
        userId,
      };
      await axios.put(`/api/review/${currentReviewId}`, reviewData);
      setReviewData((prevReviews) =>
        prevReviews.map((review) =>
          review._id === currentReviewId
            ? { ...review, content: editContent, rating: editRating }
            : review
        )
      );
      handleClose();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!userId) {
      console.error("User not authenticated.");
      return;
    }

    try {
      await axios.delete(`/api/review/${reviewId}`, {
        data: { userId },
      });
      setReviewData((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleLike = async (reviewId) => {
    if (!userId) {
      console.error("User not authenticated.");
      return;
    }

    try {
      const response = await axios.post(`/api/review/${reviewId}/like`, {
        userId,
      });
      setReviewData((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                likes: response.data.likes,
                likedBy: response.data.likedBy,
              }
            : review
        )
      );
    } catch (error) {
      console.error("Error liking the review: ", error);
    }
  };

  const handleUnlike = async (reviewId) => {
    if (!userId) {
      console.error("User not authenticated.");
      return;
    }

    try {
      const response = await axios.post(`/api/review/${reviewId}/unlike`, {
        userId,
      });
      setReviewData((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                likes: response.data.likes,
                likedBy: response.data.likedBy,
              }
            : review
        )
      );
    } catch (error) {
      console.error("Error unliking the review: ", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-3 load">Loading...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-3 load">
        Please log in to view and manage reviews.
      </p>
    );
  }

  if (!reviewData || reviewData.length === 0) {
    return <p className="text-center mt-3 load-fail">No reviews available.</p>;
  }

  return (
    <>
      {reviewData.map((review) => {
        const userHasLiked = review.likedBy.includes(userId);
        const isProfilePage = location.pathname.includes("profile");

        return (
          <Card
            className="review-card d-flex flex-row mb-3"
            key={review?._id || Math.random()}
          >
            {!location.pathname.includes("singleAlbum") && (
              <Col className="col-6 d-flex align-items-center review-card-img-cont">
                <Card.Img
                  variant="top"
                  src={review?.album?.artworkUrl || placeholderImg}
                  className="review-card-img"
                />
              </Col>
            )}
            <Col
              className={`review-card-body single-content ${
                location.pathname.includes("singleAlbum") ? "col-12" : "col-6"
              } d-flex align-items-center`}
            >
              <Card.Body className="card-body-content-review single-body">
                <Card.Title className="album-title single-title">
                  {review?.album?.title || "Unknown Album"}
                </Card.Title>
                <div className="d-flex align-items-center stars-rating single-rating">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi ${
                        index < (review?.rating || 0)
                          ? "bi-star-fill text-warning"
                          : "bi-star"
                      } rating-stars`}
                    ></i>
                  ))}
                  <span className="ms-2 written-rating">
                    ({review?.rating || 0}/5)
                  </span>
                </div>
                <Card.Text>
                  {review?.content || "No content available"}
                </Card.Text>
                {!isProfilePage && (
                  <Row className="user-information single-userInfo">
                    <Col className="username-handle">
                      <Card.Text>
                        <small>
                          <span>
                            @{review?.user?.username || "Unknown User"}
                          </span>
                        </small>
                      </Card.Text>
                    </Col>
                    <Col className="timestamp-review d-flex justify-content-end">
                      <Card.Text>
                        <small>
                          <span>
                            {new Date(
                              review?.createdAt || Date.now()
                            ).toLocaleString()}
                          </span>
                        </small>
                      </Card.Text>
                    </Col>
                  </Row>
                )}
                {isProfilePage && (
                  <Row className="mt-2">
                    <Col className="d-flex justify-content-end">
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleShow(review)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(review._id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                )}
                <Row className="like-btn single-likes">
                  <Col className="col-12 d-flex justify-content-end">
                    <Button
                      className="like-button"
                      onClick={() =>
                        userHasLiked
                          ? handleUnlike(review._id)
                          : handleLike(review._id)
                      }
                    >
                      <i
                        className={`bi ${
                          userHasLiked
                            ? "bi-heart-fill custom-color"
                            : "bi-heart"
                        }`}
                      ></i>
                    </Button>
                    <p className="no-likes py-1">
                      <span>{review?.likes || 0}</span> Likes
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Card>
        );
      })}

      {/* Review Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                max={5}
                min={1}
                value={editRating}
                onChange={(e) => setEditRating(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="commentBox" className="mt-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Edit your review..."
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="mt-2 text-center">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReviewCardComp;
