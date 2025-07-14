const RightContent = () => {
  return (
    // Hanya tampil di layar besar (lg ke atas)
    <div className="hidden lg:flex flex-1 bg-blue-500 relative overflow-hidden">
      <img
        src="https://cdn11.bigcommerce.com/s-3uwekq06zr/images/stencil/1280x1280/products/257/463/fluorescent_orange__07960.1671665265.jpg?c=2"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="relative z-10 flex flex-col justify-center items-start px-12 py-8 gap-7 w-full h-full bg-gradient-to-br from-blue-700/40 to-blue-900/60">
        <div className="flex flex-col items-start gap-3">
          <h1 className="font-sans text-4xl font-bold leading-tight text-white drop-shadow-md">
            Bridging the Digital Divide.
          </h1>
          <span className="font-sans text-xl font-normal leading-tight text-gray-100 drop-shadow">
            Membuka akses layanan keuangan digital untuk semua kalangan.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightContent;
