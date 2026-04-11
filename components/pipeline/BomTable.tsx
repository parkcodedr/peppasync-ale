import { ReactNode } from "react";

interface BomItem {
  itemNo: string;
  description: string;
  qty: number;
}

export default function BomTable({ bom }: { bom: BomItem[] }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="bg-slate-50 border-b border-gray-200">
            <th className="px-3 py-2 text-[10px] text-left">Item No.</th>
            <th className="px-3 py-2 text-[10px] text-left">Description</th>
            <th className="px-3 py-2 text-center text-[10px]">Qty</th>
          </tr>
        </thead>

        <tbody>
          {bom.map((item, i) => (
            <tr key={i} className="border-b border-gray-200 last:border-b-0">
              <td className="px-3 py-2 font-mono">{item.itemNo}</td>
              <td className="px-3 py-2">{item.description}</td>
              <td className="px-3 py-2 text-center">{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
