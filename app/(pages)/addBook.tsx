import { BookTheme } from "@/model/Book";
import { addBook } from "@/service/BookService";
import { Picker } from "@react-native-picker/picker";
import { useMemo, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type AddBookProps = {
  onClose?: () => void;
  onSuccess?: () => void;
};

export default function AddBook({ onClose, onSuccess }: AddBookProps) {
  const [name, setName] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [editor, setEditor] = useState<string>("");
  const [year, setYear] = useState<number | undefined>(undefined);
  // const [cover, setCover] = useState<string>("");
  const [theme, setTheme] = useState<BookTheme>(BookTheme.Classique);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const themeOptions = useMemo(() => Object.values(BookTheme), []);

  const resetForm = () => {
    setName("");
    setAuthor("");
    setEditor("");
    setYear(undefined);
    setTheme(BookTheme.Classique);
  };

  const submitBook = async () => {
    if (!name.trim() || !author.trim() || !editor.trim() || !year || !theme) {
      setError("Merci de remplir les champs obligatoires.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await addBook({
        name: name.trim(),
        author: author.trim(),
        editor: editor.trim(),
        year,
        theme,
        read: false,
        favorite: false,
        rating: 0,
        cover: "",
      });
      resetForm();
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setError("Impossible d'ajouter le livre. Reessayez plus tard.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Ajouter un livre</Text>
        {onClose && (
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Auteur</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={setAuthor}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Editeur</Text>
        <TextInput
          style={styles.input}
          value={editor}
          onChangeText={setEditor}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Annee</Text>
        <TextInput
          style={styles.input}
          value={year ? year.toString() : ""}
          onChangeText={(text) => {
            const parsed = parseInt(text, 10);
            setYear(Number.isNaN(parsed) ? undefined : parsed);
          }}
          keyboardType="numeric"
        />
      </View>
      {/* <TextInput placeholder="Couverture (URL)" value={cover} onChangeText={setCover} /> */}
      <View style={styles.field}>
        <Text style={styles.label}>Theme</Text>
        <View style={[
          styles.pickerWrapper,
          Platform.OS === "ios" && styles.pickerWrapperIOS,
          Platform.OS === "web" && styles.pickerWrapperWeb,
        ]}>
          <Picker
            selectedValue={theme}
            onValueChange={(value) => setTheme(value as BookTheme)}
            dropdownIconColor="#1F2933"
            mode={Platform.OS === "android" ? "dropdown" : undefined}
            style={[
              styles.pickerGlobal,
              Platform.OS === "ios" && styles.pickerIOS,
              Platform.OS === "web" && styles.pickerWeb,
            ]}
            itemStyle={Platform.OS === "ios" ? styles.pickerItemIOS : undefined}
          >
            {themeOptions.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Pressable
        onPress={submitBook}
        style={({ pressed }) => [
          styles.submitButton,
          isSubmitting && styles.submitButtonDisabled,
          pressed && !isSubmitting && styles.submitButtonPressed,
        ]}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? "Ajout..." : "Ajouter"}
        </Text>
      </Pressable>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1F2933",
    },
    closeButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: "rgba(15, 23, 42, 0.06)",
    },
    closeButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1F2933",
    },
    field: {
        gap: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1F2933",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#D0D5DD",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: "#F8FAFC",
        fontSize: 14,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#D0D5DD",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#F8FAFC",
        ...Platform.select({
            android: {
                height: 48,
                justifyContent: "center",
            },
            web: {
                height: 48,
            },
        }),
        transitionProperty: "border-color, box-shadow",
        transitionDuration: "120ms",
    },
    pickerWrapperIOS: {
        paddingVertical: 4,
    },
    pickerGlobal: {
        width: "100%",
        color: "#1F2933",
    },
    pickerIOS: {
        height: 180,
    },
    pickerItemIOS: {
        color: "#1F2933",
    },
    pickerWrapperWeb: {
        display: "flex",
    },
    pickerWeb: {
        height: "100%",
    },
    errorText: {
        color: "#DC2626",
        fontSize: 13,
        fontWeight: "500",
    },
    submitButton: {
        marginTop: 8,
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    submitButtonPressed: {
        opacity: 0.85,
    },
    submitButtonDisabled: {
        backgroundColor: "#94A3B8",
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
