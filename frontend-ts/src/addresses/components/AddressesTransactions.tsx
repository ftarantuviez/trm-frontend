"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/Table";

import { Address } from "@/common/types/Address";
import { useAddresses } from "./AddressesProvider";
import { CopyButton } from "@/ui/components/CopyButton";
import { formatEther } from "viem";

export const AddressesTransactions: React.FunctionComponent<{
  selectedAddress: Address | undefined;
}> = ({ selectedAddress }) => {
  const { addresses } = useAddresses();

  const transactions = useMemo(() => {
    const address = addresses.find((addr) => addr.address === selectedAddress);
    return address?.transactions.data || [];
  }, [addresses, selectedAddress]);

  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
            }}
          >
            <TableHeader>
              <TableRow>
                <TableHead>Hash</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, index) => (
                <TableRow key={index}>
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
                  <TableCell>{formatEther(BigInt(tx.value))} ETH</TableCell>
                  <TableCell>
                    {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
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
