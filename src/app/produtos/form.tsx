import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useAppDispatch, useAppSelector } from "@/src/store";
import { createProductThunk } from "@/src/store/produtos/thunks";
import { ProdutoSchema, produtoSchema } from "@/src/validations/produto.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const { list: clients } = useAppSelector((state) => state.clients);

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(produtoSchema),
    defaultValues: {
        nome: "",
        preco: 0,
        descricao: "",
        clienteId: undefined
    }
  });

  const selectedClientId = watch("clienteId");

  const handleFormSubmit = (data: ProdutoSchema) => {
    dispatch(createProductThunk(data))
      .unwrap()
      .then(() => {
        router.back();
        Alert.alert("Sucesso", "Produto cadastrado com sucesso");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dados do Produto</Text>

        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder="Nome do Produto"
              value={value}
              onChangeText={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="preco"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder="Preço (Ex: 10.50)"
              value={value?.toString()}
              onChangeText={(text) => onChange(parseFloat(text) || 0)}
              keyboardType="numeric"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="descricao"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Descrição (Opcional)"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Text style={styles.label}>Selecionar Cliente:</Text>
        <View style={styles.clientList}>
          {clients.length === 0 ? (
            <Text style={styles.errorText}>Nenhum cliente cadastrado. Cadastre um cliente primeiro.</Text>
          ) : (
            clients.map((client) => (
              <TouchableOpacity
                key={client.id}
                style={[
                  styles.clientItem,
                  selectedClientId === client.id && styles.clientItemSelected,
                ]}
                onPress={() => setValue("clienteId", client.id)}
              >
                <Text style={selectedClientId === client.id ? styles.clientTextSelected : {}}>
                  {client.nome} {client.sobrenome}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <Button
          onPress={handleSubmit(handleFormSubmit)}
          style={{ marginTop: 24 }}
          label="Cadastrar Produto"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 16 },
  content: { gap: 10, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 16 },
  label: { fontSize: 16, fontWeight: "500", marginTop: 10 },
  clientList: { gap: 8, marginTop: 8 },
  clientItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  clientItemSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  clientTextSelected: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  errorText: { color: "red", fontSize: 12 },
});

export default ProductForm;
