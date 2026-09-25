interface ToolTableProps {
    title: string;
    description?: string;
    headers: string[];
    rows: {
        category: string;
        tool: string;
        price: string;
        whatItDoes: string;
    }[];
}

export function ToolTable({ title, description, headers, rows }: ToolTableProps) {
    return (
        <div className="w-full my-12">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-3 text-balance">{title}</h3>
            {description && <p className="text-muted-foreground mb-6">{description}</p>}

            <div className="w-full overflow-x-auto rounded-2xl border border-gold-soft bg-paper/70">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-gold-soft bg-paper/70">
                            {headers.map((header, index) => (
                                <th key={index} className="p-4 font-heading font-bold text-ink whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gold-soft/70">
                        {rows.map((row, index) => (
                            <tr key={index} className="hover:bg-sand/70 transition-colors">
                                <td className="p-4 font-medium text-ink">{row.category}</td>
                                <td className="p-4 text-primary font-semibold">{row.tool}</td>
                                <td className="p-4 text-body">{row.price}</td>
                                <td className="p-4 text-body">{row.whatItDoes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
