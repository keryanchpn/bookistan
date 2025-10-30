import { Modal, View } from "react-native";
import AddBook from "@/app/(pages)/addBook";
import { Book } from "@/model/Book";
import { createBookFormModalStyles } from "@/styles/bookFormModalStyles";
import { useTheme } from "@/theme";
import { useMemo } from "react";

type BookFormModalProps = {
    isModalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    onSuccess: () => void;
    book?: Book | null;
};
export default function BookFormModal({ isModalVisible, setModalVisible, onSuccess, book }: BookFormModalProps) {
    const { theme } = useTheme();
    const styles = useMemo(() => createBookFormModalStyles(theme), [theme]);
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
