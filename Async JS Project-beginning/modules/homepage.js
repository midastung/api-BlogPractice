class HomePage {
    constructor() {
        this.posts
        this.searchResults
        this.postElement = document.querySelector("#posts") //抓包住文章section的id
        this.searchPost = document.querySelector("#searchPost")
        this.searchResultUl = document.querySelector("#searchResult")
        this.events()
    }

    events() {
        this.fetchData()
        this.searchPost.addEventListener('keyup', () => {
            this.displayDropdown()
        })
    }

    fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                this.posts = data.slice(0, 10)  //只取前10筆資料
                // console.log(this.posts)
                this.displayPosts()
            })

    }

    displayPosts() {
        this.posts = this.posts.map(post => (   //使用map一定要用小括號
            `  
            <div class="mb-6">
            <h2 class="font-bold font-medium text-4xl">Post#${post.id}${post.title}</h2>
            <p class="text-2xl font-light text-gray-600 mb-5">${post.body}</p>
            <div class="mb-4 text-right"><a href="/show.html?post=${post.id}"
                class="px-4 py-2 border inline-block rounded border-teal-600 text-teal-600">View This Post</a></div>
            <hr class="border-gray-400 border-t">
            </div>
            `
        ))
        // console.log(this.posts)
        this.postElement.innerHTML = this.posts.join(" ")
        //join可將陣列轉換成文字，[1,2,3,4] -> "1,2,3,4" 可是如果不要間格為逗號，可寫join(" ")空格
    }

    displayDropdown() {
        if (this.searchPost.value.length > 0) {
            this.searchResultUl.classList.remove("hidden")
            this.fetchSearch(this.searchPost.value)
        } else {
            this.searchResultUl.classList.add("hidden")
        }
    }

    fetchSearch(searchText) {
        fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchText}`)
            .then(response => response.json())
            .then(data => {
                this.searchResults= data.slice(0, 5)  //只取前5筆資料
                this.appendSearchResult()
            })
    }

    appendSearchResult(){
        this.searchResults = this.searchResults.map(data => (
           `
          <li class="p-2 border border-gray-200 hover:bg-gray-100">
          <a href="/show.html?post=${data.id}">${data.title} </a>
           </li>
          
           `
        ))      //使用map一定要用小括號
        this.searchResultUl.innerHTML = this.searchResults.join(" ")
    }

}



var homepage = new HomePage;