"use client";
const BannerSection = () => {
  return (
    <section className="home-banner w-dvw h-[50vh] flex items-center justify-center relative">
      <div className="relative z-10 container flex flex-col items-start justify-center h-full">
        <h1 className="text-4xl lg:text-5xl text-foreground font-bold">
          <span className="block text-xl font-medium text-primary">
            Bienvenue chez
          </span>
          Mbaye & Frères
        </h1>
        <p className="max-w-md text-slate-700 mt-4">
          Redéfinissez vos espaces avec notre expertise et notre passion pour la
          qualité. Ensemble, réalisons vos projets les plus ambitieux.
        </p>
      </div>
    </section>
  );
};

export default BannerSection;
