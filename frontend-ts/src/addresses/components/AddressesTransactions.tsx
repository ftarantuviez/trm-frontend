"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/Table";
import { AddressInfo } from "../types/AddressInfo";

export const AddressesTransactions: React.FunctionComponent<{
  selectedAddress: AddressInfo | undefined;
}> = ({ selectedAddress }) => {
  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedAddress?.transactions.map((tx, index) => (
                <TableRow key={index}>
                  <TableCell>{tx.from}</TableCell>
                  <TableCell>{tx.to}</TableCell>
                  <TableCell>{tx.value} ETH</TableCell>
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
