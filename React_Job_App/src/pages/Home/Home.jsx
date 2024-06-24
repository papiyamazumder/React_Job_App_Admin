import React from 'react';
import jobsData from '../../Json/jobs.json';
import companiesData from '../../Json/companies.json';
import testimonialsData from '../../Json/testimonials.json';
import './Home.css'; // Import custom CSS for Home page styles
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp, IoPerson } from "react-icons/io5";

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Job Today</h1>
          <p className="hero-description">Explore thousands of job opportunities from top companies.</p>
          <div className="home-hero-buttons">
            <a href="/jobs" className="btn home-btn-primary">Browse Jobs</a>
          </div>
        </div>
      </section>

      <section className="featured-jobs">
        <div className="section-header">
          <h2>Featured Jobs</h2>
        </div>
        <div className="job-listings">
          {jobsData.map((job) => (
            <div key={job.id} className="home-job-card">
              <h4>{job.title}</h4>
              <p style={{fontWeight:"initial"}}>{job.company}</p>
              <p style={{fontWeight:"lighter"}}>{job.location}</p>
              <p>{job.description}</p>
              <p style={{fontWeight:"lighter"}}><p style={{fontWeight:"400"}}>{job.requirements.split(':')[0].trim() + ": "}</p>{job.requirements.split(':')[1].trim()}</p>
              {/* <p>Posted: {job.posted_date}</p> */}
            </div>
          ))}
        </div>
      </section>

      <section className="popular-companies">
        <div className="section-header-top">
          <h2>Top Companies Hiring Now</h2>
        </div>
        <div className="company-logos">
          {companiesData.map((company) => (
            <div key={company.id} className="company-logo">
              <p>{company.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <div className="section-header">
          <h2>Success Stories</h2>
        </div>
        <div className="testimonial-cards">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <p className="testimonial-name"><IoPerson  color='black'  /> {testimonial.name}</p>
              <p className='testimonial-comments'>{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-social">
          <a href="https://facebook.com"><FaFacebookSquare /></a>
          <a href="https://instagram.com"><RiInstagramFill /></a>
          <a href="https://twitter.com"><FaTwitter /></a>
          <a href="https://whatsapp.com"><IoLogoWhatsapp /></a>
          <a href="https://linkedin.com"><FaLinkedin /></a>
        </div>
        <div className="footer-info">
          <p>&copy; 2024 JobPortal. All rights reserved.</p>
        </div>
        <div className="footer-info">
          <p>
            Contact Us: <a href="mailto:contact@jobportal.com" className="footer-contact-link">contact@jobportal.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
