class ShowPage {
  constructor() {
    this.postId;
    this.post;
    this.postElement = document.querySelector("#post");
    this.events();
  }

  events() {
    this.getPostId();
    this.fetchData();
    this.postElement.addEventListener("click", (e) => {
      e.preventDefault();
      this.goback(e);
      this.goToUpdate(e);
      this.deletePost(e);
    })
  }

  getPostId() {
    let urlParams = new URLSearchParams(window.location.search);
    this.postId = urlParams.get("post");
  }

  fetchData() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
      .then(response => response.json())
      .then(data => {
        this.post = data
        this.displayPost();
      })
  }

  displayPost() {
    this.post =
      `
    <div class="mb-6">
      <h2 class="font-bold font-medium text-4xl">Post#${this.post.id}: ${this.post.title}
      </h2>
      <p class="text-2xl font-light text-gray-600 mb-5">${this.post.body}</p>
      <hr class="border-gray-400 border-t">
    </div>
    <a href="#" id="goback" class="py-4 px-8 border border-gray-700 rounded text-gray-700 mr-4">Go Back</a>
    <a href="#" id="deletePost" class="py-4 px-8 border border-red-400 rounded text-red-400 mr-4">Delete</a>
    <a href="/update.html?post=${this.post.id}" id="goToUpdate" class="py-4 px-8  bg-teal-400 rounded text-white">Update</a>
    `
    this.postElement.innerHTML = this.post;
  }

  goback(e) {
    if (e.target && e.target.id === "goback") {
      window.history.back();
    }
  }

  goToUpdate(e) {
    if (e.target && e.target.id === "goToUpdate") {
      window.location.href = e.target.href;
    }
  }

  deletePost(e) {
    if (e.target && e.target.id === "deletePost") {
      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE'
      }).then((response) => {
        console.log(response);
        window.location.href = "/";
      })
    }
  }
}

var showpage = new ShowPage();