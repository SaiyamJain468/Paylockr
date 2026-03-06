// Made by Saiyam Jain - https://github.com/saiyamjain468

export const exportUserData = (userId: string) => {
  const userData = {
    userId,
    exportDate: new Date().toISOString(),
    transactions: JSON.parse(localStorage.getItem(`paylockr_transactions_${userId}`) || '[]'),
    expenses: JSON.parse(localStorage.getItem(`paylockr_expenses_${userId}`) || '[]'),
    invoices: JSON.parse(localStorage.getItem(`paylockr_invoices_${userId}`) || '[]'),
    vaultEntries: JSON.parse(localStorage.getItem(`paylockr_vault_${userId}`) || '[]'),
    settings: JSON.parse(localStorage.getItem(`paylockr_settings_${userId}`) || '{}'),
  };

  const dataStr = JSON.stringify(userData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `paylockr-data-${userId}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const deleteUserData = (userId: string) => {
  if (!confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
    return false;
  }
  
  localStorage.removeItem(`paylockr_transactions_${userId}`);
  localStorage.removeItem(`paylockr_expenses_${userId}`);
  localStorage.removeItem(`paylockr_invoices_${userId}`);
  localStorage.removeItem(`paylockr_vault_${userId}`);
  localStorage.removeItem(`paylockr_settings_${userId}`);
  localStorage.removeItem('paylockr_imported_transactions');
  
  return true;
};
