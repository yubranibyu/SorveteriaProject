"use client";
import { useActionState } from "react";
import { updateProduct } from "@/app/lib/actions/products_actions";

export default function EditProductForm({ product }: any) {
  const [state, formAction] = useActionState(updateProduct, {
    errors: {},
  });

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Product
      </h2>

      <form action={formAction} className="flex flex-col gap-5">
        
        <input type="hidden" name="id" value={product.id} />

        {/* NAME */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            name="name"
            defaultValue={product.name}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-sm">
              {state.errors.name}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={product.description}
            rows={3}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {state?.errors?.description && (
            <p className="text-red-500 text-sm">
              {state.errors.description}
            </p>
          )}
        </div>

        {/* PRICE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={product.price}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {state?.errors?.price && (
            <p className="text-red-500 text-sm">
              {state.errors.price}
            </p>
          )}
        </div>

        {/* IMAGE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Image URL
          </label>
          <input
            name="imageUrl"
            defaultValue={product.imageUrl}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {state?.errors?.imageUrl && (
            <p className="text-red-500 text-sm">
              {state.errors.imageUrl}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          Update Product
        </button>

        {/* GENERAL ERROR */}
        {state?.message && (
          <p className="text-red-500 text-center mt-2">
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}