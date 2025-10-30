import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatistics } from "../service/BookService";

const screenWidth = Dimensions.get("window").width;
const chartWidth = Math.min(screenWidth - 48, 420);

export default function Statistique() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStatistics();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setError("Impossible de charger les statistiques pour le moment.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [fetchStats]),
  );

  const readCount = stats?.readCount ?? 0;
  const unreadCount = stats?.unreadCount ?? 0;
  const totalCount = readCount + unreadCount;
  const averageRating =
    typeof stats?.averageRating === "number"
      ? stats.averageRating.toFixed(1)
      : null;
  const legendFontFamily = Platform.select({
    ios: "HelveticaNeue-Medium",
    android: "Roboto-Medium",
    default: "System",
  });

  const data = [
    {
      name: "Livres lus",
      population: readCount,
      color: "#34D399",
      legendFontColor: "#0F172A",
      legendFontSize: 14,
      legendFontFamily,
    },
    {
      name: "Livres non lus",
      population: unreadCount,
      color: "#FB7185",
      legendFontColor: "#0F172A",
      legendFontSize: 14,
      legendFontFamily,
    },
  ];

  const hasData = totalCount > 0;


  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Statistiques</Text>
          <Text style={styles.subtitle}>
            Un aperçu de votre progression de lecture
          </Text>
        </View>

        <View style={styles.highlightRow}>
          <View style={[styles.highlightCard, styles.highlightPrimary]}>
            <Text style={styles.highlightLabel}>Total de livres</Text>
            <Text style={styles.highlightValue}>{totalCount}</Text>
          </View>
          <View style={[styles.highlightCard, styles.highlightSuccess]}>
            <Text style={styles.highlightLabel}>Livres lus</Text>
            <Text style={styles.highlightValue}>{readCount}</Text>
          </View>
          <View style={[styles.highlightCard, styles.highlightWarning]}>
            <Text style={styles.highlightLabel}>Livres non lus</Text>
            <Text style={styles.highlightValue}>{unreadCount}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Répartition de lecture</Text>
          {loading && (
            <View style={styles.stateContainer}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={styles.stateText}>
                Chargement des statistiques...
              </Text>
            </View>
          )}

          {!loading && error && (
            <View style={styles.stateContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {!loading && !error && hasData && (
            <>
              <PieChart
                data={data}
                width={chartWidth}
                height={180}
                chartConfig={{
                  backgroundColor: "#EEF2FF",
                  backgroundGradientFrom: "#EEF2FF",
                  backgroundGradientTo: "#E0E7FF",
                  color: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
                absolute
              />
              <Text style={styles.cardDescription}>
                Vous avez lu {readCount} livre(s) sur un total de{" "}
                {totalCount}. Continuez sur cette lancée&nbsp;!
              </Text>
            </>
          )}

          {!loading && !error && !hasData && (
            <View style={styles.stateContainer}>
              <Text style={styles.stateText}>
                Ajoutez vos premiers livres pour générer des statistiques.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Moyenne de notation</Text>
          <Text style={styles.averageValue}>
            {averageRating ?? "—"}
          </Text>
          <Text style={styles.cardDescription}>
            Ce score correspond à la note moyenne attribuée à vos lectures.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 15,
    color: "#475569",
  },
  highlightRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  highlightCard: {
    flex: 1,
    minWidth: 120,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  highlightPrimary: {
    backgroundColor: "#2563EB",
  },
  highlightSuccess: {
    backgroundColor: "#34D399",
  },
  highlightWarning: {
    backgroundColor: "#FBBF24",
  },
  highlightLabel: {
    fontSize: 13,
    color: "#F8FAFC",
    marginBottom: 6,
  },
  highlightValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    gap: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  averageValue: {
    fontSize: 48,
    fontWeight: "700",
    color: "#2563EB",
    textAlign: "center",
  },
  stateContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 24,
  },
  stateText: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    textAlign: "center",
  },
});
