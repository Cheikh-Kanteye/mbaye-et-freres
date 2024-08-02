import Link from "next/link";
import { Produit } from "@/types";
import Loader from "@/components/Loader";
import ProductGridList from "@/components/ProductGridList";
import { ProductCarouselCard } from "./ProductCarouselCard";

interface ProductsSectionProps {
  produits: Produit[];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  produits,
  isPending,
  isError,
  error,
}) => {
  function ProductList() {
    return (
      <>
        <ProductGridList
          className="hidden sm:grid"
          produits={produits.slice(0, 8)}
        />
        <div className="block sm:hidden py-4">
          <ProductCarouselCard produits={produits.slice(0, 8)} />
        </div>
      </>
    );
  }

  if (isError)
    return (
      <div className="text-red-600">
        Erreur de chargement des produits : {error?.message}
      </div>
    );

  return (
    <section>
      <div className="container flex-col mt-8">
        <h2 className="text-3xl font-['Rubik'] tracking-tighter md:text-4xl">
          Decouvrez nos produits
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-base/relaxed text-center">
          Découvrez notre vaste sélection de produits, incluant matériaux de
          construction, accessoires, et services spécialisés. Trouvez des
          solutions de qualité pour tous vos projets.
        </p>
        {isPending ? (
          <Loader size={28} color="red" />
        ) : (
          <div className="flex flex-col items-center">
            {produits.length > 0 ? <ProductList /> : null}
            <Link href="/categories" className="mt-4">
              <span className="px-4 py-3 rounded-sm bg-primary text-primary-foreground border border-primary hover:bg-transparent hover:text-primary duration-300 transition-all">
                Découvrir plus
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
