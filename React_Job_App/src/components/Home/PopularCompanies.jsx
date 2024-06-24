import React from 'react';
import companiesData from './companies.json';

function PopularCompanies() {
  return (
    <section className="popular-companies">
      <h2>Top Companies Hiring Now</h2>
      <div className="company-logos">
        {companiesData.map((company) => (
          <div key={company.id} className="company-logo">
            <img src={company.logo} alt={company.name} />
            <p>{company.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularCompanies;
