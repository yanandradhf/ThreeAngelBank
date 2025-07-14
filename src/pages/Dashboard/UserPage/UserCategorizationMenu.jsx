import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTransaction } from "../../../context/useTransaction";
import { useCategories } from "./CustomCategories/useCategories";

export function UserCategorizationMenu() {
  const { getAllTransactionsByUser } = useTransaction();
  const { categories, assignTransactionToCategory } = useCategories();
  const user = JSON.parse(localStorage.getItem("user"));

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const data = await getAllTransactionsByUser(user.id);
        setTransactions(data);
      } catch (e) {
        console.error("Gagal ambil transaksi:", e);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchTx();
  }, [user?.id]);

  const getTxById = (id) =>
    transactions.find((tx) => String(tx.id) === String(id));

  const categorizedTxIds = Object.values(categories).flat();
  const uncategorizedTx = transactions.filter(
    (tx) => !categorizedTxIds.includes(String(tx.id))
  );

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    assignTransactionToCategory(draggableId, destination.droppableId);
  };

  const categoryColors = {
    Food: "bg-emerald-100 border-emerald-300",
    Transport: "bg-yellow-100 border-yellow-300",
    Entertainment: "bg-indigo-100 border-indigo-300",
    Bills: "bg-red-100 border-red-300",
    Uncategorized: "bg-gray-100 border-gray-300",
  };

  const calculateTotal = (txIds) =>
    txIds.reduce((sum, id) => {
      const tx = getTxById(id);
      return sum + (tx ? Number(tx.transaction_amount) : 0);
    }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Memuat data transaksi...
      </div>
    );
  }

  const allCategories = {
    Food: categories.Food || [],
    Transport: categories.Transport || [],
    Entertainment: categories.Entertainment || [],
    Bills: categories.Bills || [],
  };

  return (
    <main className="ps-50 flex items-center justify-center pt-24 pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl border border-emerald-100 p-10 w-full max-w-6xl flex flex-col gap-10 mx-4"
      >
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 via-emerald-400 to-green-400 bg-clip-text text-transparent text-center tracking-wide">
          🏷️ Kategorisasi Transaksi
        </h2>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(allCategories).map(([category, txIds], index) => (
              <Droppable key={category} droppableId={category}>
                {(provided, snapshot) => (
                  <div
                    className={`rounded-xl shadow border p-4 flex flex-col transition-none ${
                      categoryColors[category] || "bg-white border-gray-200"
                    } ${
                      snapshot.isDraggingOver
                        ? "scale-[1.02] ring-2 ring-emerald-300"
                        : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {category}
                      </h3>
                      <span className="text-sm text-gray-500">
                        Rp {calculateTotal(txIds).toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2 min-h-[50px]">
                      {txIds.map((txId, index) => {
                        const tx = getTxById(txId);
                        if (!tx) return null;

                        return (
                          <Draggable
                            key={String(tx.id)}
                            draggableId={String(tx.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`bg-white border border-gray-300 rounded-md p-3 shadow-sm transition-none ${
                                  snapshot.isDragging
                                    ? "ring-2 ring-emerald-300"
                                    : ""
                                }`}
                              >
                                <div className="text-sm font-medium text-gray-800">
                                  {tx.transaction_description ||
                                    tx.transaction_type}
                                </div>
                                <div
                                  className={`text-xs font-semibold ${
                                    tx.transaction_type === "withdraw" ||
                                    tx.transaction_type === "outgoing_transfer"
                                      ? "text-red-500"
                                      : "text-green-600"
                                  }`}
                                >
                                  {tx.transaction_type === "withdraw" ||
                                  tx.transaction_type === "outgoing_transfer"
                                    ? `-Rp ${Number(
                                        tx.transaction_amount
                                      ).toLocaleString()}`
                                    : `+Rp ${Number(
                                        tx.transaction_amount
                                      ).toLocaleString()}`}
                                </div>
                              </motion.div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          {/* UNCATEGORIZED DI BAWAH */}
          <div className="mt-8">
            <Droppable droppableId="Uncategorized">
              {(provided, snapshot) => (
                <div
                  className={`rounded-xl shadow border p-4 flex flex-col transition-none ${
                    categoryColors.Uncategorized
                  } ${
                    snapshot.isDraggingOver
                      ? "scale-[1.02] ring-2 ring-emerald-300"
                      : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Uncategorized
                    </h3>
                    <span className="text-sm text-gray-500">
                      Rp{" "}
                      {calculateTotal(
                        uncategorizedTx.map((tx) => String(tx.id))
                      ).toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2 min-h-[50px]">
                    {uncategorizedTx.map((tx, index) => (
                      <Draggable
                        key={String(tx.id)}
                        draggableId={String(tx.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={`bg-white border border-gray-300 rounded-md p-3 shadow-sm transition-none ${
                              snapshot.isDragging
                                ? "ring-2 ring-emerald-300"
                                : ""
                            }`}
                          >
                            <div className="text-sm font-medium text-gray-800">
                              {tx.transaction_description ||
                                tx.transaction_type}
                            </div>
                            <div
                              className={`text-xs font-semibold ${
                                tx.transaction_type === "withdraw" ||
                                tx.transaction_type === "outgoing_transfer"
                                  ? "text-red-500"
                                  : "text-green-600"
                              }`}
                            >
                              {tx.transaction_type === "withdraw" ||
                              tx.transaction_type === "outgoing_transfer"
                                ? `-Rp ${Number(
                                    tx.transaction_amount
                                  ).toLocaleString()}`
                                : `+Rp ${Number(
                                    tx.transaction_amount
                                  ).toLocaleString()}`}
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </motion.div>
    </main>
  );
}
