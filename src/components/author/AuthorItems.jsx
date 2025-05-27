


import React, { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import axios from 'axios';
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";




const AuthorItems = () => {
 const SkeletonLoader = ({ count = 8 }) => {
 return (
   <>
     {Array(count).fill(0).map((_, index) => (
       <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
         <div
           className="item"
           style={{
             position: 'relative',
             padding: '20px',
             border: '1px solid #ddd',
             borderRadius: '15px',
             backgroundColor: '#fff',
             height: '100%',
             minHeight: '400px'
           }}
         >
           <div
             style={{
               backgroundColor: "#e0e0e0",
               width: '50px',
               height: '50px',
               borderRadius: '50%',
               opacity: 0.6,
               position: 'absolute',
               top: '20px',
               left: '20px'
             }}
           />
           <div
             style={{
               backgroundColor: "#e0e0e0",
               width: '80px',
               height: '30px',
               borderRadius: '30px',
               opacity: 0.6,
               position: 'absolute',
               top: '20px',
               right: '20px'
             }}
           />
           <div
             style={{
               backgroundColor: "#e0e0e0",
               width: '100%',
               height: '200px',
               marginTop: '70px',
               borderRadius: '10px',
               opacity: 0.6
             }}
           />
           <div
             style={{
               backgroundColor: "#e0e0e0",
               height: '20px',
               width: '60%',
               margin: '20px auto 10px',
               borderRadius: '4px',
               opacity: 0.6
             }}
           />
           <div
             style={{
               display: 'flex',
               justifyContent: 'space-between',
               padding: '0 10px'
             }}
           >
             <div
               style={{
                 backgroundColor: "#e0e0e0",
                 height: '15px',
                 width: '40%',
                 borderRadius: '4px',
                 opacity: 0.6
               }}
             />
             <div
               style={{
                 backgroundColor: "#e0e0e0",
                 height: '15px',
                 width: '20%',
                 borderRadius: '4px',
                 opacity: 0.6
               }}
             />
           </div>
         </div>
       </div>
     ))}
   </>
 );
};
  const { authorId } = useParams();
const [items, setItems] = useState(null);




useEffect(() =>{
  axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
  .then(response => {
   setItems(response.data);
 })
}, [authorId]);
    


if (!items) {
 return (
   <div className="de_tab_content">
     <div className="tab-1">
       <div className="row">
         <SkeletonLoader />
       </div>
     </div>
   </div>
 );
}
if (!Array.isArray(items.nftCollection) || items.nftCollection.length === 0) {return <p>No nftcollection found.</p>;
}


return (
  <div className="de_tab_content">
    <div className="tab-1">
      <div className="row">
      {items.nftCollection.map((item) => (
          <div key={item.id}className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to="">
                  <img className="lazy" src={items.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{items.authorName}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
      ))}
      </div>
    </div>
  </div>
);
};
export default AuthorItems;
