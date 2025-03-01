const commentSection = document.querySelectorAll(".comments-comment-box__form");

console.log(commentSection);

var observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
            for (const node of mutation.addedNodes) {
                if (
                    // @ts-ignore
                    node.classList &&
                    // @ts-ignore
                    node.classList.contains("comments-comment-box__form")
                ) {
                    // @ts-ignore
                    insertGenerationButton(node);
                }
            }
        }
    }
});

function insertGenerationButton(commentForm: HTMLElement) {
    // =============== get the post informations
    const data: CommentData = {
        isReply: false,
        repliedCommentContent: "",
        postContent: "",
        formality: "professional",
        minWords: 10,
        maxWords: 50,
    };
    const closestComment =
        commentForm.closest(
            ".comment-social-activity"
        ); /* check if there is a parent with class "comments-comment-entity--reply" */

    if (closestComment) {
        data.isReply = true;
        const replyContent = closestComment.parentNode?.querySelector(".comments-thread-item");
        data.repliedCommentContent = replyContent?.textContent?.trim()!;
        console.log("the reply is " + data.repliedCommentContent);
    }

    const postParent = commentForm.closest(".feed-shared-update-v2");
    data.postContent = postParent?.querySelector(
      ".update-components-text"
    )?.textContent!;

    // ================= create magic button
    const element = `
          <div class="comments-comment-box__button-group">
              <button class="comments-comment-box__detour-icons artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary">
                  <svg fill="#000000" width="25px" height="25px" viewBox="-1.44 -1.44 26.88 26.88" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M15.5149363,6.35733115 C15.4980203,6.38183584 15.4786686,6.40516745 15.456881,6.42698812 C14.8672047,7.01755905 14.8677951,7.97353615 15.4588796,8.56573799 C16.0010279,9.10667182 16.8527465,9.14811119 17.4423323,8.69069719 L18.1554683,7.97645365 C17.0514861,7.82427997 16.1775621,6.951278 16.023991,5.84774235 L15.5149363,6.35733115 L15.5149363,6.35733115 Z M14.0383458,7.83547088 L4.45688099,17.4269881 C3.86720469,18.017559 3.86779505,18.9735361 4.45887962,19.565738 C5.0470746,20.1526153 5.99965892,20.1515472 6.58665828,19.5632299 L16.1565377,9.97848862 C15.6428003,9.90317457 15.1478422,9.66802689 14.7518363,9.27290746 C14.3478241,8.86813267 14.1099859,8.3607874 14.0383458,7.83547088 L14.0383458,7.83547088 Z M18.3632755,9.18363586 C18.3439555,9.2141513 18.321009,9.24303244 18.2944355,9.26966563 C18.2352476,9.32898639 18.1738253,9.38471981 18.1104386,9.43686544 L7.2944355,20.2696656 C6.31747202,21.2488226 4.73172311,21.2506007 3.75183629,20.2729075 C2.77055938,19.2897782 2.76957858,17.7015637 3.749321,16.7203349 L16.7167471,3.73930384 C16.7367844,3.71924553 16.7581017,3.70124487 16.7804363,3.68530202 C17.2285375,3.26054998 17.8338414,3 18.5,3 C19.8807119,3 21,4.11928813 21,5.5 C21,6.16147168 20.7431034,6.76294196 20.3236389,7.21008226 C20.3074905,7.23292661 20.2891997,7.25472071 20.2687663,7.27518585 L18.3632755,9.18363586 L18.3632755,9.18363586 Z M17,16 L17.5,16 C17.7761424,16 18,16.2238576 18,16.5 C18,16.7761424 17.7761424,17 17.5,17 L17,17 L17,17.5615528 C17,17.8376952 16.7761424,18.0615528 16.5,18.0615528 C16.2238576,18.0615528 16,17.8376952 16,17.5615528 L16,17 L15.5,17 C15.2238576,17 15,16.7761424 15,16.5 C15,16.2238576 15.2238576,16 15.5,16 L16,16 L16,15.5 C16,15.2238576 16.2238576,15 16.5,15 C16.7761424,15 17,15.2238576 17,15.5 L17,16 Z M10,4 L10,3.5 C10,3.22385763 10.2238576,3 10.5,3 C10.7761424,3 11,3.22385763 11,3.5 L11,4 L11.5,4 C11.7761424,4 12,4.22385763 12,4.5 C12,4.77614237 11.7761424,5 11.5,5 L11,5 L11,5.5 C11,5.77614237 10.7761424,6 10.5,6 C10.2238576,6 10,5.77614237 10,5.5 L10,5 L9.5,5 C9.22385763,5 9,4.77614237 9,4.5 C9,4.22385763 9.22385763,4 9.5,4 L10,4 Z M22,12 L22.5,12 C22.7761424,12 23,12.2238576 23,12.5 C23,12.7761424 22.7761424,13 22.5,13 L22,13 L22,13.5 C22,13.7761424 21.7761424,14 21.5,14 C21.2238576,14 21,13.7761424 21,13.5 L21,13 L20.5,13 C20.2238576,13 20,12.7761424 20,12.5 C20,12.2238576 20.2238576,12 20.5,12 L21,12 L21,11.5 C21,11.2238576 21.2238576,11 21.5,11 C21.7761424,11 22,11.2238576 22,11.5 L22,12 Z M18.5,7 C19.3284271,7 20,6.32842712 20,5.5 C20,4.67157288 19.3284271,4 18.5,4 C17.6715729,4 17,4.67157288 17,5.5 C17,6.32842712 17.6715729,7 18.5,7 Z"></path> </g></svg>
              </button>
          </div>
      `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = element;
    commentForm.parentElement?.insertAdjacentElement("beforeend", wrapper);
    wrapper
      ?.querySelector("button")
      ?.addEventListener(
        "click",
        async () => await generateComment(data, commentForm)
      );
}

async function generateComment(data: any, commentSection: HTMLElement) {
    const commentContainer = commentSection?.querySelector(".ql-editor");

    if (!commentContainer) {
        console.error("Comment container not found");
        return;
    }

    // Send data to the background script
    chrome.runtime.sendMessage({ action: "generateComment", data: data }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error sending message to background script:", chrome.runtime.lastError);
            return;
        }

        if (response && response.comment) {
            // Insert the generated comment into the comment box
            commentContainer.innerHTML = response.comment;
        } else {
            console.error("No comment received from background script");
        }
    });
}

observer.observe(document, {
    attributes: false,
    childList: true,
    subtree: true,
});

document.querySelectorAll(".comments-comment-box__form").forEach(insertGenerationButton as any);
