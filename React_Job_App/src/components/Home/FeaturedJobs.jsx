import React from 'react';
import jobsData from './jobs.json';

function FeaturedJobs() {
  return (
    <section className="featured-jobs">
      <h2>Featured Jobs</h2>
      <div className="job-listings">
        {jobsData.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <h4>{job.company} - {job.location}</h4>
            <p>{job.description}</p>
            <ul>
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
            <p>Posted: {job.posted_date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedJobs;
