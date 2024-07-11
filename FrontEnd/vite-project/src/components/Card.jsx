import React from 'react'
import {
  Trash
} from "phosphor-react";
import { format } from 'date-fns';


const Card = ({ el, onCardClick }) => {



  const PF = "http://localhost:5001/images/"
  const No_IMG = "https://www.shutterstock.com/image-vector/no-image-available-icon-template-260nw-2153570949.jpg";
  const { heading, discription, image, id, created_at } = el;
  const imageUrl = "https://m.media-amazon.com/images/I/81eSkgnULzL.jpg";



  return (
    <div className="card" onClick={() => onCardClick(id)}>
      <div className="card-image" style={{ backgroundImage: `url(${image !== 'No_IMG' ? PF + image : No_IMG})` }}>
      </div>
      <div className="card-content">
        <h2 className="card-title">{heading}</h2>
        <p className="card-description">{discription}</p>
        <p className='dateandTime'>{format(new Date(created_at), 'MMMM dd, yyyy HH:mm')}</p>
      </div>
    </div>
  )
}

export default Card