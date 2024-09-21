import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { View, Text, Image } from "react-native";

export default function HistoryMaintenance({ maintenances, machines }: any) {
  const MACHINE_IMAGE_URI =
    "https://sweetco.com.br/wp-content/uploads/2023/01/CAFE-Aulika-350x350.png";
  return (
    <>
      {maintenances.map((maintenance) => (
        <Card key={maintenance.id} className="flex flex-row">
          <View className="w-2/3">
            <CardHeader>
              <CardTitle>
                {machines[maintenance.machineId - 1].serialNumber}
              </CardTitle>

              <CardDescription>
                {machines[maintenance.machineId - 1].name}
              </CardDescription>
              <CardDescription>{maintenance.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <View className="flex-row justify-between">
                <Text className="font-bold">Data: </Text>
                <Text>{maintenance.date}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold">Realizado por: </Text>
                <Text>{maintenance.performedBy}</Text>
              </View>
              <Text className="mt-2 font-bold">Materiais usados:</Text>
              {maintenance.materialsUsed.map((material, index) => (
                <Text key={index} className="ml-4">
                  • {material.itemName}: {material.quantity}
                </Text>
              ))}
            </CardContent>
          </View>
          <Image
            className="self-center flex-1 h-32"
            source={{
              uri: MACHINE_IMAGE_URI,
            }}
          />
        </Card>
      ))}
    </>
  );
}
