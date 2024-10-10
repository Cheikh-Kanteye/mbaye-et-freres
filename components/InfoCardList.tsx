import React from "react";
import InfoCard from "./InfoCard";
import { infoCards } from "@/constants/contacts";
import { motion } from "framer-motion";

const InfoCardList: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, translateY: 20 },
    visible: { opacity: 1, translateY: 0 },
  };

  return (
    <section className="bg-background py-8">
      <div className="container grid md:grid-flow-col gap-4 py-6 md:py-10 lg:py-14 justify-center">
        {infoCards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            transition={{
              duration: 0.6,
              delay: index * 0.3, // Délai basé sur l'index
            }}
            className="flex justify-center"
            viewport={{ once: false }} // Répéter l'animation chaque fois que l'élément entre dans la vue
          >
            <InfoCard
              iconSrc={card.iconSrc}
              bgColor={card.bgColor}
              title={card.title}
              description={card.description}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InfoCardList;
