import { Book, BookTheme } from "@/model/Book";
import { addBook, updateBook } from "@/service/BookService";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useMemo, useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import { createAddBookStyles } from "@/styles/addBookStyles";
import { useTheme } from "@/theme";

type AddBookProps = {
  onClose?: () => void;
  onSuccess?: () => void;
  book?: Book | null;
};

export default function AddBook({ onClose, onSuccess, book }: AddBookProps) {
  const [name, setName] = useState<string>(book?.name ?? "");
  const [author, setAuthor] = useState<string>(book?.author ?? "");
  const [editor, setEditor] = useState<string>(book?.editor ?? "");
  const [year, setYear] = useState<number | undefined>(book?.year ?? undefined);
  const [theme, setTheme] = useState<BookTheme>(book?.theme ?? BookTheme.Classique);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const themeOptions = useMemo(() => Object.values(BookTheme), []);
  const isEditMode = Boolean(book);
  const { theme: appTheme } = useTheme();
  const styles = useMemo(() => createAddBookStyles(appTheme), [appTheme]);

  const resetForm = () => {
    setName("");
    setAuthor("");
    setEditor("");
    setYear(undefined);
    setTheme(BookTheme.Classique);
  };

  useEffect(() => {
    if (book) {
      setName(book.name);
      setAuthor(book.author);
      setEditor(book.editor);
      setYear(book.year);
      setTheme(book.theme ?? BookTheme.Classique);
    } else {
      resetForm();
    }
  }, [book]);

  const submitBook = async () => {
    if (!name.trim() || !author.trim() || !editor.trim() || !year || !theme) {
      setError("Merci de remplir les champs obligatoires.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      if (isEditMode && book) {
        await updateBook(book.id, {
          name: name.trim(),
          author: author.trim(),
          editor: editor.trim(),
          year,
          theme,
        });
      } else {
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
      }
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setError(isEditMode ? "Impossible de modifier le livre. Réessayez plus tard." : "Impossible d'ajouter le livre. Réessayez plus tard.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{isEditMode ? "Modifier un livre" : "Ajouter un livre"}</Text>
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
            dropdownIconColor={appTheme.colors.text.primary}
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
          {isSubmitting ? "Ajout..." : isEditMode ? "Modifier" : "Ajouter"}
        </Text>
      </Pressable>
    </View>
  );
}
