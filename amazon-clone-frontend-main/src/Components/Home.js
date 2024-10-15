import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Navbar from "./Navbar";
import Slider from "react-slick"; // Import the Slider component

function Home() {
  const [products, setProducts] = useState([]);
  const [topDeals, setTopDeals] = useState([]); // State for Top Deals products
  const [currentIndex, setCurrentIndex] = useState(0); // Current index for Top Deals
  const topDealCount = 5; // Number of top deals to show

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/products/get");
      setProducts(response.data);
      setTopDeals(response.data.slice(0, topDealCount)); // Initial Top Deals
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= topDeals.length ? 0 : prevIndex + 1
      );
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [topDeals]);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true, // Show arrows
  };

  return (
    <Container>
      <Navbar />
      <Banner>
        <Slider {...sliderSettings}>
          <div>
            <img src="./banner.jpg" alt="Banner 1" />
          </div>
          <div>
            <img src="./banner3.jpeg" alt="Banner 2" />
          </div>
          <div>
            <img src="./banner2.jpg" alt="Banner 3" />
          </div>
          {/* Add more slides as needed */}
        </Slider>
      </Banner>

      <TopDealsSection>
        <TopDealsContainer>
          {topDeals.length > 0 &&
            topDeals.slice(currentIndex, currentIndex + 1).map((product) => (
              <CardWrapper key={product._id}>
                <div className="product-content">
                  <Card
                    id={product._id}
                    image={product.imageURL}
                    price={product.price}
                    rating={product.rating}
                    title={product.title}
                  />
                </div>
              </CardWrapper>
            ))}
        </TopDealsContainer>
      </TopDealsSection>

      <Main>
        {products.length > 0 &&
          products.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              image={product.imageURL}
              price={product.price}
              rating={product.rating}
              title={product.title}
            />
          ))}
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: rgb(234, 237, 237);
  max-width: 1400px;
  margin: auto; /* Center the container */
  padding: 0; /* Remove any padding */
`;

const Banner = styled.div`
  width: 1500px;
  height: 300px; /* Adjust height as necessary */
  overflow: hidden; /* Prevent overflow */

  img {
    width: 100%;
    height: 100%; /* Ensure the image fills the container */
    object-fit: cover; /* Scale the image to cover the entire area */
    object-position: center; /* Center the image within its container */
  }
`;

const TopDealsSection = styled.div`
  margin: 0; /* Remove margin to eliminate white space */
  padding: 0; /* Remove any extra padding */
  text-align: center; /* Center the content */
  background-image: url('https://static.vecteezy.com/system/resources/previews/010/930/988/non_2x/shopping-online-on-phone-with-podium-paper-art-modern-background-gifts-box-vector.jpg'); /* Your image URL */
  background-size: cover; /* Make the background image cover the entire section */
  background-position: center center; /* Center the background image */
  height: 576px; /* Set the height to match the image */
  width: 100%; /* Ensures the section takes full width */
  max-width: 1920px; /* Restrict the max width to 1920px */
  border-radius: 8px; /* Rounded corners for the section */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  margin: auto; /* Center the section */
`;

const TopDealsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; /* Ensures the container takes full height */
  position: relative; /* Position relative for centering */
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 378px; /* Increase width for a bigger circle */
  height: 358px; /* Height equal to width for a perfect circle */
  margin: 0; /* No extra margin */
  border-radius: 50%; /* Make the card a circle */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow for depth */
  background-color: white; /* White background for circle */
  overflow: hidden;
  
  /* Move the circle slightly to the right and up */
  transform: translate(20px, -20px); /* 20px right, -20px up */

  .product-content {
    position: relative;
    z-index: 1; /* Ensure the product content is on top of the circle */
  }
`;

const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  width: 100%;
  padding: 20px 0; /* Add padding to the main section for spacing */

  grid-auto-rows: 420px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 20px;

  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 20px; /* Added gap for mobile */
  }

  /* Tablets */
  @media only screen and (min-width: 767px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }
`;

export default Home;
