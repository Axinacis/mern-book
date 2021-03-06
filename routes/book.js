const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/Book.js');
const passport = require('passport');
require('../config/passport')(passport);

const getToken = function (headers) {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


/* GET ALL BOOKS */
router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
    const token = getToken(req.headers);
    if (token) {
        Book.find(function (err, books) {
            if (err) return next(err);
            res.json(books);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});


router.get('/findbook', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const match = {};
    const mySort = {};

    const token = getToken(req.headers);
    if (token) {

        if (req.query.sortBy) {
            const sortArr = req.query.sortBy.split(':');
            mySort[sortArr[0]] = sortArr[1].match(/^(desc|descending|-1)$/) ? -1 : 1
        }

        if (req.query.isbn) {
            match.isbn = req.query.isbn
        }

        if (req.query.title) {
            match.title = req.query.title
        }

        if (req.query.author) {
            match.author = req.query.author
        }

        if (req.query.publisher) {
            match.publisher = req.query.publisher
        }

        try {
            const searchQuery = await Book.find(match).sort(mySort);
            res.send(searchQuery)
        } catch (e) {
            res.status(500).send(e)
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});


/* GET SINGLE BOOK BY ID */
router.get('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    const token = getToken(req.headers);
    if (token) {
        Book.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

});

/* SAVE BOOK */
router.post('/', passport.authenticate('jwt', {session: false}), function (req, res) {
    const token = getToken(req.headers);
    if (token) {
        Book.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});


/* UPDATE BOOK */
router.put('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    const token = getToken(req.headers);
    if (token) {
        Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

});

/* DELETE BOOK */
router.delete('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    const token = getToken(req.headers);
    if (token) {
        Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

module.exports = router;
