import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function ContactSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
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
        <form className="mt-8 w-full max-w-md mx-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="name" placeholder="Entrez votre nom" />
            <Input id="email" type="email" placeholder="Entrez votre email" />
          </div>
          <div className="space-y-1">
            <Textarea
              id="message"
              placeholder="Écrivez votre message..."
              className="min-h-[120px]"
            />
          </div>
          <Button type="submit" className="w-full">
            Envoyer
          </Button>
        </form>
      </div>
    </section>
  );
}
