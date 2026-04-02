function ExpenseList({ expenses, handleEdit, handleDelete }) {
  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {expenses.map((exp) => (
        <div
          key={exp.id}
          style={{
            border: '1px solid #e5e7eb',
            padding: '20px',
            borderRadius: '14px',
            backgroundColor: '#f9fafb'
          }}
        >
          <h3 style={{ marginBottom: '12px', color: '#111827' }}>{exp.title}</h3>
          <p><strong>Category:</strong> {exp.category}</p>
          <p><strong>Amount:</strong> ${Number(exp.amount).toFixed(2)}</p>
          <p><strong>Date:</strong> {exp.expense_date?.slice(0, 10)}</p>
          <p><strong>Description:</strong> {exp.description || 'No description'}</p>

          <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleEdit(exp)}
              style={{
                padding: '10px 14px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(exp.id)}
              style={{
                padding: '10px 14px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;