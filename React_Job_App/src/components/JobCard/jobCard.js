import React from 'react';
import'./jobcard.css';
import {MapPinIcon,WalletIcon}from '@heroicons/react/24/solid'
import {Card,CardBody, CardHeader, CardImg, CardSubtitle,  CardTitle,CardText} from 'react-bootstrap'
import { Link } from 'react-router-dom';

function JobCard({ job}) {
  return (
    <div>
    <Card  className='job-card' border='dark' style={{height:'14rem',width:'15rem'}}>
      <CardBody >
      <Link to={`/job/${job.id}`} className="custom-link">
      <CardImg variant='top' src={job.logo} style={{height: '20px', width: 'auto' }} />
      <CardHeader as="h1"> </CardHeader>
      
        <CardText className="card-title">{job.title}</CardText>
        
        <CardText className="card-name">{job.name}</CardText>
        <CardSubtitle  className="mb-2 text-muted ">
          <WalletIcon  color="black" style={{ height: '1.5rem', width: '1.5rem'  }}/>
         <span className="badge rounded-pill job-card-salary">{job.salary}</span>
        </CardSubtitle>
        <CardSubtitle>
          <MapPinIcon style={{height:'1.5rem',width:'1.5rem'}}/>{job.location}
        </CardSubtitle>
        </Link>
      </CardBody>
      
    </Card>
    
    </div>
  );
}
 
export default JobCard;