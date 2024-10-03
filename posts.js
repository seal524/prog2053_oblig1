// GLOBAL VARIABEL
let limit = 3;// Decides how many posts should be displayed at a time


/**
 * Fetches the posts from the api and add them to the website based on 
 * aincreases the
 * amount of posts visible for each time the function
 * is called. 
 * 
 * Inspired by code example from lecture 7
 */
function fetchPosts() {
    //API Endpoint: https://jsonplaceholder.typicode.com/posts
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    })
    .then((posts) => {
        let container = document.getElementById("contentbox");
        container.innerHTML = ""; //removes the current content
        limit += 3; //increases the limit to display another page of posts when called

        let numberOfPosts = 1;
        for (post of posts) {
            //only creates a post if it's within the limit and stops the amount of posts at 99
            if (numberOfPosts <= limit && numberOfPosts < 100) { 
                // creates a post with the content from the api request:
                
                //creates the elements needed for creating a post
                const article = document.createElement("article");
                const title = document.createElement("h1");
                const body = document.createElement("p");
                // adds the content from the request
                title.textContent = post.title;
                body.textContent = post.body;

                //adds the post to the webpage
                article.appendChild(title);
                article.appendChild(body);
                container.appendChild(article);

                //creates a new row for each third post
                if (numberOfPosts % 3 == 0) {
                    const clearfix = document.createElement("div");
                    clearfix.setAttribute("class", "clearfix");
                    container.appendChild(clearfix);
                }
            }
            numberOfPosts++;
        }
    })
    .catch(error => {
        // displays any errors on the webpage
        document.getElementById('content').innerHTML = `<h3>Error: ${error.message}</h3>`;
    });
}

// increases the amount of posts available when scrolling stops
window.onscrollend = () => {
    fetchPosts();
};
