import React from 'react';

const Card = ({ card, onCardFlipped }) => {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      onCardFlipped(card);
    }
  };

  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-down" style={{ backgroundImage: `url(/img/cardnew.png)` }} ></div>
      <div className="card-up" style={{ backgroundImage: `url(/img/${card.imageClass}.png)` }}></div>
    </div>
  );
};

export default Card;