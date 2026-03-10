import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import NewInMarket from "@/components/NewInMarket";
import { getFeaturedProperties, getStandardProperties } from "@/lib/properties";
import { cookies } from "next/headers";
import { getDictionary, defaultLocale, Locale, locales } from "@/lib/dictionaries";

const PAGE_SIZE = 6;

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    minPrice?: string;
    maxPrice?: string;
    propertyType?: string;
    beds?: string;
    baths?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));

  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;
  const currentLocale = localeCookie && locales.includes(localeCookie) ? localeCookie : defaultLocale;
  const dict = await getDictionary(currentLocale);

  const hasFilters = Boolean(
    params.query ||
    params.minPrice ||
    params.maxPrice ||
    (params.propertyType && params.propertyType !== "All" && params.propertyType !== "Any Type") ||
    params.beds ||
    params.baths
  );

  const [featuredResult, standardResult] = await Promise.all([
    hasFilters ? Promise.resolve([]) : getFeaturedProperties(),
    getStandardProperties(currentPage, PAGE_SIZE, params),
  ]);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Hero dict={dict.hero} currentType={params.propertyType} />
        {!hasFilters && featuredResult.length > 0 && (
          <FeaturedCollection properties={featuredResult} dict={dict.featured} />
        )}
        <NewInMarket
          properties={standardResult.data}
          currentPage={standardResult.currentPage}
          totalPages={standardResult.totalPages}
          dict={dict.newInMarket}
        />
      </main>
    </>
  );
}
