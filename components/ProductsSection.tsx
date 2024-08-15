import Link from "next/link";
import { Produit } from "@/types";
import Loader from "@/components/Loader";
import ProductGridList from "@/components/ProductGridList";
import { ProductCarouselCard } from "./ProductCarouselCard";

interface ProductsSectionProps {
  produits: Produit[] | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  id: string;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  produits,
  isPending,
  isError,
  error,
  id,
}) => {
  // Fonction pour afficher la liste des produits en grille ou en carousel
  const ProductList = () => {
    // Vérifie si produits est un tableau avant d'utiliser slice
    const produitsToShow = Array.isArray(produits) ? produits.slice(0, 8) : [];
    return (
      <>
        <ProductGridList className="hidden sm:grid" produits={produitsToShow} />
        <div className="block sm:hidden py-4">
          <ProductCarouselCard produits={produitsToShow} />
        </div>
      </>
    );
  };

  // Gestion des états de chargement et d'erreur
  if (isError) {
    return (
      <div className="text-red-600 py-12 text-center">
        Erreur de chargement des produits : {error?.message}. Vérifiez votre
        connexion Internet.
      </div>
    );
  }

  if (isPending) {
    return (
      <Container id={id}>
        <Loader size={28} color="red" />
      </Container>
    );
  }

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
