"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { signIn } from "next-auth/react";
import { LoginFormInputs, loginSchema } from "@/lib/validation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

async function loginUser(data: LoginFormInputs) {
  const response = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (response?.error) {
    throw new Error(response.error);
  }

  if (!response?.ok) {
    throw new Error("Erreur lors de la connexion");
  }
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setRedirecting(true);
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000); // Délai pour afficher le message de redirection
    },
    onError: (error: Error) => {
      setServerError("Email ou mot de passe incorrect");
      console.log(error);
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    setServerError(null);
    setRedirecting(false); // Réinitialise l'état de redirection avant la soumission
    mutation.mutate(data);
  };

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
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="Adresse e-mail"
              className="form-input"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="relative">
            <Label htmlFor="password" className="sr-only">
              Mot de passe
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                className="form-input"
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {serverError && (
            <div className="text-red-500 text-sm">{serverError}</div>
          )}
          {redirecting && (
            <div className="text-green-500 text-sm">
              Connexion réussie. Vous allez être redirigé...
            </div>
          )}
          <div className="flex items-center justify-end">
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
          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending || redirecting}
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
};

export default Form;
