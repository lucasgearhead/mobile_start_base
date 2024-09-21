export type Item = {
  id: number;
  name: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  status: "Normal" | "Abaixo do esperado";
};

export const items: Item[] = [
  {
    id: 1,
    name: "Óleo Lubrificante",
    unit: "L",
    currentStock: 12,
    minimumStock: 10,
    status: "Normal",
  },
  {
    id: 2,
    name: "Filtro de Óleo",
    unit: "unidade",
    currentStock: 4,
    minimumStock: 5,
    status: "Abaixo do esperado",
  },
  {
    id: 3,
    name: "Correia",
    unit: "unidade",
    currentStock: 6,
    minimumStock: 3,
    status: "Normal",
  },
  {
    id: 4,
    name: "Parafusos",
    unit: "unidades",
    currentStock: 20,
    minimumStock: 15,
    status: "Normal",
  },
  {
    id: 5,
    name: "Graxa",
    unit: "kg",
    currentStock: 2,
    minimumStock: 5,
    status: "Abaixo do esperado",
  },
  {
    id: 6,
    name: "Rolamento",
    unit: "unidade",
    currentStock: 1,
    minimumStock: 3,
    status: "Abaixo do esperado",
  },
];

// Função para gerar status e quantidades aleatórias
export const generateRandomStock = (): Item[] => {
  return items.map((item) => {
    const currentStock = Math.floor(Math.random() * 20); // Quantidade aleatória entre 0 e 20
    const minimumStock = Math.floor(Math.random() * 10) + 1; // Quantidade mínima entre 1 e 10
    const status = currentStock < minimumStock ? "Abaixo" : "Normal";

    return {
      ...item,
      currentStock,
      minimumStock,
      status,
    };
  });
};
