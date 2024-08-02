import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "BMB a été un véritable changement pour notre processus de fabrication. La qualité et la précision de leurs produits sont inégalées.",
    author: "John Doe",
    position: "Responsable de Production, ABC Inc.",
  },
  {
    quote:
      "L'attention aux détails et l'engagement de Metalique envers la satisfaction client sont incomparables. Nous ne pourrions pas être plus satisfaits de leurs produits et services.",
    author: "Jane Smith",
    position: "Responsable des Opérations, XYZ Corp.",
  },
  {
    quote:
      "Metalique a joué un rôle essentiel dans l'optimisation de nos processus de fabrication et l'amélioration de notre efficacité. Leurs produits sont de première qualité.",
    author: "Michael Johnson",
    position: "Responsable d'Usine, DEF Industries",
  },
  {
    quote:
      "Les produits de BMB ont été un véritable changement pour notre entreprise. La durabilité et la précision sont inégalées dans l'industrie.",
    author: "Sarah Lee",
    position: "Responsable Qualité, GHI Enterprises",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#fff7f7] to-background">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-['Rubik'] tracking-tighter md:text-4xl">
              Ce Que Disent Nos Clients
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-base/relaxed">
              Découvrez les avis des leaders de l&apos;industrie qui font
              confiance à BMB pour faire fonctionner leurs opérations.
            </p>
          </div>
          <Carousel className="md:w-full w-[80dvw] max-w-screen-lg mx-auto">
            <CarouselContent className="w-full gap-2 justify-start pl-8 lg:pl-10">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="h-full flex flex-col items-center justify-center gap-6 p-8 text-center bg-gradient-to-br to-[#fff7f7]from-background border-[#ffd2d2]">
                    <blockquote className="text-lg font-semibold leading-snug md:text-xl md:leading-normal">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="grid gap-1">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.position}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-3" />
            <CarouselNext className="mr-3" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
