import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const SkeletonLoader = ({ count = 1 }) => {
    return (
      <> 
      {Array.from({ length: count }).map((_, i) => ( 
  <div id="wrapper">
  <div className="no-bottom no-top" id="content">
    <div id="top"></div>
    <section aria-label="section" className="mt90 sm-mt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div style={{
              backgroundColor: "#e0e0e0",
              width: "100%",
              height: "400px",
              borderRadius: "10px"
            }} />
          </div>
                <div className="col-md-6 mb-4">
              <div style={{
                backgroundColor: "#e0e0e0",
                height: "250px",
                width: "100%",
                marginBottom: "20px",
                borderRadius: "6px"
              }} />
              <div style={{
                backgroundColor: "#e0e0e0",
                height: "30px",
                width: "100%",
                marginBottom: "10px",
                borderRadius: "4px"
              }} />
              <div style={{
                backgroundColor: "#e0e0e0",
                height: "30px",
                width: "100%",
                marginBottom: "10px",
                borderRadius: "4px"
              }} />
              <div style={{
                backgroundColor: "#e0e0e0",
                height: "20px",
                width: "90%",
                marginBottom: "10px",
                borderRadius: "4px"
              }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
      ))}
   </>
    )
  };
  
  
  const [item, setItems] = useState(null);
  const { nftId } = useParams();

  useEffect(() =>{
    axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
    .then(response => {
    setItems(response.data);
    })
  }, [nftId]);
  if (!item) {
    return (
      <div className="container">
        <div className="row">
          <SkeletonLoader count={1} />
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt="" />
                </div><div className="col-md-6">
                    <div className="item_info">
                      <h2>{item.title}#{item.tag}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>
                        {item.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img className="lazy" src={item.ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{item.ownerName}</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img className="lazy" src={item.creatorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{item.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>{item.price}</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>1.85</span>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
