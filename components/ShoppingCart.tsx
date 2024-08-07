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
import { ShoppingCart, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";

export default function ShoppinCart() {
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
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      );
      setPhoneNumber(""); // Réinitialiser le numéro de téléphone
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="relative border-none p-0 bg-primary-foreground rounded-full aspect-square"
        >
          <ShoppingCart className="w-5 h-5" />
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
            <Button type="submit" className="w-full rounded-sm">
              Continuer sur WhatsApp
            </Button>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
