"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loginSchema, LoginFormInputs } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import Loader from "@/components/Loader";

async function loginUser(data: LoginFormInputs) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || "Erreur lors de la connexion");
  }

  const result = await response.json();
  localStorage.setItem("token", result.token);
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      // Afficher un message de succès et rediriger vers la page d'administration
      alert("Connexion réussie !");
      router.push("/admin");
    },
    onError: (error: Error) => {
      // Affiche les erreurs spécifiques renvoyées par le serveur
      setLoginError(error.message || "Erreur lors de la connexion");
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    setLoginError(null); // Réinitialise les erreurs avant la nouvelle tentative
    mutation.mutate(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) router.push("/admin");
  }, [router]);

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-foreground">
            Bienvenue chez
            <span className="block text-3xl text-primary">
              Ets Mbaye & Frères
            </span>
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Vous êtes sur la page d&apos;administration. Pour continuer,
            veuillez vous connecter à votre compte.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email" className="sr-only">
              Adresse e-mail
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Adresse e-mail"
              {...register("email")}
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-primary placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Mot de passe"
              {...register("password")}
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-primary placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember-me" />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-muted-foreground"
              >
                Se souvenir de moi
              </Label>
            </div>
            <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-primary hover:text-primary-foreground"
                prefetch={false}
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader size={18} color="white" />
              ) : (
                "Se connecter"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
