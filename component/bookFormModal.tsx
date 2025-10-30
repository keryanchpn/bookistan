import { Modal, View } from "react-native";
import AddBook from "@/app/(pages)/addBook";
import { Book } from "@/model/Book";
import { bookFormModalStyles as styles } from "@/styles/bookFormModalStyles";

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
