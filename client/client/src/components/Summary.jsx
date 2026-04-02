function Summary({ expenses }) {
  const totalSpending = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const categorySummary = expenses.reduce((summary, e) => {
    const category = e.category;
    const amount = Number(e.amount);

    if (summary[category]) {
      summary[category] += amount;
    } else {
      summary[category] = amount;
    }

    return summary;
  }, {});

  const monthlySummary = expenses.reduce((summary, e) => {
    const date = new Date(e.expense_date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const amount = Number(e.amount);

    if (summary[monthKey]) {
      summary[monthKey] += amount;
    } else {
      summary[monthKey] = amount;
    }

    return summary;
  }, {});

  const sortedMonthlySummary = Object.entries(monthlySummary).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <div>
      <h2 style={{ marginBottom: '16px', color: '#1f2937' }}>
        Total Spending: ${totalSpending.toFixed(2)}
      </h2>

      <h3 style={{ marginBottom: '12px', color: '#374151' }}>Category Summary</h3>
      <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
        {Object.entries(categorySummary).map(([category, total]) => (
          <div
            key={category}
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: '#eef2ff',
              color: '#1e3a8a'
            }}
          >
            {category}: ${total.toFixed(2)}
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '12px', color: '#374151' }}>Monthly Trend</h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        {sortedMonthlySummary.map(([month, total]) => (
          <div
            key={month}
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              color: '#166534'
            }}
          >
            {month}: ${total.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Summary;