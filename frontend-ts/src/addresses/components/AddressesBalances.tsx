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
import React, { useCallback, useState } from "react";
import { useAddresses } from "./AddressesProvider";
import { useFetchAddressBalance } from "../hooks/useFetchAddressBalance";
import { AddressInfo } from "../types/AddressInfo";
import { cn } from "@/ui/lib/utils";
import { Address } from "@/common/types/Address";
import { Numbers } from "@/common/utils/Numbers";
import { CopyButton } from "@/ui/components/CopyButton";

export const AddressesBalances: React.FunctionComponent<{
  selectedAddress: AddressInfo | undefined;
  setSelectedAddress: (address: AddressInfo | undefined) => void;
}> = ({ selectedAddress, setSelectedAddress }) => {
  const { addresses } = useAddresses();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { fetchAddressBalance, isLoading } = useFetchAddressBalance();
  const [isValidAddress, setIsValidAddress] = useState<boolean>(true);

  const handleAddAddress = useCallback(() => {
    const address = Address.ofString(searchTerm);

    // We validate that the address is an Ethereum address
    if (!address) {
      setIsValidAddress(false);
      return;
    }

    fetchAddressBalance(address);
    setSearchTerm("");
    setIsValidAddress(true);
  }, [searchTerm, fetchAddressBalance]);

  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Search Addresses</CardTitle>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addresses.map((addr) => (
                <TableRow
                  key={addr.address}
                  onClick={() => setSelectedAddress(addr)}
                  className={cn(
                    selectedAddress?.address === addr.address
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
        </CardContent>
      </Card>
    </div>
  );
};
