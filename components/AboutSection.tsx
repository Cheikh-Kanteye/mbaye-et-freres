import Image from "next/image";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full grid md:grid-cols-2 lg:min-h-[75dvh] relative bg-primary"
    >
      <div className="bg-[url('/images/pattern.png')] py-20 px-6 md:px-20 text-primary-foreground relative z-10">
        <h2 className="text-6xl font-['rubik'] mb-4">Qui somme nous</h2>
        <p className="text-base text-primary-foreground">
          Ets Mbaye et Frères est une entreprise leader dans le domaine de la
          menuiserie aluminium et de la miroiterie. Depuis notre fondation, nous
          nous consacrons à fournir des produits et services d&apos;exception,
          conçus pour répondre aux exigences spécifiques de nos clients,
          qu&apos;ils soient engagés dans des projets résidentiels, commerciaux
          ou industriels. Notre engagement envers l&apos;excellence se reflète
          dans chaque réalisation, assurant qualité et satisfaction à chaque
          étape.
        </p>
        <div className="about-btn mt-4">
          <Link href={"/apropos"}>En savoir plus</Link>
        </div>
      </div>
      <div className="apropos bg-cover relative hidden md:block z-0"></div>
    </section>
  );
};

export default AboutSection;
