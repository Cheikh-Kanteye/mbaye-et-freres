import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
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
              <CarouselItem>
                <Card className="h-full flex flex-col items-center justify-center gap-6 p-8 text-center">
                  <blockquote className="text-lg font-semibold leading-snug md:text-xl md:leading-normal">
                    &ldquo;BMB a été un véritable changement pour notre
                    processus de fabrication. La qualité et la précision de
                    leurs produits sont inégalées.&rdquo;
                  </blockquote>
                  <div className="grid gap-1">
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-muted-foreground">
                      Responsable de Production, ABC Inc.
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="h-full w-full flex flex-col items-center justify-center gap-6 p-8 text-center">
                  <blockquote className="text-lg font-semibold leading-snug md:text-xl md:leading-normal">
                    &ldquo;L&apos;attention aux détails et l&apos;engagement de
                    Metalique envers la satisfaction client sont incomparables.
                    Nous ne pourrions pas être plus satisfaits de leurs produits
                    et services.&rdquo;
                  </blockquote>
                  <div className="grid gap-1">
                    <div className="font-semibold">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">
                      Responsable des Opérations, XYZ Corp.
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="h-full w-full flex flex-col items-center justify-center gap-6 p-8 text-center">
                  <blockquote className="text-lg font-semibold leading-snug md:text-xl md:leading-normal">
                    &ldquo;Metalique a joué un rôle essentiel dans
                    l&apos;optimisation de nos processus de fabrication et
                    l&apos;amélioration de notre efficacité. Leurs produits sont
                    de première qualité.&rdquo;
                  </blockquote>
                  <div className="grid gap-1">
                    <div className="font-semibold">Michael Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      Responsable d&apos;Usine, DEF Industries
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="h-full w-full flex flex-col items-center justify-center gap-6 p-8 text-center">
                  <blockquote className="text-lg font-semibold leading-snug md:text-xl md:leading-normal">
                    &ldquo;Les produits de BMB ont été un véritable changement
                    pour notre entreprise. La durabilité et la précision sont
                    inégalées dans l&apos;industrie.&rdquo;
                  </blockquote>
                  <div className="grid gap-1">
                    <div className="font-semibold">Sarah Lee</div>
                    <div className="text-sm text-muted-foreground">
                      Responsable Qualité, GHI Enterprises
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="ml-3" />
            <CarouselNext className="mr-3" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
