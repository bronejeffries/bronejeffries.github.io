// userModel = require('user.js')

function renderBlogs(){

    App_blogs.forEach((blog,position) => {
        renderBlog(blog,position)
    });

}

function renderBlog(blog,position){
    div = document.createElement('li')
    div.classList = ["media my-4"]
    blog_string = `<img data-toggle="modal" data-target="#image_blog_${position}" style="height: 250px; width: 300px;" src="${blog.post_image}" class="align-self-center mr-3" alt="${blog.title}">
                        <div class="media-body">
                            <h5 class="mt-0 mb-1"><strong>${blog.title}</strong></h5>
                            ${blog.post}
                        </div>
                        <div>
                            <button data-toggle="modal" data-target="#edit_blog_${position}" class="btn btn-success btn-sm" type="submit">Edit</button>
                            <button type="button" onclick="delete_this_blog(event)" class="btn btn-danger btn-sm" data-blog="${position}">Delete</button>
                        </div>
                        <div class="modal fade" id="edit_blog_${position}" tabindex="-1" role="dialog" aria-labelledby="edit_blog_${position}Label" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form data-blog="${position}" class="form blog_form_edit" onsubmit="editForm(event)">
                                            <div class="form-group m-2">
                                                <label>
                                                    Blog Title
                                                </label>
                                                <input type="text" class="form-control blog_title_edit" value="${blog.title}"
                                                    name="blog_title_edit" required id="blog_title_edit${position}">
                                            </div>
                                            <div class=" form-group m-2">
                                                <label>
                                                    Blog Post
                                                </label>
                                                <textarea name="blog_post_edit" required id="blog_post_edit${position}" class="form-control blog_post_edit" rows="2" cols="30">
                                                ${blog.post}
                                                </textarea>
                                            </div>
                                            <div class="form-group m-2">
                                                <label>
                                                    Blog Image
                                                </label>
                                                <input onchange="capture_image(event,'blog_image${position}')" type="file" class="form-control-file blog_post_image_edit" placeholder="password"
                                                    name="blog_post_image_edit" id="blog_post_image_edit${position}">
                                                <div>
                                                    <img style="height: 350px; width: 350px;" src="${blog.post_image}" class="img-fluid img-thumbnail" alt="blog image" id="blog_image${position}">
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-success" type="submit">Save Changes</button>
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="image_blog_${position}" tabindex="-1" role="dialog" aria-labelledby="image_blog_${position}Label" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <img src="${blog.post_image}" class=" img-thumbnail" alt="${blog.title}">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>`
    div.innerHTML = blog_string
    document.getElementById('blogs_holder').appendChild(div)
}
renderBlogs()

bog_form = document.getElementById('bog_form')
if (bog_form!=null) {
    bog_form.addEventListener('submit',(e)=>{
        e.preventDefault()
        id = 1
        length = App_blogs.length-1
        if (App_blogs.length>0) {
            App_blogs[length].id + 1
        }
        blog_data = {
            'title':(bog_form.getElementsByClassName('blog_title_input')[0]).value,
            'post':(bog_form.getElementsByClassName('blog_post_input')[0]).value,
            'post_image':document.getElementById('blog_image').src,
            'id':id,
            'created_by':localStorage.getItem("logged_in_user")
        }
        // new_user = userModel.user(user_data)
        // userModel.save_user(new_user)

        new_blog = newBlogEntry(blog_data)
        saveBlog(new_blog)
        renderBlog(new_blog)
    })
}


function editForm(event){
    event.preventDefault()
    form = event.target
    blog_id = form.dataset["blog"]
        blog_data = {
            'title':(form.getElementsByClassName('blog_title_edit')[0]).value,
            'post':(form.getElementsByClassName('blog_post_edit')[0]).value,
            'post_image':document.getElementById(`blog_image${blog_id}`).src
        }

        console.log(blog_data);
        editBlog(blog_data,blog_id)
}

function capture_image(e,id){
    let file = e.target.files[0];

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function() {
        document.getElementById(id).src=reader.result;
        document.getElementById(id).style.display = ""
    };
}

function delete_this_blog(e){
    e.preventDefault()
    if (confirm("Are you sure you want to delete this blog?")) {
        deleteBlog(e.target.dataset["blog"])
    }
}

