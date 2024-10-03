import { axios } from "@/common/api/axios";
import { Address } from "@/common/types/Address";
import { useCallback, useState } from "react";
import { Transaction } from "../types/Transaction";
import { useAddresses } from "../components/AddressesProvider";
import { AddressInfo } from "../types/AddressInfo";
import { toast } from "sonner";

export function useFetchAddressTransactions() {
  const { addresses, setAddresses } = useAddresses();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddressTransactions = useCallback(
    async (address: Address) => {
      try {
        setIsLoading(true);

        const addressInfo = addresses.find((addr) => addr.address === address);

        // This should never happen, it's only here to satisfy typescript
        if (!addressInfo) {
          toast.error("Address not found");
          return;
        }

        const { data } = await axios.get<
          Readonly<{
            status: string;
            message: string;
            result: ReadonlyArray<Transaction>;
          }>
        >("/api", {
          params: {
            module: "account",
            action: "txlist",
            address,
            startblock: 0,
            endblock: 99999999,
            page: addressInfo.transactions.page,
            offset: 10,
            sort: "asc",
            apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
          },
        });

        // We update the transactions for the address
        setAddresses((prevAddresses) =>
          prevAddresses.map((addr) => {
            if (addr.address === address) {
              return {
                ...addr,
                transactions: {
                  page: addr.transactions.page + 1,
                  data: [...addr.transactions.data, ...data.result],
                },
              } as const satisfies AddressInfo;
            }
            return addr;
          })
        );
      } catch {
        toast.error("Error fetching address transactions");
      } finally {
        setIsLoading(false);
      }
    },
    [addresses, setAddresses]
  );

  return {
    fetchAddressTransactions,
    isLoading,
  };
}
