import { items } from "./mock_items";
import { teams } from "./mock_teams";

export type MaintenanceMaterial = {
  itemId: number;
  quantity: string;
  itemName: string; // Novo campo para o nome do item
};

export type Maintenance = {
  id: number;
  machineId: number;
  date: string;
  description: string;
  performedBy: string;
  materialsUsed: MaintenanceMaterial[];
};
export const maintenances: Maintenance[] = Array.from(
  { length: 20 },
  (_, index) => {
    const machineId = Math.floor(Math.random() * 17) + 1; // ID da máquina (1 a 17)
    const teamIndex = Math.floor(Math.random() * 10); // Equipes de A a J

    // Definindo materiais usados com o nome do item a partir do mock de itens
    const maintenanceMaterials: MaintenanceMaterial[] =
      index % 2 === 0
        ? [
            {
              itemId: 1,
              quantity: "2L",
              itemName:
                items.find((item) => item.id === 1)?.name ||
                "Item não encontrado",
            },
            {
              itemId: 2,
              quantity: "1 unidade",
              itemName:
                items.find((item) => item.id === 2)?.name ||
                "Item não encontrado",
            },
          ]
        : [
            {
              itemId: 3,
              quantity: "1 unidade",
              itemName:
                items.find((item) => item.id === 3)?.name ||
                "Item não encontrado",
            },
            {
              itemId: 4,
              quantity: "4 unidades",
              itemName:
                items.find((item) => item.id === 4)?.name ||
                "Item não encontrado",
            },
          ];

    return {
      id: index + 1,
      machineId: machineId,
      date: `${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        "0"
      )}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}/2023`,
      description:
        index % 2 === 0
          ? "Troca de óleo e verificação geral."
          : "Substituição de peças desgastadas.",
      performedBy: teams[teamIndex].name, // Equipe responsável
      materialsUsed: maintenanceMaterials,
    };
  }
);
