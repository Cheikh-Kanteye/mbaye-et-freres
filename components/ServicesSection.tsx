import React from "react";
import { useQuery } from "@tanstack/react-query";
import InfoCard from "./InfoCard";
import { service as ServiceType } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";

const fetchServices = async () => {
  const response = await fetch("/api/services");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des services");
  }
  return response.json();
};

const ServicesSection = ({ id }: { id: string }) => {
  const {
    data: services,
    isLoading,
    isError,
  } = useQuery<ServiceType[]>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  if (isLoading) {
    return (
      <Container id={id}>
        <Skeleton className="w-60 h-12" />
        <Skeleton className="w-48 h-12" />
        <Skeleton className="w-52 h-12" />
        <Skeleton className="w-56 h-12" />
        <Skeleton className="w-44 h-12" />
        <Skeleton className="w-44 h-12" />
        <Skeleton className="w-44 h-12" />
      </Container>
    );
  }

  if (isError) {
    return <p>Erreur lors de la récupération des services</p>;
  }

  return (
    <Container id={id}>
      {Array.isArray(services) &&
        services.map((service, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 max-w-sm"
          >
            <InfoCard
              title={service.nom}
              description={service.description as string}
            />
          </div>
        ))}
    </Container>
  );
};

export default ServicesSection;

const Container = ({
  id,
  children,
}: {
  id?: string;
  children?: React.ReactNode;
}) => {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container flex-col px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Nos Services
        </h2>
        <p className="text-muted-foreground text-base max-w-screen-md mx-auto">
          Découvrez nos services spécialisés conçus pour répondre à vos besoins.
          Nous vous proposons une gamme complète de prestations pour vous aider
          dans vos projets.
        </p>
        <div className="flex flex-wrap justify-center gap-6 py-6">
          {children}
        </div>
      </div>
    </section>
  );
};
