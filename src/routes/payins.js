const express = require('express');
const schema = require('../db/schemas/payin');
// const db = require('../db/connection');
const db = require("../db/dynamo");

const payins = db.get('payins');

const router = express.Router();

// Get all payins
router.get('/', async (req, res, next) => {
    try {
        const allPayins = await payins.find();
        res.json(allPayins);
    } catch(error) {
        next(error);
    }
});

// Get one specific payin
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const payin = await payins.findOne({
            "transaction_id": id
        });

        if(!payin) {
            const error = new Error('Payin transaction does not exist');
            return next(error);
        }

    res.json(payin);
    } catch(error) {
        next(error);
    }
});

// Create new payin
router.post('/', async (req, res, next) => {
    try {
        const { 
            reference_code, 
            amount,
            currency,
            description
        } = req.body;

        const result = await schema.validateAsync(
            { reference_code, amount, currency, description }
        );

        const new_payin = await payins.insert({
            "transaction_id": uuid.v4(),
            "reference_code": reference_code,
            "amount": amount,
            "currency": currency,
            "status": "PENDING",
            "status_code": "002",
            "error_code": "",
            "description": description
        });

        console.log('New payin has been created');
        res.status(201).json(new_payin);
    } catch(error) {
        next(error);
    }
});

module.exports = router
