import { useEffect, useState } from 'react';

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

  // 获取数据
  const fetchExpenses = async () => {
    const res = await fetch('http://localhost:5000/api/expenses');
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 输入变化
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 提交（新增 or 修改）
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`http://localhost:5000/api/expenses/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setEditingId(null);
    } else {
      await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }

    setForm({
      title: '',
      category: '',
      amount: '',
      expense_date: '',
      description: ''
    });

    fetchExpenses();
  };

  // 删除
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: 'DELETE'
    });
    fetchExpenses();
  };

  // 编辑
  const handleEdit = (expense) => {
    setForm(expense);
    setEditingId(expense.id);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Expense Tracker</h1>

      {/* 表单 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
        <input name="expense_date" type="date" value={form.expense_date} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <button type="submit">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      {/* 列表 */}
      {expenses.map((exp) => (
        <div key={exp.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{exp.title}</h3>
          <p>Category: {exp.category}</p>
          <p>Amount: ${exp.amount}</p>
          <p>Date: {exp.expense_date?.slice(0, 10)}</p>
          <p>{exp.description}</p>

          <button onClick={() => handleEdit(exp)}>Edit</button>
          <button onClick={() => handleDelete(exp.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;