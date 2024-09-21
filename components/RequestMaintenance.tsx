import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { H1, Muted } from "~/components/ui/typography";

export default function RequestMaintenance() {
  const [machine, setMachine] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const insets = useSafeAreaInsets();

  const handleRequest = () => {
    // Exibir toasts em sequência
    Toast.show({
      type: "success",
      text1: "Solicitação Enviada",
      text2: "Sua solicitação de manutenção foi enviada com sucesso.",
      topOffset: insets.top === 0 ? 12 : insets.top,
    });

    setTimeout(() => {
      Toast.show({
        type: "error",
        text1: "Aviso!",
        text2: "Certifique-se de revisar os detalhes enviados.",
        topOffset: insets.top === 0 ? 12 : insets.top,
      });
    }, 2000);

    setTimeout(() => {
      Toast.show({
        type: "base",
        text1: "Heads up!",
        text2: "A equipe de manutenção estará de olho na sua solicitação.",
        topOffset: insets.top === 0 ? 12 : insets.top,
      });
    }, 4000);

    // Limpar os campos de input após exibir os toasts
    setMachine("");
    setDescription("");
    setNotes("");
  };

  return (
    <View className="items-center bg-secondary/30">
      <View className="p-4 native:pb-24 max-w-md gap-3">
        <View className="gap-1">
          <H1 className="text-foreground text-center">Solicitar Manutenção</H1>
          <Muted className="text-base text-center">
            Preencha as informações abaixo
          </Muted>
        </View>

        <Input
          placeholder="Máquina (ID ou Nome)"
          value={machine}
          onChangeText={setMachine}
        />
        <Input
          placeholder="Descrição do Problema"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <Input
          placeholder="Observações Adicionais"
          multiline
          value={notes}
          onChangeText={setNotes}
        />

        <Button className="mt-4" onPress={handleRequest}>
          <Text>Enviar Solicitação</Text>
        </Button>
      </View>
    </View>
  );
}
