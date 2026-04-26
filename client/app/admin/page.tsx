"use client";

import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ALL_BRANDS } from "../page";

const CREATE_BRAND = gql`
  mutation CreateBrand($brandName: CreateBrandInput) {
    createBrand(param: $brandName) {
      id
      name
    }
  }
`;

const CREATE_PERFUME = gql`
  mutation CreatePerfume($input: CraetePerfumeInput) {
    createPerfume(params: $input) {
      name
      id
    }
  }
`;

function Page() {
  const { data: brands } = useQuery(ALL_BRANDS);
  const [createPerfumeMutation] = useMutation(CREATE_PERFUME);

  const [form, setForm] = useState({
    name: "",
    description: "",
    brandId: "",
    variants: [
      { size: 50, concentrate: "EDT", price: 55 },
      { size: 100, concentrate: "EDP", price: 105 },
      { size: 150, concentrate: "PERFUME", price: 155 },
    ],
  });

  const [brand, setBrand] = useState("");
  const [createBrandMutation] = useMutation(CREATE_BRAND);
  const router = useRouter();

  const craeteBrandHandler = () => {
    if (!brand) {
      alert("you need to fill input");
      return;
    }
    createBrandMutation({
      variables: {
        brandName: {
          name: brand,
        },
      },
    });

    router.push("/");
  };

  const formHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      variants: [...prev.variants],
    }));
  };

  const createPerfumeHandler = () => {
    createPerfumeMutation({
      variables: {
        input: form,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1b2230_0%,_#0f1115_48%,_#090b0f_100%)] p-6 text-gray-200">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="border-b border-white/10 bg-gradient-to-r from-amber-400/10 via-transparent to-rose-400/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
              Admin
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white">
              Brand Management
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-400">
              Add a perfume house here before attaching it to a new product.
            </p>
          </div>

          <div className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-end">
            <div className="flex-1">
              <label
                htmlFor="brand-name"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Brand name
              </label>
              <input
                id="brand-name"
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                value={brand}
                placeholder="Maison Francis Kurkdjian"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-amber-300/70 focus:bg-black/30 focus:ring-4 focus:ring-amber-300/10"
              />
            </div>

            <button
              onClick={craeteBrandHandler}
              className="rounded-2xl bg-gradient-to-r from-amber-300 to-rose-300 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-amber-200/20"
            >
              Create Brand
            </button>
          </div>
        </section>

        <div className="flex items-center justify-center">
          <section className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="border-b border-white/10 bg-gradient-to-r from-amber-400/10 via-transparent to-rose-400/10 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
                Catalog
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Create Perfume
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-400">
                Add the core perfume details, then configure the available
                bottle sizes and pricing.
              </p>
            </div>

            <div className="space-y-5 px-6 py-6">
            {/* NAME */}

            <input
              onChange={formHandler}
              name="name"
              type="text"
              placeholder="Perfume Name"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-amber-300/70 focus:bg-black/30 focus:ring-4 focus:ring-amber-300/10"
            />

            {/* DESCRIPTION */}

            <textarea
              onChange={formHandler}
              name="description"
              placeholder="Perfume Description"
              className="h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-amber-300/70 focus:bg-black/30 focus:ring-4 focus:ring-amber-300/10"
            />

            {/* BRAND */}

            <select
              onClick={formHandler}
              name="brandId"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-amber-300/70 focus:bg-black/30 focus:ring-4 focus:ring-amber-300/10"
            >
              {brands?.getAllBrands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* VARIANTS */}

            <div className="rounded-3xl border border-white/10 bg-black/10 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100/80">
                    Variants
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Configure size, concentration, and price.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* 50 ml */}

                <div className="grid gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[auto_90px_1fr_120px] md:items-center">
                  <input type="checkbox" className="accent-blue-500" />

                  <span className="text-sm font-medium text-gray-200">50 ml</span>

                  <select className="rounded-xl border border-white/10 bg-black/20 p-2.5 text-white outline-none transition focus:border-amber-300/70 focus:ring-4 focus:ring-amber-300/10">
                    <option>EDT</option>

                    <option>EDP</option>

                    <option>Parfum</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-white placeholder:text-gray-500 outline-none transition focus:border-amber-300/70 focus:ring-4 focus:ring-amber-300/10"
                  />
                </div>

                {/* 100 ml */}

                <div className="grid gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[auto_90px_1fr_120px] md:items-center">
                  <input type="checkbox" className="accent-blue-500" />

                  <span className="text-sm font-medium text-gray-200">
                    100 ml
                  </span>

                  <select className="rounded-xl border border-white/10 bg-black/20 p-2.5 text-white outline-none transition focus:border-amber-300/70 focus:ring-4 focus:ring-amber-300/10">
                    <option>EDT</option>

                    <option>EDP</option>

                    <option>Parfum</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-white placeholder:text-gray-500 outline-none transition focus:border-amber-300/70 focus:ring-4 focus:ring-amber-300/10"
                  />
                </div>

                {/* 150 ml */}

                <div className="grid gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[auto_90px_1fr_120px] md:items-center">
                  <input type="checkbox" className="accent-blue-500" />

                  <span className="text-sm font-medium text-gray-200">
                    150 ml
                  </span>

                  <select className="rounded-xl border border-white/10 bg-black/20 p-2.5 text-white outline-none transition focus:border-amber-300/70 focus:ring-4 focus:ring-amber-300/10">
                    <option>EDT</option>

                    <option>EDP</option>

                    <option>Parfum</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-white placeholder:text-gray-500 outline-none transition focus:border-amber-300/70 focus:ring-4 focus:ring-amber-300/10"
                  />
                </div>
              </div>
            </div>

            {/* BUTTON */}

            <button
              onClick={createPerfumeHandler}
              className="w-full rounded-2xl bg-gradient-to-r from-amber-300 to-rose-300 p-3.5 font-semibold text-slate-950 transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-amber-200/20"
            >
              Create Perfume
            </button>
          </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
