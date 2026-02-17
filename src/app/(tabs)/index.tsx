import Box from "@/src/components/Box";
import { useAppSelector } from "@/src/store";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { list: clients } = useAppSelector((state) => state.clients);
  const { list: products } = useAppSelector((state) => state.products);

  return (
    <SafeAreaView style={styles.container}>
      <Box padding={24}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Resumo do seu Gerenciamento</Text>

        <View style={styles.row}>
          <View style={[styles.card, { backgroundColor: '#E3F2FD' }]}>
            <Text style={styles.cardValue}>{clients.length}</Text>
            <Text style={styles.cardLabel}>Clientes</Text>
          </View>

          <View style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.cardValue}>{products.length}</Text>
            <Text style={styles.cardLabel}>Produtos</Text>
          </View>
        </View>

        <Box marginTop={32} style={styles.infoBox}>
          <Text style={styles.infoTitle}>Dica:</Text>
          <Text style={styles.infoText}>
            Vá na aba &quot;Clientes&quot; para cadastrar novas pessoas e depois em &quot;Produtos&quot; para vincular itens a elas.
          </Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 24 },
  row: { flexDirection: "row", gap: 16 },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  cardValue: { fontSize: 32, fontWeight: "bold", color: "#1976D2" },
  cardLabel: { fontSize: 14, color: "#555", marginTop: 4 },
  infoBox: {
    padding: 16,
    backgroundColor: "#FFF9C4",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FBC02D",
  },
  infoTitle: { fontWeight: "bold", marginBottom: 4 },
  infoText: { color: "#555", lineHeight: 20 },
});
