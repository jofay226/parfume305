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
    <div>
      <div>
        <label htmlFor="">create brand</label>
        <input
          onChange={(e) => setBrand(e.target.value)}
          type="text"
          value={brand}
        />
        <button
          onClick={craeteBrandHandler}
          className="border-2 border-rose-400 p-2"
        >
          Create Brand
        </button>
      </div>
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center p-6 text-gray-200">
        <section className="w-full max-w-xl bg-[#151922] p-6 rounded-2xl border border-[#262b36] shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Create Perfume</h2>

          <div className="space-y-4">
            {/* NAME */}

            <input
              onChange={formHandler}
              name="name"
              type="text"
              placeholder="Perfume Name"
              className="w-full p-3 rounded-xl bg-[#10141c] border border-[#262b36] focus:outline-none"
            />

            {/* DESCRIPTION */}

            <textarea
              onChange={formHandler}
              name="description"
              placeholder="Perfume Description"
              className="w-full p-3 rounded-xl bg-[#10141c] border border-[#262b36] h-24 resize-none"
            />

            {/* BRAND */}

            <select
              onClick={formHandler}
              name="brandId"
              className="w-full p-3 rounded-xl bg-[#10141c] border border-[#262b36]"
            >
              {brands?.getAllBrands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* VARIANTS */}

            <div className="border border-[#262b36] rounded-xl p-4">
              <h3 className="text-sm text-gray-400 mb-3">Variants</h3>

              <div className="space-y-4">
                {/* 50 ml */}

                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-blue-500" />

                  <span className="w-16">50 ml</span>

                  <select className="p-2 rounded-lg bg-[#10141c] border border-[#262b36]">
                    <option>EDT</option>

                    <option>EDP</option>

                    <option>Parfum</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-24 p-2 rounded-lg bg-[#10141c] border border-[#262b36]"
                  />
                </div>

                {/* 100 ml */}

                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-blue-500" />

                  <span className="w-16">100 ml</span>

                  <select className="p-2 rounded-lg bg-[#10141c] border border-[#262b36]">
                    <option>EDT</option>

                    <option>EDP</option>

                    <option>Parfum</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-24 p-2 rounded-lg bg-[#10141c] border border-[#262b36]"
                  />
                </div>

                {/* 150 ml */}

                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-blue-500" />

                  <span className="w-16">150 ml</span>

                  <select className="p-2 rounded-lg bg-[#10141c] border border-[#262b36]">
                    <option>EDT</option>

                    <option>EDP</option>

                    <option>Parfum</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-24 p-2 rounded-lg bg-[#10141c] border border-[#262b36]"
                  />
                </div>
              </div>
            </div>

            {/* BUTTON */}

            <button
              onClick={createPerfumeHandler}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl font-medium"
            >
              Create Perfume
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
