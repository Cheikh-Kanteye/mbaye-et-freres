"use client";
import { useQuery } from "@tanstack/react-query";
import { service } from "@prisma/client";
import ServiceList from "../_components/ServiceList";

const fetchServices = async () => {
  const res = await fetch("/api/services");
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
};

const Services = () => {
  const {
    data: services,
    error,
    isPending,
  } = useQuery<service[], Error>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  if (error)
    return <p>Erreur lors du chargement des services: {error.message}</p>;

  return (
    <section className="p-4">
      <ServiceList pending={isPending} data={services || []} />
    </section>
  );
};

export default Services;
