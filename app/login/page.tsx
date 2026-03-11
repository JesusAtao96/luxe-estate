import { cookies } from "next/headers";
import { getDictionary, defaultLocale, Locale, locales } from "@/lib/dictionaries";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;
  const currentLocale = localeCookie && locales.includes(localeCookie) ? localeCookie : defaultLocale;
  const dict = await getDictionary(currentLocale);

  return <LoginForm dict={dict.login} />;
}
