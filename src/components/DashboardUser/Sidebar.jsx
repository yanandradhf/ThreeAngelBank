export function Sidebar() {
  const navItems = [
    { name: "Dashboard", link: "#dashboard" },
    { name: "Transfer", link: "#accounts" },
    { name: "Transaction", link: "#transactions" },
  ];
  return (
    <aside
      className="fixed top-0 left-0 h-full bg-[#ebebeb] text-emerald-700 w-64 p-4 shadow-lg z-50 transform transition-transform duration-300"
      style={{ paddingTop: "4rem" }} // Sesuaikan dengan tinggi navbar
    >
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button className="text-[#000] focus:outline-none"></button>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            type="button"
            className="flex items-center w-full p-3 rounded-lg text-lg font-medium text-emerald-700 bg-[#ebebeb] hover:bg-[#b6b6b6] transition-colors duration-200 text-left"
            onClick={() => (window.location.hash = item.link)}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
}
