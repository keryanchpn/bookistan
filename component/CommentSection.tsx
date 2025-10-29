import { Comment } from "@/model/Comment";
import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  comments: Comment[];
  newComment: string;
  setNewComment: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

const CommentSection = ({
  comments,
  newComment,
  setNewComment,
  onSubmit,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commentaires</Text>
      {comments.length === 0 ? (
        <Text style={styles.emptyState}>Aucun commentaire pour ce livre.</Text>
      ) : (
        comments.map((comment) => (
          <View key={comment.id} style={styles.commentItem}>
            <Text style={styles.commentContent}>{comment.content}</Text>
            <Text style={styles.commentDate}>
              {new Date(comment.dateISO).toLocaleDateString()}
            </Text>
          </View>
        ))
      )}
      <TextInput
        style={styles.input}
        placeholder="Ajouter un commentaire..."
        value={newComment}
        onChangeText={setNewComment}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Envoyer le commentaire</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2933",
  },
  emptyState: {
    color: "#52606D",
  },
  commentItem: {
    marginBottom: 12,
  },
  commentContent: {
    color: "#3E4C59",
  },
  commentDate: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#F8FAFC",
    fontSize: 14,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CommentSection;
