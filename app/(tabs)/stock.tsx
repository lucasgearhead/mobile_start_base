import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { generateRandomStock } from "~/data/mock_items"; // Função para gerar o estoque
import { Muted } from "~/components/ui/typography";

export default function StockScreen() {
  const itemsWithStock = generateRandomStock();

  return (
    <View className="h-full p-6 bg-secondary/30">
      <ScrollView>
        {itemsWithStock.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardHeader className="flex-row">
              <CardTitle>
                {item.name}
                <Text
                  className={`text-${
                    item.status === "Normal" ? "green" : "red"
                  }-500`}
                >
                  {" " + item.status}
                </Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text>
                Quantidade Atual:{" "}
                <Text className="font-bold">{item.currentStock + " "}</Text>
                <Text className="font-bold">{item.unit}</Text>
              </Text>
              <Text>
                Quantidade Mínima:{" "}
                <Text className="font-bold">{item.minimumStock + " "}</Text>
                <Text className="font-bold">{item.unit}</Text>
              </Text>
              <Text>Status: {item.status}</Text>
            </CardContent>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
