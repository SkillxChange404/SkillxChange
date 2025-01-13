import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Contact.css";
import logo from './images/skillx.png'; // Assuming you have the logo image

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = (): boolean => {
    const newErrors: Partial<ContactForm> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", form);
      setIsSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="contact-container">
      {/* Logo Section */}
      <div className="header-logo-wrapper">
        <img src={logo} alt="SkillXChange Logo" />
      </div>

      <div className="contact-form-wrapper">
        <h1>Contact Us</h1>
        {isSubmitted && (
          <Alert variant="success">
            Thank you for contacting us! We'll get back to you soon.
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              isInvalid={!!errors.name}
              placeholder="Enter your name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
              placeholder="Enter your email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="message"
              value={form.message}
              onChange={handleInputChange}
              isInvalid={!!errors.message}
              placeholder="Enter your message"
            />
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </div>

      {/* Footer Section */}
      <footer className="contact-footer">
        <div className="footer-content">
          <p>
            We are dedicated to delivering the best solutions for our customers.
            We sincerely appreciate all of our customers. Your feedback and
            support are what make SkillXChange the thriving platform it is today.
            Together, we're building a stronger community. Thank you for being
            part of our journey!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;

