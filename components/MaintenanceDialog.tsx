import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { user } from "~/data/mock_user";

type Machine = {
  name: string;
  model: string;
  location: string;
  status: string;
  fabricationDate: string;
  serialNumber: string;
  maintenanceHistory: {
    date: string;
    description: string;
    performedBy: string;
  }[];
};

export default function MaintenanceDialog({
  machineData,
}: {
  machineData: Machine;
}) {
  const [comment, setComment] = useState("");
  const selectedTeam = user.team;
  const [isMaintaining, setIsMaintaining] = useState(
    user.currentMachine === machineData.serialNumber
  );

  const handleAction = () => {
    if (machineData.status === "Em Manutenção") {
      console.log("Encerrar manutenção:", comment, "Equipe:", selectedTeam);
      // Lógica para encerrar a manutenção
    } else if (machineData.status === "Pendente") {
      console.log("Iniciar manutenção:", comment, "Equipe:", selectedTeam);
      // Lógica para iniciar a manutenção
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-4 aria-hidden:false">
          <Text>
            {machineData.status === "Em Manutenção"
              ? "Encerrar Manutenção"
              : "Iniciar Manutenção"}
          </Text>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="relative">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {machineData.status === "Em Manutenção"
              ? "Encerrar Manutenção?"
              : "Iniciar Manutenção?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {machineData.status === "Em Manutenção"
              ? "Você está prestes a encerrar a manutenção desta máquina. Insira os dados antes de finalizar."
              : "Você está prestes a iniciar a manutenção desta máquina. Deseja continuar?"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {machineData.status === "Em Manutenção" && (
          <Textarea
            placeholder="Escreva um comentário..."
            value={comment}
            onChangeText={(text) => setComment(text)}
            aria-labelledby="textareaLabel"
            className="mt-4"
          />
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Cancelar</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleAction}>
            <Text>Confirmar</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
