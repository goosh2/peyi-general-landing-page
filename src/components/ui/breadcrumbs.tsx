import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
    items: { label: string; href: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
                <li>
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-white/20" />
                        {index === items.length - 1 ? (
                            <span className="text-white font-medium" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link href={item.href} className="hover:text-primary transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
            {/* Schema markup handled in parent Page layout or component if needed, 
                but Breadcrumbs typically just render. The LD-JSON is separate. */}
        </nav>
    );
}
