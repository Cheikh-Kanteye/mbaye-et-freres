"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutSection = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      id="about"
      className="w-full grid md:grid-cols-2 lg:min-h-[75dvh] relative bg-primary"
    >
      <motion.div
        className="bg-[url('/images/pattern.png')] py-20 px-6 md:px-20 text-primary-foreground relative z-10"
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        variants={textVariants}
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-['rubik'] mb-4"
          variants={textVariants}
          transition={{ delay: 0.1 }}
        >
          Qui sommes-nous
        </motion.h2>
        <motion.p
          className="text-base text-primary-foreground"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          Ets Mbaye et Frères est une entreprise leader dans le domaine de la
          menuiserie aluminium et de la miroiterie. Depuis notre fondation, nous
          nous consacrons à fournir des produits et services d&apos;exception,
          conçus pour répondre aux exigences spécifiques de nos clients,
          qu&apos;ils soient engagés dans des projets résidentiels, commerciaux
          ou industriels. Notre engagement envers l&apos;excellence se reflète
          dans chaque réalisation, assurant qualité et satisfaction à chaque
          étape.
        </motion.p>
        <motion.div
          className="about-btn mt-4"
          variants={buttonVariants}
          transition={{ delay: 0.3 }}
        >
          <Link href={"/apropos"}>En savoir plus</Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="apropos bg-cover relative hidden md:block z-0"
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        variants={imageVariants}
        viewport={{ once: false }}
      >
        {/* Vous pouvez ajouter l'image ici */}
      </motion.div>
    </section>
  );
};

export default AboutSection;
