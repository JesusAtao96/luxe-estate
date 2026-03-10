'use client'

import { useTransition } from 'react'
import { setLanguage } from '@/app/actions'
import { Locale } from '@/lib/dictionaries'

export default function LanguageSelector({ currentLocale }: { currentLocale: Locale }) {
    const [isPending, startTransition] = useTransition()

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const locale = e.target.value
        startTransition(() => {
            setLanguage(locale)
        })
    }

    return (
        <select
            value={currentLocale}
            onChange={onChange}
            disabled={isPending}
            className="bg-transparent text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm outline-none cursor-pointer border-none"
        >
            <option value="es">🇪🇸 ES</option>
            <option value="en">🇺🇸 EN</option>
            <option value="fr">🇫🇷 FR</option>
        </select>
    )
}
