chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generateComment") {
        const data = request.data;

        // Simulate comment generation (replace this with your actual logic or API call)
        const generatedComment = generateCommentLogic(data);

        // Send the generated comment back to the content script
        sendResponse({ comment: generatedComment });
    }
    return true; // Required to use sendResponse asynchronously
});

function generateCommentLogic(data: CommentData): string {
    // Replace this with your actual comment generation logic
    const { isReply, repliedCommentContent, postContent, formality, minWords, maxWords } = data;

    let comment = "";

    if (isReply) {
        comment = `Thank you for your insightful comment: "${repliedCommentContent}". I completely agree and would like to add that...`;
    } else {
        comment = `Great post! I found the part about "${postContent}" particularly interesting. It reminds me of...`;
    }

    // Ensure the comment is within the word limit
    const words = comment.split(" ");
    if (words.length > maxWords) {
        comment = words.slice(0, maxWords).join(" ") + "...";
    } else if (words.length < minWords) {
        comment += " " + "This is a great point and I think it deserves more attention.";
    }

    return comment;
}
