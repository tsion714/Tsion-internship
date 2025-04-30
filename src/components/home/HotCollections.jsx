import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' 
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {


    const [items, setItems] = useState([]);
    const [isSliderReady, setIsSliderReady] = useState(false);


      const [sliderRef, instanceRef] = useKeenSlider(
        {
          loop:true,
          slides: {perView: 1},
          created(slider) {
            setIsSliderReady(true);
          },
          slideChanged(slider) {
              console.log('slide changed to', slider.track.details.rel);
          },
        },[]);


        const goNext = () => {
          if (isSliderReady && instanceRef.current) {
            instanceRef.current.next();
          }
        };
      
        const goPrev = () => {
          if (isSliderReady && instanceRef.current) {
            instanceRef.current.prev();
          }
        };       

    useEffect(()=>{
      axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      .then(response => {
        setItems(response.data);
      })
    },[]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div style ={{position: "relative"}}>
          <div ref={sliderRef} className="keen-slider">
          {items.length === 0 ? (
               <div className="keen-slider__slide">Loading...</div>
             ) : (items.map((item, index)=>(
              <div
              key={index}
              className="keen-slider__slide">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.id}`}>
                    <img src={item.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy pp-coll" src={item.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title}</h4>
                  </Link>
                  <span>{item.price}</span>
                </div>
              </div>
            </div>
            </div>
          )))}
          </div>
          {isSliderReady && (
            <>
             <button
        onClick={goPrev}
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          zIndex: 10,
          background: "#fff",
          transform: "translateY(-50%)",
          border: "1px solid #ccc",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        ◀
      </button>
      <button
        onClick={goNext}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          zIndex: 10,
          background: "#fff",
          transform: "translateY(-50%)",
          border: "1px solid #ccc",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        ▶
      </button>
      </>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
