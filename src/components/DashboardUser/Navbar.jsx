export function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-[#e6e6e6] to-[#fff] text-emerald-700 p-4 shadow-lg flex items-center justify-between fixed top-0 left-0 w-full z-30 h-16">
      <div className="flex items-center">
        <button
          onClick=""
          className="lg:hidden text-white mr-4 focus:outline-none"
        ></button>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium hidden md:block">
          Halo, Bima Sakti!
        </span>
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-semibold border-2 border-white shadow-lg hover:shadow-emerald-400 transition-shadow duration-200 cursor-pointer">
          <img
            src="https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
