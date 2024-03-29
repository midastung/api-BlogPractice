class ShowPage {
    constructor() {
        this.postId
        this.post
        this.postElement = document.querySelector("#post")
        this.events()
    }

    events() {
        this.getPostId()
        this.fetchData()
        this.postElement.addEventListener("click", (e) => {
            e.preventDefault()
            this.goback(e)      //回上一頁
            this.goToUpdate(e)      //新增
            this.deletePost(e)      //刪除
        })
    }

    getPostId() {
        let urlParams = new URLSearchParams(window.location.search);       //透過這個方式抓url上的值
        this.postId = urlParams.get("post")
        console.log(this.postId)
    }

    fetchData() {
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
            .then(response => response.json())
            .then(data => {
                this.post = data      //只有單筆資料
                this.displayPost()
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
        this.postElement.innerHTML = this.post
    }

    goback(e) {
        if (e.target && e.target.id === "goback") { 
            window.history.back()
        }
    }

    goToUpdate(e) {
        if (e.target && e.target.id === "goToUpdate") {
            window.location.href = e.target.href
        }
    }

    deletePost(e) {
        if (e.target && e.target.id === "deletePost") {
            fetch(`https://jsonplaceholder.typicode.com/posts/${this.postId}`, {
                method: 'DELETE',       //不會真的刪掉
            }).then(response => {
                console.log(response)
                window.location.href = "/"      ////轉址回到首頁
            })
        }
    }
}

var showpage = new ShowPage;