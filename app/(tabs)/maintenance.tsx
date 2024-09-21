import { router } from "expo-router";
import * as React from "react";
import { ScrollView, View, Image } from "react-native";
import HistoryMaintenance from "~/components/HistoryMaintenance";
import RequestMaintenance from "~/components/RequestMaintenance";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";
import { machines } from "~/data/mock_machines"; // Mock de máquinas
import { maintenances } from "~/data/mock_maintenances"; // Mock de manutenções

export default function MaintenanceScreen() {
  const [selectedTab, setSelectedTab] = React.useState("history");

  const pendingMaintenances = maintenances.filter(
    (m) => machines[m.machineId - 1].status === "Pendente"
  );

  return (
    <View className="h-full w-full px-2 bg-secondary/30">
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full flex-col h-full"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="history" className="flex-1">
            <Text>Histórico</Text>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1">
            <Text>Pendentes</Text>
          </TabsTrigger>
          <TabsTrigger value="request" className="flex-1">
            <Text>Solicitar</Text>
          </TabsTrigger>
        </TabsList>

        <ScrollView>
          {/* Aba de Histórico */}
          <TabsContent value="history">
            <HistoryMaintenance />
          </TabsContent>

          {/* Aba de Pendentes */}
          <TabsContent value="pending">
            {pendingMaintenances.length > 0 ? (
              pendingMaintenances.map((maintenance) => (
                <Card
                  key={maintenance.id}
                  onTouchEndCapture={() =>
                    router.push({
                      pathname: "/machine_detail",
                      params: {
                        machine: JSON.stringify(
                          machines[maintenance.machineId - 1]
                        ),
                        title: machines[maintenance.machineId - 1].name,
                        status: machines[maintenance.machineId - 1].status,
                        from: "maintenance",
                      },
                    })
                  }
                >
                  <CardHeader>
                    <CardTitle>
                      {machines[maintenance.machineId - 1].serialNumber}
                    </CardTitle>
                    <CardDescription>
                      {machines[maintenance.machineId - 1].name}
                    </CardDescription>
                    <CardDescription>
                      {machines[maintenance.machineId - 1].location}
                    </CardDescription>
                    <CardContent className="p-0">
                      <Text>{maintenance.description}</Text>
                    </CardContent>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <Text>Sem manutenções pendentes.</Text>
            )}
          </TabsContent>

          {/* Aba de Pendentes */}
          <TabsContent value="running">
            {pendingMaintenances.length > 0 ? (
              pendingMaintenances.map((maintenance) => (
                <Card
                  key={maintenance.id}
                  onTouchEndCapture={() =>
                    router.push({
                      pathname: "/machine_detail",
                      params: {
                        machine: JSON.stringify(
                          machines[maintenance.machineId - 1]
                        ),
                        title: machines[maintenance.machineId - 1].name,
                        status: machines[maintenance.machineId - 1].status,
                        from: "maintenance",
                      },
                    })
                  }
                >
                  <CardHeader>
                    <CardTitle>
                      {machines[maintenance.machineId - 1].serialNumber}
                    </CardTitle>
                    <CardDescription>
                      {machines[maintenance.machineId - 1].name}
                    </CardDescription>
                    <CardDescription>
                      {machines[maintenance.machineId - 1].location}
                    </CardDescription>
                    <CardContent className="p-0">
                      <Text>{maintenance.description}</Text>
                    </CardContent>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <Text>Sem manutenções em andamento.</Text>
            )}
          </TabsContent>

          {/* Aba de Solicitar */}
          <TabsContent value="request">
            <RequestMaintenance />
          </TabsContent>
        </ScrollView>
      </Tabs>
    </View>
  );
}
