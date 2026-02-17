import Box from "@/src/components/Box";
import Button from "@/src/components/Button";
import { useAppDispatch, useAppSelector } from "@/src/store";
import { listProductsThunk, deleteProductThunk } from "@/src/store/produtos/thunks";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Produtos = () => {
  const dispatch = useAppDispatch();
  const { loading, list } = useAppSelector((state) => state.products);
  const { list: clients } = useAppSelector((state) => state.clients);

  useFocusEffect(
    useCallback(() => {
      dispatch(listProductsThunk());
    }, [])
  );

  const handleRemove = (productId: number) => {
    Alert.alert("Excluir", "Deseja excluir este produto?", [
      { text: "Sim", onPress: () => dispatch(deleteProductThunk(productId)) },
      { text: "Não", style: "cancel" },
    ]);
  };

  const getClientName = (clientId: number) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? `${client.nome} ${client.sobrenome}` : "Cliente não encontrado";
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} padding={16}><ActivityIndicator /></Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} padding={16}>
        <Button
          onPress={() => router.push("/produtos/form")}
          label="Novo Produto"
        />
        <Box marginTop={16}>
          {list.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
          ) : (
            <FlatList
              data={list}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Box style={styles.card}>
                  <Box>
                    <Text style={styles.productName}>{item.nome}</Text>
                    <Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text>
                    <Text style={styles.clientName}>Cliente: {getClientName(item.clienteId)}</Text>
                  </Box>
                  <TouchableOpacity onPress={() => handleRemove(item.id)}>
                    <Text style={styles.deleteText}>Excluir</Text>
                  </TouchableOpacity>
                </Box>
              )}
            />
          )}
        </Box>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyText: { textAlign: "center", marginTop: 20, color: "#999" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  productName: { fontSize: 18, fontWeight: "bold" },
  productPrice: { fontSize: 16, color: "#2ecc71" },
  clientName: { fontSize: 12, color: "#666", marginTop: 4 },
  deleteText: { color: "#e74c3c", fontWeight: "bold" },
});

export default Produtos;
