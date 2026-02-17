import { Check, X } from "lucide-react";

interface ComparisonTableProps {
    headers: string[];
    rows: (string | boolean)[][];
    rowHeaders: string[];
}

export function ComparisonTable({ headers, rows, rowHeaders }: ComparisonTableProps) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-white/10 shadow-xl bg-[#0B0F19]/50 backdrop-blur-sm">
            <table className="w-full  text-left text-sm">
                <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                        <th className="p-4 font-heading font-bold text-white min-w-[150px]">Feature</th>
                        {headers.map((header, index) => (
                            <th key={index} className="p-4 font-bold text-white min-w-[150px] whitespace-nowrap">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-medium text-gray-300">{rowHeaders[rowIndex]}</td>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="p-4 text-gray-400">
                                    {typeof cell === "boolean" ? (
                                        cell ? (
                                            <Check className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <X className="w-5 h-5 text-red-500/50" />
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
