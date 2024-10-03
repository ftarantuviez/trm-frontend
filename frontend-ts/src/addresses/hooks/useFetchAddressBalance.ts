import { useCallback, useState } from "react";
import { useAddresses } from "../components/AddressesProvider";

import { axios } from "@/common/api/axios";
import { toast } from "sonner";
import { Address } from "@/common/types/Address";
import { formatEther } from "viem";
import { AddressInfo } from "../types/AddressInfo";

export function useFetchAddressBalance() {
  const { setAddresses, addresses } = useAddresses();

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches the balance and transactions for a given address.
   *
   * @param address - The address to fetch the balance and transactions for.
   */
  const fetchAddressBalance = useCallback(
    async (address: Address) => {
      try {
        const doesAddressExist = addresses.some(
          (addressInfo) => addressInfo.address === address
        );

        // We validate that the address is not already in the list
        if (doesAddressExist) {
          toast.error("Address is already in the list.");
          return;
        }

        // We fetch the balance for the address
        const { data: addressInfo } = await axios.get<
          Readonly<{
            message: string;
            result: string;
            status: string;
          }>
        >("/api", {
          params: {
            module: "account",
            action: "balance",
            address,
            tag: "latest",
            apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
          },
        });

        // We create a new address info object
        const newAddress = {
          address,
          balance: BigInt(addressInfo.result),
          balanceInEther: formatEther(BigInt(addressInfo.result)),
          transactions: {
            page: 1,
            data: [],
          },
        } as const satisfies AddressInfo;

        setAddresses([...addresses, newAddress]);
      } catch {
        toast.error("Error fetching address info");
      } finally {
        setIsLoading(false);
      }
    },
    [addresses, setAddresses]
  );

  return { fetchAddressBalance, isLoading };
}
