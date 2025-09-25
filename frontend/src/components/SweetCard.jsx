import { useState } from 'react';

function SweetCard({ sweet, onPurchase }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      await onPurchase(sweet._id);
    } finally {
      setIsLoading(false);
    }
  };

  const getStockStatus = () => {
    if (sweet.quantity === 0) return 'out';
    if (sweet.quantity <= 5) return 'low';
    return 'in';
  };

  const getStockBadge = () => {
    const status = getStockStatus();
    const badges = {
      out: { text: 'Out of Stock', class: 'stock-out' },
      low: { text: 'Low Stock', class: 'stock-low' },
      in: { text: 'In Stock', class: 'stock-in' }
    };
    return badges[status];
  };

  const getSweetEmoji = (category) => {
    const emojis = {
      chocolate: '🍫',
      candy: '🍭',
      gummy: '🐻',
      lollipop: '🍭',
      caramel: '🍮',
      cookie: '🍪',
      cake: '🍰',
      default: '🍬'
    };
    return emojis[category.toLowerCase()] || emojis.default;
  };

  const badge = getStockBadge();

  return (
    <div className="sweet-card fade-in">
      <div className="sweet-card-image">
        {getSweetEmoji(sweet.category)}
      </div>
      
      <div className="sweet-card-content">
        <h3 className="sweet-card-title">{sweet.name}</h3>
        <p className="sweet-card-category">{sweet.category}</p>
        
        <div className="sweet-card-price">
          ${sweet.price.toFixed(2)}
        </div>
        
        <div className="sweet-card-stock">
          <span className={`stock-badge ${badge.class}`}>
            {badge.text}
          </span>
          <span className="stock-count">
            {sweet.quantity} available
          </span>
        </div>
        
        <button 
          className="btn btn-primary btn-full"
          onClick={handlePurchase}
          disabled={sweet.quantity === 0 || isLoading}
        >
          {isLoading ? 'Processing...' : 'Purchase'}
        </button>
      </div>
    </div>
  );
}

export default SweetCard;
