"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ShoppingCart as ShoppingCartIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";

export default function ShoppingCart() {
  const { cartItems, removeFromCart } = useCart();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { register, handleSubmit } = useForm();

  const handleWhatsApp = () => {
    if (phoneNumber) {
      let message = `Voici ma commande :\n\n`;
      cartItems.forEach(({ produit }) => {
        message += `${produit.reference} - ${produit.description}\nFamille: ${
          produit.familles?.nom || ""
        }\nCatégorie: ${produit.familles?.categories?.nom || ""}\n\n`;
      });
      message += `\nTotal: ${cartItems.length} article(s)`;

      // Utilisation du protocole WhatsApp pour l'application mobile
      const mobileURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      // Utilisation de WhatsApp Web pour les environnements desktop
      const webURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      // Vérifier si l'application WhatsApp est installée
      window.open(mobileURL, "_blank") || window.open(webURL, "_blank");
      setPhoneNumber(""); // Réinitialiser le numéro de téléphone
    }
  };

  const handleEmail = () => {
    let message = `Voici ma commande :\n\n`;
    cartItems.forEach(({ produit }) => {
      message += `${produit.reference} - ${produit.description}\nFamille: ${
        produit.familles?.nom || ""
      }\nCatégorie: ${produit.familles?.categories?.nom || ""}\n\n`;
    });
    message += `\nTotal: ${cartItems.length} article(s)`;
    window.open(
      `mailto:support@votreentreprise.com?subject=Commande&body=${encodeURIComponent(
        message
      )}`
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="relative border-none p-0 bg-primary-foreground rounded-full aspect-square"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground shadow-sm text-xs flex items-center justify-center">
            {cartItems.length}
          </Badge>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>Panier</DrawerTitle>
          <DrawerDescription>
            {cartItems.length} article{cartItems.length !== 1 && "s"} dans votre
            panier
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-auto">
          <div className="grid gap-4 p-4">
            {cartItems.map(({ produit }) => (
              <div
                key={produit.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
              >
                <Image
                  src={produit.image_url || "/default-image.jpg"}
                  alt={produit.reference}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <div className="grid gap-1">
                  <h4 className="font-medium">{produit.reference}</h4>
                  <p>
                    {produit.familles?.categories?.nom || ""} -{" "}
                    {produit.familles?.nom || ""}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(produit.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter className="border-t">
          <form
            onSubmit={handleSubmit(handleWhatsApp)}
            className="w-full flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Entrez votre numéro de téléphone"
              {...register("phoneNumber", { required: true })}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border p-2 rounded"
            />
            <Button
              type="submit"
              className="w-full rounded-sm bg-green-500 text-white"
            >
              Contacter via WhatsApp
            </Button>
          </form>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              onClick={handleEmail}
              className="w-full rounded-sm bg-blue-500 text-white"
            >
              Contacter par Email
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
