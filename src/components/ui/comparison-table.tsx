import { Check, X } from "lucide-react";

interface ComparisonTableProps {
    headers: string[];
    rows: (string | boolean)[][];
    rowHeaders: string[];
}

export function ComparisonTable({ headers, rows, rowHeaders }: ComparisonTableProps) {
    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-gold-soft bg-paper/70">
            <table className="w-full  text-left text-sm">
                <thead>
                    <tr className="border-b border-gold-soft bg-paper/70">
                        <th className="p-4 font-heading font-bold text-ink min-w-[150px]">Feature</th>
                        {headers.map((header, index) => (
                            <th key={index} className="p-4 font-bold text-ink min-w-[150px] whitespace-nowrap">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gold-soft/70">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-sand/70 transition-colors">
                            <td className="p-4 font-medium text-body">{rowHeaders[rowIndex]}</td>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="p-4 text-body">
                                    {typeof cell === "boolean" ? (
                                        cell ? (
                                            <Check className="w-5 h-5 text-teal-deep" />
                                        ) : (
                                            <X className="w-5 h-5 text-quiet/70" />
                                        )
                                    ) : (
                                        cell
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
