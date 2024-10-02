import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import ContactForm from "./ContactForm";

export default function ContactSection({ id }: { id: string }) {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container flex-col px-4 md:px-6 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Contactez-nous
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Vous avez une question ou souhaitez simplement dire bonjour ?
            Remplissez le formulaire et nous vous répondrons dans les plus brefs
            délais.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
