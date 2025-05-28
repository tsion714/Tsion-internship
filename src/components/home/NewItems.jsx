import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import axios from 'axios';


const NewItems = () => {

  const [items, setItems] = useState([]);
  const [isSliderReady, setIsSliderReady] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [countdowns, setCountdowns] = useState([]);


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
    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
    .then(response => {
      setItems(response.data);
    })
  },[]);

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


const SkeletonLoader = () => (
  Array(slidesToShow).fill().map((_, index) => (
    <div key={index} className="keen-slider__slide">
      <div className="px-1">
      <div
            className="author_list_pp"
            style={{   
             backgroundColor: "#e0e0e0",
             width: '40px',
             height: '40px',
             position: 'absolute',
             borderRadius: '50%',
             marginLeft: '10px',
             marginTop: '2px',
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
            className="nft__item img"
            style={{   
             backgroundColor: "#e0e0e0",
             width: '100%',
             height: 'auto',
             borderRadius: '8px',
             marginBottom: '10px',
             position: 'relative',
             overflow: 'hidden',
            opacity: 0.6
            }}
          /> 
      <div
            className="nft__item_wrap"
            style={{   
              backgroundColor: "#e0e0e0",
              height: "200px",
              borderRadius: "8px",
              marginBottom: "10px",
              opacity: 0.6
            }}
          /> 
          <div
              className="nft__item_info"
              style={{
                backgroundColor: "#e0e0e0",
                height: "20px",
                width: "190px",
                borderRadius: "4px",
                opacity: 0.6,
                position: "relative",
                overflow: "hidden",
              }}
           />
          </div>
          </div>
             ))
            );         

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
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
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                {item.expiryDate
                  ? `${countdowns[index]?.h}h ${countdowns[index]?.m}m ${countdowns[index]?.s}s`
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

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
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
          </div>
          )))}

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
      </div>
    </section>
  )
};

export default NewItems;
