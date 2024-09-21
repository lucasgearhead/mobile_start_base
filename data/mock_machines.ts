import { maintenances } from "./mock_maintenances"; // Importa o tipo Maintenance
import { items } from "./mock_items"; // Importa os itens (materiais)

export type Machine = {
  name: string;
  type: string;
  model: string;
  fabricationDate: string;
  serialNumber: string;
  location: string;
  status: "Rodando" | "Parado" | "Em Manutenção" | "Pendente";
  maintenanceHistory: {
    date: string;
    description: string;
    performedBy: string;
    materialsUsed: { material: string; quantity: string }[];
  }[];
};

export const machines: Machine[] = Array.from({ length: 17 }, (_, index) => {
  // Filtra todas as manutenções associadas a esta máquina
  const machineMaintenances = maintenances.filter(
    (m) => m.machineId === index + 1
  );

  // Gera o histórico de manutenções para cada máquina com base no filtro
  const maintenanceHistory = machineMaintenances.map(
    (machineMaintenance): Machine["maintenanceHistory"][number] => ({
      date: machineMaintenance ? machineMaintenance.date : "N/A",
      description: machineMaintenance
        ? machineMaintenance.description
        : "No data",
      performedBy: machineMaintenance
        ? machineMaintenance.performedBy
        : "No data",
      materialsUsed: machineMaintenance
        ? machineMaintenance.materialsUsed.map((material) => {
            const item = items.find((i) => i.id === material.itemId);
            return {
              material: item
                ? item.name
                : `Item não encontrado (ID: ${material.itemId})`, // Nome do material ou 'Item não encontrado'
              quantity: material.quantity, // Quantidade do material usado
            };
          })
        : [],
    })
  );

  return {
    name: `Máquina ${index + 1}`,
    type: `Tipo ${String.fromCharCode(65 + (index % 5))}`,
    model: `Modelo X${(index % 10) + 1}`,
    fabricationDate: `${String((index % 28) + 1).padStart(2, "0")}/07/2021`,
    serialNumber: `SN${String(index + 1).padStart(3, "0")}`,
    location: `Setor ${Math.floor(index / 5) + 1}`,
    status:
      index % 4 === 0
        ? "Rodando"
        : index % 4 === 1
        ? "Parado"
        : index % 4 === 2
        ? "Em Manutenção"
        : "Pendente",
    maintenanceHistory: maintenanceHistory.length > 0 ? maintenanceHistory : [],
  };
});
