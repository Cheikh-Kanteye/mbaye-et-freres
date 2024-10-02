import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const disableBtn = !isValid || isLoading;

  const onSubmit = async (data: ContactFormData) => {
    console.log({ data });

    setIsLoading(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Envoi réussi");
      } else {
        toast.error(`Échec de l'envoi, statut: ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      toast.error("Erreur lors de l'envoi du formulaire");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 max-w-sm mt-4 w-full"
    >
      <Input {...register("name")} placeholder="Enter your name" />
      <Input
        type="email"
        {...register("email")}
        placeholder="Enter your email"
      />
      <Textarea {...register("message")} placeholder="Enter your message" />

      <Button
        type="submit"
        className={`w-full ${
          disableBtn ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
        disabled={disableBtn}
      >
        {isLoading ? "Loading..." : "Send to me"}
      </Button>
    </form>
  );
};

export default ContactForm;
