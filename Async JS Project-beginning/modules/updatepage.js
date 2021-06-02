class UpdatePage {
    constructor() {
        this.postId
        this.post
        this.titleInput = document.querySelector("#titleInput")
        this.bodyInput = document.querySelector("#bodyInput")
        this.updateBtn = document.querySelector("#updateBtn")
        this.events()       //這個要放在最下面，有執行緒的問題
    }

    events() {
        // console.log('Testing upgradePage')
        this.getPostId()
        this.fetchData()
        this.updateBtn.addEventListener('click', (e) => {
            this.updatePost(e)
        })
    }

    getPostId() {
        let urlParams = new URLSearchParams(window.location.search)
        this.postId = urlParams.get("post")
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
        this.titleInput.value = this.post.title
        this.bodyInput.value = this.post.body
    }

    updatePost(e) {
        e.preventDefault()
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.postId}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: this.postId,
                title: this.titleInput.value,
                body: this.bodyInput.value,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                window.location.href = "/"  //轉址
            })
    }
}

var upgradePage = new UpdatePage