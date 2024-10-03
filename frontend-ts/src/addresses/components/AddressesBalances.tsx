"use client";

import { Button } from "@/ui/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/Card";
import { Input } from "@/ui/components/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/Table";
import React, { useCallback, useState, useMemo } from "react";
import { useAddresses } from "./AddressesProvider";
import { useFetchAddressBalance } from "../hooks/useFetchAddressBalance";
import { AddressInfo } from "../types/AddressInfo";
import { cn } from "@/ui/lib/utils";
import { Address } from "@/common/types/Address";
import { Numbers } from "@/common/utils/Numbers";
import { CopyButton } from "@/ui/components/CopyButton";
import { useFetchAddressTransactions } from "../hooks/useFetchAddressTransactions";
import { toast } from "sonner";
import { Separator } from "@/ui/components/Separator";

export const AddressesBalances: React.FunctionComponent<{
  selectedAddress: Address | undefined;
  setSelectedAddress: (address: Address | undefined) => void;
}> = ({ selectedAddress, setSelectedAddress }) => {
  const { addresses } = useAddresses();
  const { fetchAddressTransactions } = useFetchAddressTransactions();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { fetchAddressBalance, isLoading } = useFetchAddressBalance();
  const [isValidAddress, setIsValidAddress] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  // We define the number of items in the table
  const itemsPerPage = 10;

  // We handle the pagination of the addresses
  const paginatedAddresses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return addresses.slice(startIndex, endIndex);
  }, [addresses, currentPage]);

  // We fetch the transactions of the selected address
  const handleSelectAddress = useCallback(
    (address: AddressInfo) => {
      setSelectedAddress(address.address);
      if (
        address.transactions.data.length === 0 &&
        address.address !== selectedAddress
      ) {
        fetchAddressTransactions(address.address);
      }
    },
    [setSelectedAddress, fetchAddressTransactions, selectedAddress]
  );

  // We fetch the balance of the new address prompted
  const handleAddAddress = useCallback(() => {
    const address = Address.ofString(searchTerm);

    // We validate that the address is an Ethereum address
    if (!address) {
      setIsValidAddress(false);
      return;
    }

    setIsValidAddress(true);
    fetchAddressBalance(address).then(() => {
      toast.success("Address added successfully");
      setSearchTerm("");
    });
  }, [searchTerm, fetchAddressBalance]);

  return (
    <Card className="mb-4 h-full">
      <CardHeader>
        <CardTitle>Search Addresses</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <form
          className="flex items-center gap-2 mb-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddAddress();
          }}
        >
          <Input
            placeholder="Search address..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsValidAddress(true);
            }}
            className="mr-2 w-full"
            error={isValidAddress ? "" : "Address is not valid"}
            required
          />
          <Button
            type="submit"
            loading={isLoading}
            disabled={!isValidAddress || isLoading}
          >
            Add Address
          </Button>
        </form>
        {addresses.length > 0 ? (
          <Table
            pagination={{
              currentPage: currentPage,
              totalPages: Math.ceil(addresses.length / itemsPerPage),
              onPageChange: setCurrentPage,
            }}
          >
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAddresses.map((addr) => (
                <TableRow
                  key={addr.address}
                  onClick={() => handleSelectAddress(addr)}
                  className={cn(
                    selectedAddress === addr.address
                      ? "bg-gray-100 dark:bg-gray-800"
                      : ""
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{addr.address}</span>
                      <CopyButton content={addr.address} />
                    </div>
                  </TableCell>
                  <TableCell>
                    {Numbers.toLocaleDecimals(addr.balanceInEther, 2, 6)} ETH
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No addresses found. Add an address to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
