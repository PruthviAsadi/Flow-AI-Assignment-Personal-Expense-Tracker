const express = require('express');
const db = require('../db/database');
const router = express.Router();

// Middleware to validate transaction input
const validateTransactionInput = (req, res, next) => {
    const { type, category, amount, date } = req.body;
    if (!type || !category || amount === undefined || !date) {
        return res.status(400).json({ error: "All fields (type, category, amount, date) are required." });
    }
    next();
};

// Add a new transaction
router.post('/', validateTransactionInput, (req, res) => {
    const { type, category, amount, date, description } = req.body;
    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
        [type, category, amount, date, description], function (err) {
            if (err) {
                console.error("Error adding transaction:", err.message);
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
});

// Retrieve all transactions
router.get('/', (req, res) => {
    db.all(`SELECT * FROM transactions`, [], (err, rows) => {
        if (err) {
            console.error("Error retrieving transactions:", err.message);
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Retrieve a transaction by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
        if (err || !row) {
            console.error(`Transaction with ID ${id} not found.`);
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(row);
    });
});

// Update a transaction by ID
router.put('/:id', validateTransactionInput, (req, res) => {
    const id = req.params.id;
    const { type, category, amount, date, description } = req.body;
    db.run(`UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
        [type, category, amount, date, description, id], function (err) {
            if (err) {
                console.error(`Error updating transaction ID ${id}:`, err.message);
                return res.status(400).json({ error: err.message });
            }
            res.json({ updatedID: id });
        });
});

// Delete a transaction by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
        if (err) {
            console.error(`Error deleting transaction ID ${id}:`, err.message);
            return res.status(400).json({ error: err.message });
        }
        res.json({ deletedID: id });
    });
});

// Retrieve a summary of transactions
router.get('/summary', (req, res) => {
    const summaryQuery = `
        SELECT 
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpense
        FROM transactions;
    `;
    db.get(summaryQuery, [], (err, row) => {
        if (err) {
            console.error("Error retrieving summary:", err.message);
            return res.status(400).json({ error: err.message });
        }

        console.log("Summary Query Result:", row);  // Log the summary query result

        // Ensure to return 0 if no transactions exist
        res.json({
            totalIncome: row.totalIncome || 0,
            totalExpense: row.totalExpense || 0,
            balance: (row.totalIncome || 0) - (row.totalExpense || 0)
        });
    });
});

module.exports = router;
