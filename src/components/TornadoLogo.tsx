export default function TornadoLogo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <img
          src="/assets/logotop.png"
          alt="Tornado Logo"
          className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
        />
      </div>

      <div className="mt-6 text-center">
        <img
          src="/assets/typo-c2@2x.png"
          alt="Tornado Logo"
          className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
        />
      </div>
    </div>
  );
}
