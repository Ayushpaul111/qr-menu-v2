const BrandingBar = ({ position = "relative" }) => {
  return (
    <div
      className={`w-full p-1 border-${
        position === "top" ? "b" : "t"
      } text-xs bg-gradient-to-tr from-[#f9f6fe] to-[#ffffff] ${
        position === "top" ? "fixed z-50 top-0" : "sticky bottom-0"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center whitespace-nowrap overflow-hidden">
          <span className="min-w-fit">Created By&nbsp;</span>
          <a
            href="https://ehike.in"
            className="bg-clip-text text-transparent bg-gradient-to-br from-[#723FCD] to-[#DB9FF5] font-bold italic min-w-fit"
          >
            Ehike
          </a>
        </div>
      </div>
    </div>
  );
};

export default BrandingBar;
