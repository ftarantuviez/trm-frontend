"use client";

import React, { useEffect, useRef, useState } from "react";
import { AddressesBalances } from "../components/AddressesBalances";
import { AddressesTransactions } from "../components/AddressesTransactions";

import { AddressesCharts } from "../components/AddressesCharts";
import { Address } from "@/common/types/Address";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAddresses } from "../components/AddressesProvider";
import { useFetchAddressBalance } from "../hooks/useFetchAddressBalance";
import { useFetchAddressTransactions } from "../hooks/useFetchAddressTransactions";

export const Dashboard: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const { addresses } = useAddresses();
  const { fetchAddressBalance } = useFetchAddressBalance();
  const { fetchAddressTransactions } = useFetchAddressTransactions();

  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    undefined
  );

  const cachedAddress = useRef<Address | undefined>(
    address ? Address.ofString(address) : undefined
  );

  // We handle if an address is provided by URL
  useEffect(() => {
    if (address && address !== cachedAddress.current) {
      const validAddress = Address.ofString(address);

      if (!validAddress) {
        toast.error(`Invalid address provided: ${address}`);
        setSelectedAddress(undefined);
        return;
      }

      const addressExists = addresses.some(
        (a) => a.address.toLowerCase() === validAddress.toLowerCase()
      );

      setSelectedAddress(validAddress);
      cachedAddress.current = validAddress;

      if (!addressExists) {
        Promise.all([
          fetchAddressBalance(validAddress),
          fetchAddressTransactions(validAddress),
        ]).catch((error) => {
          console.error("Error fetching address data:", error);
          toast.error("Failed to fetch address data. Please try again.");
        });
      }
    }
  }, [address, addresses, fetchAddressBalance, fetchAddressTransactions]);

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
