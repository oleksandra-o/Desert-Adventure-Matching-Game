import React, { useState, useEffect } from 'react';
import Card from './Card';
import _ from 'underscore';  // Make sure underscore is installed with npm

const GameBoard = ({ flips, setFlips, matches, setMatches }) => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isChecking, setIsChecking] = useState(false); // To prevent fast clicks

  // Load the audio files
  const clickSound = new Audio('/audio/click.wav');
  const matchSound = new Audio('/audio/match.wav');
  const winSound = new Audio('/audio/win.wav');

  useEffect(() => {
    const cardClasses = [];
    for (let i = 1; i <= 6; i++) {
      cardClasses.push(`image-${i}`, `image-${i}`);
    }
    setCards(
      _.shuffle(cardClasses).map((imageClass, index) => ({
        index,
        imageClass,
        isFlipped: false,
        isMatched: false,
      }))
    );
  }, []);

  const flipBackCards = (card1, card2) => {
    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.index === card1.index || card.index === card2.index
            ? { ...card, isFlipped: false }
            : card
        )
      );
      setIsChecking(false);
    }, 1000);
  };

  const onCardFlipped = (flippedCard) => {
    // Play the click sound when a card is flipped
    clickSound.play();

    if (isChecking || flippedCard.isFlipped || flippedCard.isMatched) {
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.index === flippedCard.index ? { ...card, isFlipped: true } : card
      )
    );
    setFlips(flips + 1);

    if (!firstCard) {
      setFirstCard(flippedCard);
    } else if (!secondCard) {
      setSecondCard(flippedCard);
      setIsChecking(true);

      if (firstCard.imageClass === flippedCard.imageClass) {
        setMatches(matches + 1);
        // Play match sound if the two cards match
        matchSound.play();

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.imageClass === flippedCard.imageClass
              ? { ...card, isMatched: true }
              : card
          )
        );

        // Check if all matches are found (end of the game)
        if (matches + 1 === cards.length / 2) {
          // Play win sound when all matches are found
          winSound.play();
        }

        setFirstCard(null);
        setSecondCard(null);
        setIsChecking(false);
      } else {
        flipBackCards(firstCard, flippedCard);
        setFirstCard(null);
        setSecondCard(null);
      }
    }
  };

  return (
    <div id="card-container">
      {cards.map((card) => (
        <Card key={card.index} card={card} onCardFlipped={onCardFlipped} />
      ))}
    </div>
  );
};

export default GameBoard;