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
import { AddressInfo } from "../types/AddressInfo";
import { useAddresses } from "./AddressesProvider";

export const AddressesCharts: React.FunctionComponent<{
  selectedAddress: AddressInfo | undefined;
}> = ({ selectedAddress }) => {
  const { addresses } = useAddresses();

  const [currentChart, setCurrentChart] = useState(0);

  // Let's map transactions to allow for charting
  const transactions = useMemo(() => {
    return (
      selectedAddress?.transactions.map((tx) => ({
        timeStamp: tx.timeStamp,
        value: tx.value,
      })) ?? []
    );
  }, [selectedAddress]);

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
        ),
      },
      {
        title: "Address Balances",
        render: () => (
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
