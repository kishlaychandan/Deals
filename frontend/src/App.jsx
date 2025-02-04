import React, { useState } from 'react';
import HourDeals from './deals/HourDeals';
import HotDeals from './deals/HotDeals';
import RealTimeDeals from './deals/RealTimeDeals';

function App() {
  const [currentDeal, setCurrentDeal] = useState('hour');

  return (
    <div>
      <h1>Deals App</h1>
      <div>
        <button onClick={() => setCurrentDeal('hour')}>Show Hour Deals</button>
        <button onClick={() => setCurrentDeal('hot')}>Show Hot Deals</button>
        <button onClick={() => setCurrentDeal('realtime')}>Show Real-Time Deals</button>
      </div>
      {currentDeal === 'hour' && <HourDeals />}
      {currentDeal === 'hot' && <HotDeals />}
      {currentDeal === 'realtime' && <RealTimeDeals />}
    </div>
  );
}

export default App;
