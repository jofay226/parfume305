"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CREATE_BRAND = gql`
  mutation CreateBrand($brandName: CreateBrandInput) {
    createBrand(param: $brandName) {
      id
      name
    }
  }
`;

function Page() {
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
    </div>
  );
}

export default Page;
