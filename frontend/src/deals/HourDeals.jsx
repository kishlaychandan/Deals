import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Deals.css'; // CSS file for styling
import { API_URL } from './api';
const HourDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/hour-deals`);
      setDeals(data);
    } catch (error) {
      console.error('Error fetching deals', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div>
      <h2>Hour Deals</h2>
      <button onClick={fetchDeals} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Hour Deals'}
      </button>
      <div className="deals-grid">
        {deals.map((deal, index) => (
          <div key={index} className="deal-card">
            <img src={deal.imageUrl} alt={deal.description} className="deal-image" />
            <h3 className="deal-title">{deal.description}</h3>
            <p className="deal-price">
              Current Price: {deal.currentPrice} <br />
              Original Price: {deal.originalPrice}
            </p>
            <p className="deal-time">{deal.timeInfo}</p>
            <a href={deal.dealUrl} target="_blank" rel="noopener noreferrer" className="deal-link">
              View Deal
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourDeals;
