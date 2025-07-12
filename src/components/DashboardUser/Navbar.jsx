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
        {/* Divider */}
        <div className="h-8 w-px bg-gray-300 mx-2" />
        {/* Logout Button */}
        <button
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-2 rounded-lg shadow transition-colors duration-200"
          title="Logout"
        >
          <span className="hidden md:inline">Logout</span>
          {/* Icon logout (heroicons outline) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
