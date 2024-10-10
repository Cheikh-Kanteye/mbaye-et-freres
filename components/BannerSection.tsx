"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BannerSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.1,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-banner w-full h-[65vh] flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="bg-cover bg-center h-full"
          style={{ backgroundImage: "url(/path-to-your-image.jpg)" }}
        />
      </div>
      <div className="relative z-10 container flex flex-col items-start justify-center h-full px-6 md:px-12 lg:px-24">
        <motion.h1
          className="text-4xl font-['Rubik'] lg:text-5xl text-foreground font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <span className="block text-xl font-medium text-primary">
            Bienvenue chez
          </span>
          Mbaye & Frères
        </motion.h1>
        <motion.p
          className="max-w-md text-slate-700 mt-4 text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
        >
          Redéfinissez vos espaces avec notre expertise et notre passion pour la
          qualité. Ensemble, réalisons vos projets les plus ambitieux.
        </motion.p>
      </div>
    </section>
  );
};

export default BannerSection;
