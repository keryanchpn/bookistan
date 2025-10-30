import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStatistiqueStyles } from "@/styles/statistiqueStyles";
import { useTheme } from "@/theme";
import { getStatistics } from "../service/BookService";

const screenWidth = Dimensions.get("window").width;
const chartWidth = Math.min(screenWidth - 48, 420);

export default function Statistique() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const styles = useMemo(() => createStatistiqueStyles(theme), [theme]);

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
  const legendFontFamily = theme.fonts.medium ?? "System";

  const data = [
    {
      name: "Livres lus",
      population: readCount,
      color: theme.colors.chart.read,
      legendFontColor: theme.colors.text.primary,
      legendFontSize: theme.typography.body,
      legendFontFamily,
    },
    {
      name: "Livres non lus",
      population: unreadCount,
      color: theme.colors.chart.unread,
      legendFontColor: theme.colors.text.primary,
      legendFontSize: theme.typography.body,
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
              <ActivityIndicator size="large" color={theme.colors.primary} />
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
              <View style={styles.chartWrapper}>
                <PieChart
                  data={data}
                  width={chartWidth}
                  height={180}
                  chartConfig={{
                    backgroundColor: theme.colors.chart.background,
                    backgroundGradientFrom: theme.colors.chart.background,
                    backgroundGradientTo: theme.colors.chart.gradientTo,
                    color: (opacity = 1) =>
                      `rgba(${theme.colors.text.primaryRgb}, ${opacity})`,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="0"
                  absolute
                />
              </View>
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
          <Text style={styles.averageValue}>{averageRating ?? "—"}</Text>
          <Text style={styles.cardDescription}>
            Ce score correspond à la note moyenne attribuée à vos lectures.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
