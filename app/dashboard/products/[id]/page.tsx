import { getProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const id = Number(params.id);

  // 🔥 Validación clave
  if (isNaN(id)) {
    notFound();
  }

  const product = await getProductById(id);

  // 🔥 Si no existe en DB
  if (!product) {
    notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-4">
        
        <h1 className="text-2xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-600">
          {product.description}
        </p>

        <span className="text-green-600 font-semibold text-lg">
          ${product.price}
        </span>

      </div>
    </div>
  );
}