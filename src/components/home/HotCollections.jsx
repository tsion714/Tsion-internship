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
    const [slidesToShow, setSlidesToShow] = useState(1);

      const [sliderRef, instanceRef] = useKeenSlider(
        {
          loop:true,
          slides: {perView: 1},
          breakpoints: {
            "(min-width: 640px)": {
              slides: {
                perView: 2,
              },
            },
            "(min-width: 1024px)": {
              slides: {
                perView: 3,
              },
            },
            "(min-width: 1280px)": {
              slides: {
                perView: 4,
              },
            },
          },
          created(slider) {
            setIsSliderReady(true);
          },
          slideChanged(slider) {
              console.log('slide changed to', slider.track.details.rel);
          },
        },[]);

        const handleResize = () => {
          if (window.innerWidth >= 1280) setSlidesToShow(4);
          else if (window.innerWidth >= 1024) setSlidesToShow(3);
          else if (window.innerWidth >= 640) setSlidesToShow(2);
          else setSlidesToShow(1);
        };

        useEffect(() => {
          handleResize();
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, []);

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
    const SkeletonLoader = () => (
      Array(slidesToShow).fill().map((_, index) => (
        <div key={index} className="keen-slider__slide">
          <div className="px-1">
            <div className="n" style={{ padding: "10px" }}>
              <div
                className="nf skeleton"
                style={{
                  backgroundColor: "#e0e0e0",
                  height: "200px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  opacity: 0.6
                }}
              />  
              <div className="nft_coll_pp" style={{ marginTop: "10px" }}>
                <div
                  className="skeleton circle"
                  style={{
                    backgroundColor: "#e0e0e0",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    opacity: 0.6
                  }}
                />
              </div>
              <div className="nft_coll_info" style={{ marginTop: "10px" }}>
                <div
                  className="skeleton"
                  style={{
                    backgroundColor: "#e0e0e0",
                    height: "20px",
                    width: "60%",
                    borderRadius: "4px",
                    marginBottom: "5px",
                    opacity: 0.6
                  }}
                />
                <div
                  className="skeleton"
                  style={{
                    backgroundColor: "#e0e0e0",
                    height: "14px",
                    width: "40%",
                    borderRadius: "4px",
                    opacity: 0.6
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))
    );
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
            <SkeletonLoader />
             ) : (items.map((item, index)=>(
              <div
              key={index}
              className="keen-slider__slide">
            <div className="px-1">
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
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
