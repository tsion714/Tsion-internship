import React,  { useEffect, useState }from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {

  const [items, setItems] = useState([]);

  useEffect(()=>{
    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
    .then(response => {
      setItems(response.data);
    })
  },[]);

  const SkeletonLoader = () => (
    Array(12).fill().map((_, index) => (
      <div key={index}
      style={{
        display:'flex',
        position: 'relative',
        marginBottom: '40px',
        minHeight: '60px', }}>
      <div className="author_list_pp" style={{
        backgroundColor: "#e0e0e0",
        position: 'static', 
        width: '50px',
        height:'50px',
        borderRadius: '50%',
        marginRight: '10px',
        opacity: 0.6,
      }} />
      <div>
      <div className="author_list_info" style={{
        backgroundColor: "#e0e0e0",
        height: '20px',
        width: '140px',
        borderRadius: '4px',
        opacity: 0.6,
        marginBottom: '8px',
      }} />
      <div className="author_list_info span" style={{
        backgroundColor: "#e0e0e0",
        height: '14px',
        width: '100px',
        borderRadius: '4px',
        opacity: 0.6,
      }} />
      </div>
      </div>
     ))
   );
 


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
            {items.length === 0 ? (
           <SkeletonLoader />
            ) : (items.map((item, index)=>(
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
             )))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
