export default function PageLayout({ title, subtitle, hero, gradient, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100">
      <div className={`w-full py-8 px-6 text-center ${gradient}`}>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-white mt-2">{subtitle}</p>
        {hero && (
          <img
            src={hero}
            alt="Hero"
            className="mx-auto mt-4 max-w-xs md:max-w-sm lg:max-w-md"
          />
        )}
      </div>
      <div className="max-w-xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
}
