import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    if (totalPages <= 1) return null;

    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
        <div className="mt-12 flex items-center justify-center gap-4">
            {hasPrev ? (
                <Link
                    href={`?page=${prevPage}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md text-sm"
                >
                    <span className="material-icons text-sm">arrow_back</span>
                    Anterior
                </Link>
            ) : (
                <span className="flex items-center gap-2 px-5 py-2.5 bg-white border border-nordic-dark/5 text-nordic-dark/30 font-medium rounded-lg text-sm cursor-not-allowed">
                    <span className="material-icons text-sm">arrow_back</span>
                    Anterior
                </span>
            )}

            <span className="text-sm font-medium text-nordic-muted tabular-nums">
                Página{" "}
                <span className="text-nordic-dark font-semibold">{currentPage}</span>{" "}
                de{" "}
                <span className="text-nordic-dark font-semibold">{totalPages}</span>
            </span>

            {hasNext ? (
                <Link
                    href={`?page=${nextPage}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md text-sm"
                >
                    Siguiente
                    <span className="material-icons text-sm">arrow_forward</span>
                </Link>
            ) : (
                <span className="flex items-center gap-2 px-5 py-2.5 bg-white border border-nordic-dark/5 text-nordic-dark/30 font-medium rounded-lg text-sm cursor-not-allowed">
                    Siguiente
                    <span className="material-icons text-sm">arrow_forward</span>
                </span>
            )}
        </div>
    );
}
