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
import { useMemo, useState } from "react";

import { useAddresses } from "./AddressesProvider";
import { Address } from "@/common/types/Address";
import { AlertCircle } from "lucide-react";
import React from "react";

export const AddressesCharts: React.FunctionComponent<{
  selectedAddress: Address | undefined;
}> = ({ selectedAddress }) => {
  const { addresses } = useAddresses();

  const [currentChart, setCurrentChart] = useState(0);

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

  // We want to display two charts
  // 1. The transaction values
  // 2. The address balances
  const charts = useMemo(
    () => [
      {
        title: "Transaction Values",
        render: () => (
          <>
            {transactions.length > 0 ? (
              <BarChart data={transactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timeStamp"
                  tickFormatter={(timestamp) =>
                    new Date(parseInt(timestamp) * 1000).toLocaleDateString()
                  }
                />
                <YAxis
                  tickFormatter={(value) => `${(value / 1e18).toFixed(2)} ETH`}
                  label={{
                    value: "Value (ETH)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            ) : (
              <EmptyChartMessage message="No transactions found for this address." />
            )}
          </>
        ),
      },
      {
        title: "Address Balances",
        render: () => (
          <>
            {addressesBalances.length > 0 ? (
              <BarChart data={addressesBalances}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="address"
                  tickFormatter={(address) =>
                    address.toString().slice(0, 6) + "..."
                  }
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="balance" fill="#82ca9d" />
              </BarChart>
            ) : (
              <EmptyChartMessage message="No address balances available." />
            )}
          </>
        ),
      },
    ],
    [transactions, addressesBalances]
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{charts[currentChart].title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentChart(
                (prev) => (prev - 1 + charts.length) % charts.length
              )
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentChart((prev) => (prev + 1) % charts.length)
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {charts[currentChart].render()}
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
