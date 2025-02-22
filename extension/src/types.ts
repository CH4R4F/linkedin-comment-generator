interface CommentData {
    isReply: boolean;
    repliedCommentContent?: string;
    postContent: string;
    formality: "professional" | "casual";
    minWords: number;
    maxWords: number;
}