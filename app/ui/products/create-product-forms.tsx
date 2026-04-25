"use client";


import { useActionState } from "react";
import { createProduct } from "../../lib/actions/products_actions";
import { Button } from "../button";

export default function CreateProductForm() {
  const [state, formAction] = useActionState(createProduct, {
    
    errors: {},
  });

  const labelStyles =
    "block text-sm font-medium text-gray-700";

  const inputStyles =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

  const iconStyles =
    "h-5 w-5 text-gray-400 absolute right-3 top-9";

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex-1 rounded-3xl bg-white px-8 pb-10 pt-10 shadow-sm border border-slate-100">
        <p className="mb-8 text-sm text-center text-slate-500 italic">
          Vamos criar um novo produto! Preencha os campos abaixo e clique em "Criar produto" para adicionar ao catálogo.
        </p>

        {/* Name */}
        <div className="relative">
          <label className={labelStyles} htmlFor="name">
            Nome do produto
          </label>
          <input
            className={inputStyles}
            id="name"
            name="name"
            type="text"
            required
          />
          

          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* Product Description */}
        <div className="relative">
          <label className={labelStyles} htmlFor="description">
            Descriçao do produto
          </label>
          <input
            className={inputStyles}
            id="description"
            name="description"
            type="text"
            required
          />
          

          {state.errors?.description && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.description[0]}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="relative">
          <label className={labelStyles} htmlFor="price">
            Preço
          </label>
          <input
            className={inputStyles}
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
          />
          

          {state.errors?.price && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.price[0]}
            </p>
          )}
        </div>


        {/*Image */}
        <div className="relative">
          <label className={labelStyles} htmlFor="imageUrl">
            Url da imagem
          </label>
          <input
            className={inputStyles}
            id="imageUrl"
            name="imageUrl"
            type="text"
            required
          />
         
          {state.errors?.imageUrl && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.imageUrl[0]}
            </p>
          )}
        </div>

        <Button variant="primary">Criar produto</Button>
      </div>
    </form>
  );
}
    
