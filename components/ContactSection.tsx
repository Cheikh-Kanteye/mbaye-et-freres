"use client";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

export default function ContactSection({ id }: { id: string }) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32">
      <motion.div
        className="container flex-col px-4 md:px-6 text-center"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <motion.div className="max-w-xl mx-auto space-y-4">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            variants={sectionVariants}
            transition={{ delay: 0.1 }}
          >
            Contactez-nous
          </motion.h2>
          <motion.p
            className="text-muted-foreground md:text-xl"
            variants={sectionVariants}
            transition={{ delay: 0.2 }}
          >
            Vous avez une question ou souhaitez simplement dire bonjour ?
            Remplissez le formulaire et nous vous répondrons dans les plus brefs
            délais.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          <ContactForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
