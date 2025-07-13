// import { useEffect, useState, useRef } from "react";
// import { useAccount } from "../../hooks/useAccount";
// import { useTransaction } from "../../hooks/useTransaction";
// import { useAuth } from "../../hooks/useAuth";

// export default function CreateTransaction() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [accounts, setAccounts] = useState([]);
//   const [form, setForm] = useState({
//     transaction_type: "deposit",
//     account_id_sender: "",
//     account_number_receiver: "",
//     transaction_amount: "",
//     transaction_description: "",
//   });
//   const [receiverInfo, setReceiverInfo] = useState(null);
//   const [receiverName, setReceiverName] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [checkingReceiver, setCheckingReceiver] = useState(false);

//   const { getAccountsByUserId, getAccountByNumber } = useAccount();
//   const { createTransaction } = useTransaction();
//   const { getUserById } = useAuth();

//   const debounceTimeout = useRef(null);
//   const lastCheckedRef = useRef("");
//   const receiverCache = useRef({});

//   // Ambil akun user saat pertama render
//   useEffect(() => {
//     if (user?.id) {
//       getAccountsByUserId(user.id)
//         .then(setAccounts)
//         .catch((err) => {
//           console.error("❌ Gagal mengambil akun:", err);
//           setError("Gagal mengambil akun.");
//         });
//     }
//   }, [user?.id]);

//   const handleReceiverCheck = () => {
//     const accountNumber = form.account_number_receiver.trim();
//     if (!accountNumber) return setError("Nomor rekening tujuan kosong.");

//     if (lastCheckedRef.current === accountNumber) {
//       console.log("⛔ Sudah dicek sebelumnya, lewati request.");
//       return;
//     }

//     // Cache hit
//     if (receiverCache.current[accountNumber]) {
//       const { acc, user } = receiverCache.current[accountNumber];
//       setReceiverInfo(acc);
//       setReceiverName(`${user.user_firstname} ${user.user_lastname}`);
//       setError("");
//       return;
//     }

//     lastCheckedRef.current = accountNumber;
//     setError("");

//     clearTimeout(debounceTimeout.current);
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const acc = await getAccountByNumber(accountNumber);
//         if (!acc) {
//           setReceiverInfo(null);
//           setReceiverName("");
//           setError("❌ Nomor rekening tujuan tidak ditemukan.");
//         } else {
//           const user = await getUserById(String(acc.user_id));
//           setReceiverInfo(acc);
//           setReceiverName(`${user.user_firstname} ${user.user_lastname}`);
//           receiverCache.current[accountNumber] = { acc, user };
//           setError("");
//         }
//       } catch (err) {
//         console.error("❌ Gagal cek rekening tujuan:", err);
//         if (err.response?.status === 429) {
//           setError("🚫 Terlalu banyak permintaan. Coba lagi nanti.");
//         } else {
//           setError("❌ Terjadi kesalahan saat mencari rekening.");
//         }
//       }
//     }, 600);
//   };

//   const handleSubmit = async () => {
//     setError("");

//     const {
//       transaction_type,
//       account_id_sender,
//       account_number_receiver,
//       transaction_amount,
//       transaction_description,
//     } = form;

//     if (!account_id_sender || !transaction_amount) {
//       setError("❗ Lengkapi semua kolom.");
//       return;
//     }

//     if (transaction_type === "transfer" && !receiverInfo) {
//       setError("❗ Rekening tujuan belum dicek atau tidak valid.");
//       return;
//     }

//     if (form.transaction_type !== "deposit") {
//       if (Number(form.transaction_amount) > senderAccount.account_balance) {
//         toast.error("Saldo tidak mencukupi.");
//         return;
//       }
//     }

//     if (form.transaction_type === "transfer" && !receiverInfo) {
//       toast.error("Rekening tujuan belum dicek.");
//       return;
//     }

//     let receiverId =
//       form.transaction_type === "transfer"
//         ? receiverInfo.id
//         : form.account_id_sender;

//     try {
// <<<<<<< HEAD
//       const senderId = Number(account_id_sender);
//       const receiverId =
//         transaction_type === "transfer" ? Number(receiverInfo.id) : senderId;

// =======
//       setLoading(true);
// >>>>>>> HavisCakep
//       await createTransaction({
//         transaction_type,
//         account_id_sender: senderId,
//         account_id_receiver: receiverId,
//         transaction_amount: Number(transaction_amount),
//         transaction_description,
//       });

// <<<<<<< HEAD
//       alert("✅ Transaksi berhasil!");
// =======
//       toast.success("Transaksi berhasil!");

// >>>>>>> HavisCakep
//       setForm({
//         transaction_type: "deposit",
//         account_id_sender: "",
//         account_number_receiver: "",
//         transaction_amount: "",
//         transaction_description: "",
//       });
//       setReceiverInfo(null);
//       setReceiverName("");
//       lastCheckedRef.current = "";
//     } catch (err) {
// <<<<<<< HEAD
//       console.error("❌ Gagal membuat transaksi:", err);
//       if (err.response?.status === 429) {
//         setError("🚫 Terlalu banyak permintaan. Coba lagi nanti.");
//       } else {
//         setError("❌ Transaksi gagal.");
//       }
// =======
//       console.error(err);
//       toast.error("Transaksi gagal.");
//     } finally {
//       setLoading(false);
// >>>>>>> HavisCakep
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
//       <h2 className="text-xl font-bold">Buat Transaksi</h2>

//       <Toaster position="top-center" reverseOrder={false} />

//       {error && <p className="text-red-600 text-sm">{error}</p>}

//       {/* Jenis Transaksi */}
//       <div className="space-y-2">
//         <label className="block font-medium">Jenis Transaksi</label>
//         <select
//           className="w-full border p-2 rounded"
//           value={form.transaction_type}
//           onChange={(e) =>
//             setForm({ ...form, transaction_type: e.target.value })
//           }
//         >
//           <option value="deposit">Deposit</option>
//           <option value="withdraw">Withdraw</option>
//           <option value="transfer">Transfer</option>
//         </select>
//       </div>

//       {/* Rekening Sumber */}
//       <div className="space-y-2">
//         <label className="block font-medium">Rekening Sumber</label>
//         <select
//           className="w-full border p-2 rounded"
//           value={form.account_id_sender}
//           onChange={(e) =>
//             setForm({ ...form, account_id_sender: e.target.value })
//           }
//         >
//           <option value="">-- Pilih --</option>
//           {accounts.map((acc) => (
//             <option key={acc.id} value={acc.id}>
//               {acc.account_number} - {acc.account_type}
//             </option>
//           ))}
//         </select>

//         {form.account_id_sender && (
// <<<<<<< HEAD
//           <p className="text-sm text-gray-600 mt-1">
//             Saldo:{" "}
//             <span className="text-green-600 font-semibold">
//               Rp
//               {(() => {
//                 const selected = accounts.find(
//                   (acc) => String(acc.id) === String(form.account_id_sender)
//                 );
//                 return selected
//                   ? Number(selected.account_balance).toLocaleString()
//                   : 0;
//               })()}
//             </span>
// =======
//           <p className="text-sm text-gray-600">
//             Saldo: Rp{" "}
//             {accounts
//               .find((a) => a.id === Number(form.account_id_sender))
//               ?.account_balance.toLocaleString()}
// >>>>>>> HavisCakep
//           </p>
//         )}
//       </div>

//       {/* No Rekening Tujuan */}
//       {form.transaction_type === "transfer" && (
//         <div className="space-y-2">
//           <label className="block font-medium">No Rekening Tujuan</label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               className="flex-1 border p-2 rounded"
//               value={form.account_number_receiver}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   account_number_receiver: e.target.value,
//                 })
//               }
//             />
//             <button
//               type="button"
//               onClick={handleReceiverCheck}
//               className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-60"
//               disabled={checkingReceiver}
//             >
//               {checkingReceiver ? "Cek..." : "Cek"}
//             </button>
//           </div>
//           {receiverInfo && (
//             <p className="text-sm text-green-600">
//               ✅ {receiverInfo.account_type} a.n {receiverName}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Jumlah */}
//       <div className="space-y-2">
//         <label className="block font-medium">Jumlah</label>
//         <input
//           type="number"
//           className="w-full border p-2 rounded"
//           value={form.transaction_amount}
//           onChange={(e) =>
//             setForm({ ...form, transaction_amount: e.target.value })
//           }
//         />
//       </div>

//       {/* Deskripsi */}
//       <div className="space-y-2">
//         <label className="block font-medium">Deskripsi</label>
//         <input
//           type="text"
//           className="w-full border p-2 rounded"
//           value={form.transaction_description}
//           onChange={(e) =>
//             setForm({ ...form, transaction_description: e.target.value })
//           }
//         />
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-60"
//         disabled={loading}
//       >
//         {loading ? "Memproses..." : "Kirim Transaksi"}
//       </button>
//     </div>
//   );
// }
