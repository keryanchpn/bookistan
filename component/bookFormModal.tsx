import { Modal, StyleSheet } from "react-native";
import { View } from "react-native";
import AddBook from "@/app/(pages)/addBook";
import { Book } from "@/model/Book";

type BookFormModalProps = {
    isModalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    onSuccess: () => void;
    book?: Book | null;
};
export default function BookFormModal({ isModalVisible, setModalVisible, onSuccess, book }: BookFormModalProps) {
    return (
        <Modal
            animationType="fade"
            transparent
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
            >
            <View style={styles.modalOverlay}>
                <View style={styles.modalCard}>
                <AddBook
                    onClose={() => setModalVisible(false)}
                    onSuccess={onSuccess}
                    book={book}
                />
                </View>
            </View>
            </Modal>
    );
}
const styles = StyleSheet.create({
    modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 20,
    overflow: "hidden",
  },
});