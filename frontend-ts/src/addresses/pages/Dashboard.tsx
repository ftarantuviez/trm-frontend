"use client";

import React, { useState } from "react";
import { AddressesBalances } from "../components/AddressesBalances";
import { AddressesTransactions } from "../components/AddressesTransactions";

import { AddressesCharts } from "../components/AddressesCharts";
import { Address } from "@/common/types/Address";

export const Dashboard: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    undefined
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddressesBalances
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <AddressesTransactions selectedAddress={selectedAddress} />
        <div className="col-span-2">
          <AddressesCharts selectedAddress={selectedAddress} />
        </div>
      </div>
    </div>
  );
};
