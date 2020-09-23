
const BLOG_KEY = 'blogs'
const App_blogs = getBlogs()

function newBlogEntry(data) {

    return data
}

function saveBlog(blog) {
    App_blogs.push(blog)
    storeBlogs()
}

function editBlog(data,blog_id){
    blog_position = Number(blog_id)
    _blog_to_update = App_blogs[blog_position]
    _blog_to_update.title=data.title
    _blog_to_update.post=data.post
    _blog_to_update.post_image = data.post_image

    App_blogs[blog_position] = _blog_to_update
    storeBlogs()
    location.reload()
}

function deleteBlog(blog_id){

    blog_position = Number(blog_id)
    App_blogs.splice(blog_position,1)
    storeBlogs()
    location.reload()

}

function getBlogs() {
    stored_blogs = localStorage.getItem(BLOG_KEY)
    if (stored_blogs == null) {
        stored_blogs = "[]"
    }
    return JSON.parse(stored_blogs)
}

function storeBlogs() {
    localStorage.setItem(BLOG_KEY, JSON.stringify(App_blogs))
}

function findBlog(id) {

    blog_found = null
    App_blogs.forEach(blog => {
        if (blog != null && blog.id==id) {
            blog_found = blog
        }
    });

    return blog_found

}