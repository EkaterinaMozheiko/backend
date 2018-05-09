const router = require('express').Router();
const db = require('../db/db');
/* const { validate } = require('jsonschema'); */

/* const newPoll = text => ({
  id: String(Math.random()
    .toString(16)
    .split('.')[1]),
  title: {

  },
  votes: {
    type: Number,
    default: 0,
  },
});
*/
// router.use('/:id', (req, res, next) => {
//   const poll = db.get('polls')
//     .find({ id: req.params.id })
//     .value();
//
//   if (!poll) {
//     next(new Error('CAN_NOT_FIND_POLL'));
//   }
// });

// GET /polls
router.get('/', (req, res) => {
  const polls = db.get('polls').value();

  res.json({ status: 'OK', data: polls });
});

// GET /polls/:id
router.get('/:id', (req, res) => {
  const poll = db
    .get('polls')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: poll });
});

// POST /polls
router.post('/', (req, res, next) => {
  const poll = {
    id: String(Math.random()
      .toString(16)
      .split('.')[1]),
    title: req.body.title,
    options: req.body.options,
  };
  console.log(poll);
  db
    .get('polls')
    .push(poll)
    .write();

  res.json({ status: 'OK', data: poll });
});
/*
// PATCH /polls/:id
router.patch('/:id', (req, res, next) => {
  const poll = db
    .get('polls')
    .find({ id: req.params.id })
    .assign(req.body)
    .value();

  db.write();

  res.json({ status: 'OK', data: poll });
});
*/
// DELETE /polls/:id
router.delete('/:id', (req, res) => {
  db
    .get('polls')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
});

module.exports = router;
