import React from "react";
import InfoCard from "./InfoCard";
import { infoCards } from "@/constants/contacts";

const InfoCardList = () => {
  return (
    <section className="bg-background py-8">
      <div className="container grid md:grid-flow-col gap-4 py-6 md:py-10 lg:py-14 justify-center">
        {infoCards.map((card, index) => (
          <InfoCard
            key={index}
            iconSrc={card.iconSrc}
            bgColor={card.bgColor}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
};

export default InfoCardList;
