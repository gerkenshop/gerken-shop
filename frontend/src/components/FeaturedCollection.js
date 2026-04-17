import React from 'react';
import './FeaturedCollection.css'; // Assuming you will create a CSS file for styling

const FeaturedCollection = () => {
    return (
        <div className="featured-collection">
            <div className="hero">
                <h1>Featured Warhammer Figurines</h1>
                <p>Discover our exclusive collection of collectible Warhammer figurines.</p>
                <button className="cta-button">Shop Now</button>
            </div>
            <div className="product-list">
                {/* Placeholder for product items. You can map over an array of products here */}
                <div className="product-item">
                    <h2>Warhammer Figurine 1</h2>
                    <p>Description of Warhammer Figurine 1.</p>
                </div>
                <div className="product-item">
                    <h2>Warhammer Figurine 2</h2>
                    <p>Description of Warhammer Figurine 2.</p>
                </div>
                {/* Add more products as needed */}
            </div>
        </div>
    );
};

export default FeaturedCollection;