import React from "react";
import { useQuery } from "@tanstack/react-query";
import InfoCard from "./InfoCard";
import Loader from "./Loader";
import { service as ServiceType } from "@prisma/client";

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
    isPending,
    isError,
  } = useQuery<ServiceType[]>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  if (isPending) {
    return (
      <Container>
        <Loader color="red" size={32} />
      </Container>
    );
  }

  if (isError) {
    return <p>Erreur lors de la récupération des services</p>; // Gère les erreurs de récupération des données
  }

  return (
    <Container id={id}>
      {Array.isArray(services) &&
        services?.map((service, index) => (
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
          Vous avez une question ou souhaitez simplement dire bonjour ?
          Remplissez le formulaire et nous vous répondrons dans les plus brefs
          délais.
        </p>
        <div className="flex flex-wrap justify-center gap-6 py-6">
          {children}
        </div>
      </div>
    </section>
  );
};
