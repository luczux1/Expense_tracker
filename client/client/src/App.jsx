import { useEffect, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: '',
    amount: '',
    expense_date: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('http://localhost:5000/api/expenses');

      if (!res.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      setError('Failed to load expenses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');

      const url = editingId
        ? `http://localhost:5000/api/expenses/${editingId}`
        : 'http://localhost:5000/api/expenses';

      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error('Request failed');
      }

      setForm({
        title: '',
        category: '',
        amount: '',
        expense_date: '',
        description: ''
      });

      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      setError(editingId ? 'Failed to update expense.' : 'Failed to add expense.');
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Delete failed');
      }

      fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense.');
    }
  };

  const handleEdit = (expense) => {
    setForm({
      title: expense.title || '',
      category: expense.category || '',
      amount: expense.amount || '',
      expense_date: expense.expense_date?.slice(0, 10) || '',
      description: expense.description || ''
    });
    setEditingId(expense.id);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fb',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '48px',
            color: '#1f2937'
          }}
        >
          Expense Tracker
        </h1>

        {error && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            marginBottom: '20px'
          }}
        >
          <ExpenseForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editingId={editingId}
          />
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            marginBottom: '20px'
          }}
        >
          <Summary expenses={expenses} />
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}
        >
          <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Expense List</h2>

          {loading ? (
            <p>Loading...</p>
          ) : expenses.length === 0 ? (
            <p>No expenses yet.</p>
          ) : (
            <ExpenseList
              expenses={expenses}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;