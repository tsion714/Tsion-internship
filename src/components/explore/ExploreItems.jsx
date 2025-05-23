import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";




const ExploreItems = () => {

 const [items, setItems] = useState([]);
 const [countdowns, setCountdowns] = useState([]);
 const [visibleCount, setVisibleCount] = useState(8);
 const [filterValue, setFilterValue] = useState(""); 

 const handleLoadMore = () => {
   setVisibleCount((prevCount) =>  Math.min(prevCount + 4, items.length));
 };


const visibleItems = items.slice(0, visibleCount);
const hasMore = visibleCount < items.length;


 useEffect(()=>{
   axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`)
   .then(response => {
     setItems(response.data);
   })
 },[filterValue]);


 useEffect(() => {
   const interval = setInterval(() => {
     const updated = items.map((item) => {
       if (!item.expiryDate) return null;
       const distance = item.expiryDate * 1000 - Date.now();
       const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
       const m = Math.floor((distance / (1000 * 60)) % 60);
       const s = Math.floor((distance / 1000) % 60);
       return distance > 0 ? { h, m, s } : { h: 0, m: 0, s: 0 };
     });
     setCountdowns(updated);
   }, 1000);
    return () => clearInterval(interval);
 }, [items]);



 const SkeletonLoader = ({ count = 4 }) => (
   Array(count).fill().map((_, index) => (
       <div
       key={index}
     className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div
         className="item"
         style={{
           position: 'relative',
           padding: '20px',
           border: '1px solid #ddd',
           borderRadius: '15px',
           backgroundColor: '#fff',
           height: '100%',
         }}>
       <div
             className="author_list_pp"
             style={{  
              backgroundColor: "#e0e0e0",
              width: '50px',
              height: '50px',
              position: 'absolute',
              borderRadius: '50%',
             opacity: 0.6
             }}
           />
       <div
             className="de_countdown"
             style={{  
              backgroundColor: "#e0e0e0",
              width: '80px',
              height: '30px',
              position: 'absolute',
              borderRadius: '30px',
              right: '20px',
             opacity: 0.6
             }}
           />
       <div
             className="nft__item_wrap"
             style={{  
               backgroundColor: "#e0e0e0",
               height: "350px",
               borderRadius: "8px",
               marginBottom: "10px",
               width: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               position: 'relative',
               opacity: 0.6,
             }}
           />
           <div
               className="nft__item_info"
               style={{
                 backgroundColor: "#e0e0e0",
                 height: "20px",
                 width: "190px",
                 borderRadius: "4px",
                 marginBottom: '10px',
                 opacity: 0.6,
               }}
            />
            </div>
           </div>
              ))
             );        

const handleFilterChange = (e) => {
 setFilterValue(e.target.value);
  };

 return (
   <>
     <div>
       <select 
         id="filter-items"
         value={filterValue}
         onChange={handleFilterChange} >
         <option value="">Default</option>
         <option value="price_low_to_high">Price, Low to High</option>
         <option value="price_high_to_low">Price, High to Low</option>
         <option value="likes_high_to_low">Most liked</option>
       </select>
     </div>
     {items.length === 0 ? (
          <SkeletonLoader count={visibleCount} />
           ) : (visibleItems.map((item, index)=>(
       <div
         key={index}
         className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
         style={{ display: "block", backgroundSize: "cover" }}
       >
         <div className="nft__item">
         <div className="author_list_pp">
            <Link
              to={`/author/${item.authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
               <img className="lazy" src={item.authorImage} alt="" />
               <i className="fa fa-check"></i>
             </Link>
           </div>
           <div className="de_countdown"> {item.expiryDate && countdowns[index]
                 ? (`${countdowns[index]?.h}h ${countdowns[index]?.m}m ${countdowns[index]?.s}s`)
                    : null}
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
               <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
             </Link>
           </div>
           <div className="nft__item_info">
             <Link to="/item-details">
               <h4>{item.title}</h4>
             </Link>
             <div className="nft__item_price">{item.price} ETH</div>
             <div className="nft__item_like">
               <i className="fa fa-heart"></i>
               <span>{item.likes}</span>
             </div>
           </div>
         </div>
       </div>
    )))}
    {hasMore && (
     <div className="col-md-12 text-center">
       <Link to="#" id="loadmore" className="btn-main lead"onClick={handleLoadMore}>
         Load more
       </Link>
     </div>
     )}
   </>
 );
};


export default ExploreItems;
