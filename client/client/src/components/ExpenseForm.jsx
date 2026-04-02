function ExpenseForm({ form, handleChange, handleSubmit, editingId }) {
  const inputStyle = {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '16px'
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        <input
          style={inputStyle}
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="expense_date"
          type="date"
          value={form.expense_date}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '12px 20px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        {editingId ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
}

export default ExpenseForm;