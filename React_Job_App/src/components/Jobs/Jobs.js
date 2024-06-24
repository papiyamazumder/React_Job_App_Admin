import React,{useState} from 'react';
import './Jobs.css';
import JobCard from '../JobCard/jobCard'; 
import { Container, Row, Col } from 'react-bootstrap';
import companyData from "../../company.json"
import SearchJob from '../SearchBar/searchJob';
import { SideBar } from '../Sidebar/sidebar';


function Jobs() {
    const [filteredJobs, setFilteredJobs] = useState(companyData);

    const handleFilter=(selectedValue)=>{
        const filteredJob=companyData.filter((job)=>{
        if (job.jobType === selectedValue ) {
            return true; 
        }
        else if(job.modeOfWork === selectedValue){
            return true;
        }

        
        const [min,max]=selectedValue.split('-').map(s=>parseFloat(s))
        console.log(min,max)
        const [minSalary, maxSalary] = job.salary
        .split('-')
        .map((s) => parseFloat(s.replace(/₹|\s/g, '')));
  
      // Check if either minSalary or maxSalary matches selectedValue
      return (minSalary >= min && maxSalary <= max) ;
    });
        setFilteredJobs(filteredJob)
        
    }
    return (
        <div className='jobs'>
            <br/>
            <div className='search'>
            <SearchJob jobs={companyData} setFilteredJobs={setFilteredJobs} />
            </div>
           <br/>
           <hr/>
           <SideBar handleFilter={handleFilter}/>
           <div className='card-container'>
            <Container >
                <Row xs={1} md={3} className="g-4">
                    {filteredJobs.map(job => (
                        <Col lg={true} key={job.id}>
                            <JobCard job={job} />
                        </Col>
                    ))}
                </Row>
            </Container>
            </div>
        </div>
    );
}

export default Jobs;
