import Link from "next/link";
import { Produit } from "@/types";
import ProductGridList from "@/components/ProductGridList";
import { ProductCarouselCard } from "./ProductCarouselCard";

interface ProductsSectionProps {
  produits: Produit[] | undefined;
  id: string;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ produits, id }) => {
  // Fonction pour afficher la liste des produits en grille ou en carousel
  const ProductList = () => {
    // Vérifie si produits est un tableau avant d'utiliser slice
    const produitsToShow = Array.isArray(produits)
      ? produits
          .sort(() => Math.random() - 0.5) // Mélange aléatoirement les produits
          .slice(0, 10) // Garde les 10 premiers produits après mélange
      : [];
    return (
      <>
        <ProductGridList className="hidden sm:grid" produits={produitsToShow} />
        <div className="block sm:hidden py-4">
          <ProductCarouselCard produits={produitsToShow} />
        </div>
      </>
    );
  };

  // Retourne null si aucun produit n'est disponible
  if (!Array.isArray(produits) || produits.length === 0) {
    return null;
  }

  // Affichage principal avec la liste de produits
  return (
    <Container id={id}>
      <div className="flex flex-col items-center">
        <ProductList />
        <Link href="/categories">
          <span className="mt-4 px-4 py-3 rounded-sm bg-primary text-primary-foreground border border-primary hover:bg-transparent hover:text-primary duration-300 transition-all">
            Découvrir plus
          </span>
        </Link>
      </div>
    </Container>
  );
};

export default ProductsSection;

// Composant Container pour l'encapsulation du contenu
interface ContainerProps {
  id?: string;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ id, children }) => (
  <section id={id} className="py-6 md:py-10 lg:py-14">
    <div className="container flex flex-col items-center px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
        Découvrez nos produits
      </h2>
      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-base text-center">
        Découvrez notre vaste sélection de produits, incluant matériaux de
        construction, accessoires, et services spécialisés. Trouvez des
        solutions de qualité pour tous vos projets.
      </p>
      {children}
    </div>
  </section>
);
