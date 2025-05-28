import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";




const SkeletonAuthor = () => (
 <div className="container">
   <div className="row">
     <div className="col-md-12">
       <div className="d_profile de-flex" style={{ padding: "20px", backgroundColor: "#f2f2f2" }}>
         <div className="de-flex-col">
           <div
             style={{
               width: 80,
               height: 80,
               borderRadius: "50%",
               backgroundColor: "#e0e0e0",
               marginBottom: "10px",
             }}
           />
           <div
             style={{
               width: 150,
               height: 16,
               backgroundColor: "#e0e0e0",
               borderRadius: 4,
               marginBottom: "6px",
             }}
           />
         </div>


         <div className="profile_follow de-flex" style={{ marginLeft: "auto" }}>
           <div
             style={{
               width: 70,
               height: 25,
               backgroundColor: "#e0e0e0",
               borderRadius: 6,
             }}
           />
         </div>
       </div>
     </div>
   </div>
 </div>
);
const Author = () => {
  
 const { authorId } = useParams();
 const [items, setItems] = useState(null);
 const [isFollowing, setIsFollowing] = useState(false);
 


   useEffect(() =>{
    axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    .then(response => {
     setItems(response.data);
   })
 }, [authorId]);
      
 const handleFollowToggle = () => {
   setIsFollowing((prev) => !prev);
 };




 if (!items) {
   return (
     <>
       <section
         id="profile_banner"
         aria-label="section"
         className="text-light"
         style={{
           background: `url(images/author_banner.jpg) top`,
           backgroundSize: "cover",
           height: "300px"
         }}
       ></section>
       <SkeletonAuthor />
     </>
   );
 }


  const originalFollowers = items.followers || 0;
 const displayedFollowers = isFollowing ? originalFollowers + 1 : originalFollowers;


 return (
   <div id="wrapper">
     <div className="no-bottom no-top" id="content">
       <div id="top"></div>


       <section
         id="profile_banner"
         aria-label="section"
         className="text-light"
         data-bgimage="url(images/author_banner.jpg) top"
         style={{ background: `url(${AuthorBanner}) top` }}
       ></section>


       <section aria-label="section">
         <div className="container">
           <div className="row">
             <div className="col-md-12">
               <div className="d_profile de-flex">
                 <div className="de-flex-col">
                   <div className="profile_avatar">
                     <img src={items.authorImage} alt="" />


                     <i className="fa fa-check"></i>
                     <div className="profile_name">
                       <h4>
                       {items.authorName}
                         <span className="profile_username">@{items.tag}</span>
                         <span id="wallet" className="profile_wallet">
                           {items.address}
                         </span>
                         <button id="btn_copy" title="Copy Text">
                           Copy
                         </button>
                       </h4>
                     </div>
                   </div>
                 </div>
                 <div className="profile_follow de-flex">
                   <div className="de-flex-col">
                     <div className="profile_follower">{displayedFollowers} followers</div>
                     <button className="btn-main" onClick={handleFollowToggle}>
                       {isFollowing ? "Unfollow" : "Follow"}
                     </button>
                   </div>
                 </div>
               </div>
             </div>


             <div className="col-md-12">
               <div className="de_tab tab_simple">
                 <AuthorItems />
               </div>
             </div>
           </div>
         </div>
       </section>
     </div>
   </div>
 );
};


export default Author;
