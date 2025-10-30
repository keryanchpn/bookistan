import { Comment } from "@/model/Comment";
import { Dispatch, SetStateAction } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { commentSectionStyles as styles } from "@/styles/commentSectionStyles";
import { theme } from "@/theme";

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
        placeholderTextColor={theme.colors.placeholder}
        value={newComment}
        onChangeText={setNewComment}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Envoyer le commentaire</Text>
      </Pressable>
    </View>
  );
};

export default CommentSection;
