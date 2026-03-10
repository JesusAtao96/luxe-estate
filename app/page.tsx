import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import NewInMarket from "@/components/NewInMarket";
import { getFeaturedProperties, getStandardProperties } from "@/lib/properties";

const PAGE_SIZE = 6;

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));

  const [featuredResult, standardResult] = await Promise.all([
    getFeaturedProperties(),
    getStandardProperties(currentPage, PAGE_SIZE),
  ]);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Hero />
        <FeaturedCollection properties={featuredResult} />
        <NewInMarket
          properties={standardResult.data}
          currentPage={standardResult.currentPage}
          totalPages={standardResult.totalPages}
        />
      </main>
    </>
  );
}
