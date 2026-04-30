import { BomItem } from "@/types/order";

export default function BomTable({ bom }: { bom: BomItem[] }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="bg-slate-50 border-b border-gray-200">
            <th className="px-3 py-2 text-[10px] text-left">Item No.</th>
            <th className="px-3 py-2 text-[10px] text-left">Description</th>
            <th className="px-3 py-2 text-center text-[10px]">Qty</th>
            <th className="px-3 py-2 text-center text-[10px]">Price</th>
          </tr>
        </thead>

        <tbody>
          {bom.map((item) => (
            <tr
              key={item.product_id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-3 py-2 font-mono">#{item.product_id}</td>
              <td className="px-3 py-2">{item.title}</td>
              <td className="px-3 py-2 text-center">{item.quantity}</td>
              <td className="px-3 py-2 text-center">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
