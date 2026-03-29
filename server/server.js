const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

// GET all expenses
app.get('/api/expenses', (req, res) => {
  const sql = 'SELECT * FROM expenses ORDER BY expense_date DESC';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('GET error:', err);
      return res.status(500).json({ error: 'Failed to fetch expenses' });
    }
    res.json(result);
  });
});

// POST - create a new expense
app.post('/api/expenses', (req, res) => {
  const { title, category, amount, expense_date, description } = req.body;

  if (!title || !category || !amount || !expense_date) {
    return res.status(400).json({ error: 'Title, category, amount, and date are required' });
  }

  const sql = `
    INSERT INTO expenses (title, category, amount, expense_date, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, category, amount, expense_date, description], (err, result) => {
    if (err) {
      console.error('POST error:', err);
      return res.status(500).json({ error: 'Failed to add expense' });
    }

    res.status(201).json({
      message: 'Expense added successfully',
      id: result.insertId
    });
  });
});

// PUT - update an expense
app.put('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { title, category, amount, expense_date, description } = req.body;

  if (!title || !category || !amount || !expense_date) {
    return res.status(400).json({ error: 'Title, category, amount, and date are required' });
  }

  const sql = `
    UPDATE expenses
    SET title = ?, category = ?, amount = ?, expense_date = ?, description = ?
    WHERE id = ?
  `;

  db.query(sql, [title, category, amount, expense_date, description, id], (err, result) => {
    if (err) {
      console.error('PUT error:', err);
      return res.status(500).json({ error: 'Failed to update expense' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense updated successfully' });
  });
});

// DELETE - remove an expense
app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM expenses WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('DELETE error:', err);
      return res.status(500).json({ error: 'Failed to delete expense' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});