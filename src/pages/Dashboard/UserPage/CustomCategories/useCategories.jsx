import { useLocalStorage } from "./useLocalStorage";

export function useCategories() {
  const [categories, setCategories] = useLocalStorage("transactionCategories", {
    Food: [],
    Transport: [],
    Entertainment: [],
    Bills: [],
  });

  const assignTransactionToCategory = (txId, newCategory) => {
    setCategories((prev) => {
      const updated = {};

      // Hapus txId dari semua kategori
      for (const cat in prev) {
        updated[cat] = prev[cat].filter((id) => id !== txId);
      }

      // Tambahkan ke kategori baru
      if (!updated[newCategory]) {
        updated[newCategory] = [];
      }
      updated[newCategory].push(txId);

      return updated;
    });
  };

  return { categories, assignTransactionToCategory };
}
