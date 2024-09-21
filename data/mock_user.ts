export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  team: string;
  sector: string;
  pis: string;
  currentMachine?: string; // Nova propriedade para armazenar a máquina
};

export const user: User = {
  id: "0",
  name: "Alexandre Reame",
  pis: "10837592017",
  role: "Mecânico IV",
  sector: "Manutenção",
  team: "G",
  email: "alexandre_reame@gmail.com",
  password: "alexandre123",
};
