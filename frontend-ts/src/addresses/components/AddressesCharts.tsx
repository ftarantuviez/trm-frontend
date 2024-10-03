"use client";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/Card";
import { Button } from "@/ui/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { useAddresses } from "./AddressesProvider";
import { Address } from "@/common/types/Address";
import { AlertCircle } from "lucide-react";
import React from "react";
import { formatEther } from "viem";

export const AddressesCharts: React.FunctionComponent<{
  selectedAddress: Address | undefined;
}> = ({ selectedAddress }) => {
  const [activeChart, setActiveChart] = useState<"transactions" | "balances">(
    "balances"
  );
  const { addresses } = useAddresses();

  const address = useMemo(() => {
    return addresses.find((addr) => addr.address === selectedAddress);
  }, [addresses, selectedAddress]);

  // Let's map transactions to allow for charting
  const transactions = useMemo(() => {
    return (
      address?.transactions.data.map((tx) => ({
        timeStamp: tx.timeStamp,
        value: tx.value,
      })) ?? []
    );
  }, [address]);

  const addressesBalances = useMemo(() => {
    return addresses.map((addr) => ({
      address: addr.address,
      balance: +addr.balanceInEther,
    }));
  }, [addresses]);

  const handleChartChange = useCallback(() => {
    setActiveChart(
      activeChart === "transactions" ? "balances" : "transactions"
    );
  }, [activeChart]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {activeChart === "transactions"
            ? "Transaction Values"
            : "Address Balances"}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleChartChange}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleChartChange}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* 
          // We want to display two charts
          // 1. The transaction values
          // 2. The address balances
        */}
        <ResponsiveContainer width="100%" height={300}>
          {activeChart === "balances" ? (
            addressesBalances.length > 0 ? (
              <BarChart data={addressesBalances}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="address"
                  tickFormatter={(address) => Address.truncate(address)}
                />
                <YAxis tickFormatter={(value) => `${value} ETH`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="balance" fill="#82ca9d" />
              </BarChart>
            ) : (
              <EmptyChartMessage message="No address balance data available" />
            )
          ) : transactions.length > 0 ? (
            <BarChart data={transactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timeStamp"
                tickFormatter={(timestamp) =>
                  new Date(parseInt(timestamp) * 1000).toLocaleDateString()
                }
              />
              <YAxis
                tickFormatter={(value) => `${formatEther(BigInt(value))} ETH`}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          ) : (
            <EmptyChartMessage message="No transaction data available" />
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const EmptyChartMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
    <p className="text-lg font-semibold text-gray-600">{message}</p>
  </div>
);
