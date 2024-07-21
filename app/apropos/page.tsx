import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main>
      <header className="p-3">
        <div className="h-[400px] rounded-xl overflow-hidden about flex items-end">
          <div className="container flex-col items-start py-6">
            <p className="text-primary-foreground font-semibold">
              À Propos de Nous
            </p>
            <h3 className="text-primary text-4xl font-bold mt-2">
              Qui sommes-nous ?
            </h3>
            <p className="max-w-screen-md text-base text-accent">
              Bienvenue chez Ets Mbaye et Frères, une entreprise de renom
              spécialisée dans la menuiserie aluminium et la miroiterie. Depuis
              notre création, nous nous engageons à offrir des produits et
              services de haute qualité qui répondent aux besoins spécifiques de
              nos clients, qu&apos;il s&apos;agisse de projets résidentiels,
              commerciaux ou industriels.
            </p>
          </div>
        </div>
      </header>

      <section className="min-h-[60dvh] container lg:text-center flex-col py-6">
        <div className="py-6">
          <h2 className="text-primary text-2xl font-semibold">Notre Mission</h2>
          <p className="max-w-screen-md text-sm text-slate-700 mt- text-justify sm:text-center">
            Chez Ets Mbaye et Frères, notre mission est de transformer vos
            visions en réalité grâce à notre expertise en menuiserie aluminium.
            Nous nous efforçons de fournir des solutions durables, esthétiques
            et fonctionnelles qui améliorent non seulement l&apos;apparence de
            vos espaces mais aussi leur valeur et leur fonctionnalité.
          </p>
        </div>
        <Image
          src={"/images/company.jpg"}
          alt="image"
          width={600}
          height={600}
          className="max-w-[720px] w-full aspect-video rounded-sm"
        />
      </section>
    </main>
  );
};

export default page;
