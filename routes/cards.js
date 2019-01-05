const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json')
const { cards }= data;

router.get('/', (req, res) => {
  const flashCardId = Math.floor(Math.random() * cards.length );
  res.redirect(`/cards/${flashCardId}`);
});

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;

  if(!side || !['question', 'answer'].includes(side)) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  const name = req.cookies.username;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text, name, side };

  if (side === 'question') {
    templateData.hint = hint;
    templateData.side = side;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if( side === 'answer') {
    templateData.side = side;
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }

  res.render('card', templateData);
});

module.exports = router;