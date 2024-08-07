import React from "react";
import InfoCard from "./InfoCard";
import { infoCards } from "@/constants/contacts";

const ServicesSection = ({ id }: { id: string }) => {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container flex-col px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Nos Services
        </h2>
        <p className="text-muted-foreground text-base max-w-screen-md mx-auto">
          Vous avez une question ou souhaitez simplement dire bonjour ?
          Remplissez le formulaire et nous vous répondrons dans les plus brefs
          délais.
        </p>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6 justify-center">
          {[...infoCards, ...infoCards.slice(0, 2)].map((card, index) => (
            <InfoCard
              key={index}
              bgColor={card.bgColor}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
