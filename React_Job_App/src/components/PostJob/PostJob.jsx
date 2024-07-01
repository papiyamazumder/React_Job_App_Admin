import React, { useState } from 'react';
import './PostJob.css';

const PostJob = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleToggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className="post-job-container">
      <button className="toggle-button" onClick={handleToggleForm}>
        +
      </button>
      {isFormVisible && (
        <form className="post-job-form">
          <h2>Post a Job</h2>
          <label>
            Job Title:
            <input type="text" name="jobTitle" required />
          </label>
          <label>
            Company:
            <input type="text" name="company" required />
          </label>
          <label>
            Location:
            <input type="text" name="location" required />
          </label>
          <label>
            Job Description:
            <textarea name="jobDescription" required></textarea>
          </label>
          <label>
            Salary:
            <input type="text" name="salary" required />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PostJob;
