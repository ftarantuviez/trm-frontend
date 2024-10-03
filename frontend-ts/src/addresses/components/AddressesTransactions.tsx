"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/Table";
import { Skeleton } from "@/ui/components/Skeleton";

import { Address } from "@/common/types/Address";
import { useAddresses } from "./AddressesProvider";
import { CopyButton } from "@/ui/components/CopyButton";
import { formatEther } from "viem";
import { Button } from "@/ui/components/Button";
import { PlusIcon } from "lucide-react";
import { useFetchAddressTransactions } from "../hooks/useFetchAddressTransactions";
import { Separator } from "@/ui/components/Separator";

export const AddressesTransactions: React.FunctionComponent<{
  selectedAddress: Address | undefined;
}> = ({ selectedAddress }) => {
  const { addresses } = useAddresses();
  const { fetchAddressTransactions, isLoading } = useFetchAddressTransactions();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // We fetch the transactions of the selected address.
  const transactions = useMemo(() => {
    const address = addresses.find((addr) => addr.address === selectedAddress);
    return address?.transactions.data || [];
  }, [addresses, selectedAddress]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return transactions.slice(startIndex, startIndex + itemsPerPage);
  }, [transactions, currentPage]);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // We fetch more transactions when the user clicks the load more button
  const handleLoadMore = useCallback(() => {
    if (selectedAddress) {
      fetchAddressTransactions(selectedAddress).then(() => {
        setCurrentPage(totalPages + 1);
      });
    }
  }, [fetchAddressTransactions, selectedAddress, totalPages]);

  return (
    <Card className="mb-4 h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div>
              Recent Transactions
              {selectedAddress && (
                <span className="text-sm text-gray-500">
                  {" "}
                  for {Address.truncate(selectedAddress)}
                </span>
              )}
            </div>
            {transactions.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleLoadMore}>
                <PlusIcon className="mr-2" /> Load More
              </Button>
            )}
          </div>
          <Separator className="my-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 && (
          <Table
            pagination={{
              currentPage,
              totalPages: totalPages,
              onPageChange: setCurrentPage,
            }}
          >
            <TableHeader>
              <TableRow>
                <TableHead>Hash</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Value (ETH)</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                    <TableRow key={index}>
                      {Array.from({ length: 5 }).map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : paginatedTransactions.map((tx) => (
                    <TableRow key={tx.hash}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://etherscan.io/tx/${tx.hash}`}
                            target="_blank"
                            className="hover:underline"
                          >
                            {Address.truncate(tx.hash)}
                          </a>
                          <CopyButton content={tx.hash} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`https://etherscan.io/address/${tx.from}`}
                          target="_blank"
                          className="hover:underline"
                        >
                          {Address.truncate(tx.from)}
                        </a>
                      </TableCell>
                      <TableCell>
                        {tx.to ? (
                          <a
                            href={`https://etherscan.io/address/${tx.to}`}
                            target="_blank"
                            className="hover:underline"
                          >
                            {Address.truncate(tx.to)}
                          </a>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>{formatEther(BigInt(tx.value))}</TableCell>
                      <TableCell>
                        {new Date(
                          parseInt(tx.timeStamp) * 1000
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        )}
        {transactions.length === 0 && (
          <div className="flex items-end justify-center pt-12">
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
