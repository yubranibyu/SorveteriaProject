import { Product } from "@/app/lib/definitions";

type Props = {
  product: Product;
};

export default function Card({ product }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <span className="text-green-600 font-semibold">
        ${product.price}
      </span>
    </div>
  );
}