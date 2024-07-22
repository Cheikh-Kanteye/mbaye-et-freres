import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const CommandCard = () => {
  return (
    <Card className="max-w-[20rem] w-full">
      <CardHeader>
        <CardTitle>Commande</CardTitle>
        <CardDescription>
          Passer votre commande en toute securité.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex space-x-1.5">
              <Input
                type="number"
                id="name"
                placeholder="Quantité a commandé"
              />
              <Button>Ajouter au panier</Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
};

export default CommandCard;
