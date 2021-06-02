class NewPage {
  constructor() {
    this.titleInput = document.querySelector("#titleInput");
    this.bodyInput = document.querySelector("#bodyInput");
    this.sendBtn = document.querySelector("#sendBtn");
    this.events();
  }

  events() {
    this.sendBtn.addEventListener("click", (e) => this.createPost(e))
  }

  createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: this.titleInput.value,
        body: this.bodyInput.value,
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        window.location.href = "/";
      })
  }
}

var newPage = new NewPage();
