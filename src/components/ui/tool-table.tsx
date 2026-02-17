import Link from "next/link";

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
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            {description && <p className="text-muted-foreground mb-6">{description}</p>}

            <div className="w-full overflow-x-auto rounded-xl border border-white/10 shadow-xl bg-[#0B0F19]/50 backdrop-blur-sm">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            {headers.map((header, index) => (
                                <th key={index} className="p-4 font-heading font-bold text-white whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {rows.map((row, index) => (
                            <tr key={index} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium text-white">{row.category}</td>
                                <td className="p-4 text-primary font-semibold">{row.tool}</td>
                                <td className="p-4 text-gray-300">{row.price}</td>
                                <td className="p-4 text-gray-400">{row.whatItDoes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
