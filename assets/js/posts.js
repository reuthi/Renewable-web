async function getPosts() {
    const response = await makeRequest("get", `${apiUrl}/Posts`)
    posts = [...posts, ...JSON.parse(response)]
    // posts = [...posts, ...dataPosts]

}

async function loadPosts() {
    await getPosts()
    const div = document.createElement('div');
    div.className = 'row'
    posts.forEach((post, index) => {
        div.innerHTML +=
            `<div class="col-lg-4 col-md-6 col-sm-6 col-12">
                <div class="blog-single-post">
                    <div class="blog-img">
                        <a href="post.html?index=${index}" title="">
                            <img src="assets/images/posts/${index+1}.jpg" alt="">
                        </a>
                        <div class="view-post">
                            <a href="post.html?index=${index}" title="" class="view-posts">View Post</a>
                        </div>
                    </div><!--blog-img end-->
                    <div class="post_info">
                        <ul class="post-nfo">
                            <li><i class="la la-calendar"></i>${new Date(post.date).toDateString()}</li>
                        </ul>
                        <h3><a href="post.html?index=${index}" title="">${post.title}</a></h3>
                        <p>${post.body.substring(0, 100)}...</p>
                        <a href="post.html?index=${index}" title="">Read More <i class="la la-long-arrow-right"></i></a>
                    </div>
                    <a href="post.html?index=${index}" title="" class="ext-link"></a>
                </div>
            </div>`
    })
    const container = document.getElementsByClassName('blog-grid-posts')[0];
    if (container) {
        container.appendChild(div)
    }
    getPost()
}

function getPost() {
    var params = (new URL(window.location)).searchParams.toString();
    params = params.substring(params.indexOf('=') + 1, params.length);
    const index = parseInt(params)
    const post = posts[index]
    const div = document.createElement('div');
    div.innerHTML =
        ` 
        <div class="row">
        <div class="col-lg-8">
        <div class="blog-single-post single">
    <ul class="post-nfo">
        <li><i class="la la-calendar"></i>${new Date(post.date).toDateString()}</li>
    </ul>
    <h3>${post.title}</h3>
    <div class="blog-img">
        <img src="assets/images/posts/${index+1}_thumb.jpg" alt="">
    </div>
    <p>${post.body}</p>
    <div class="post-share">
        <ul class="social-links">
            <li><a href="#" title=""><i class="fa fa-facebook"></i></a></li>
            <li><a href="#" title=""><i class="fa fa-twitter"></i></a></li>
            <li><a href="#" title=""><i class="fa fa-instagram"></i></a></li>
            <li><a href="#" title=""><i class="fa fa-linkedin"></i></a></li>
        </ul>
    </div><!--post-share end-->

</div><!--blog-single-post end-->
</div>
</div>

`
    const container = document.getElementsByClassName('blog-single-details')[0];
    if (container) {
        container.appendChild(div)
    }
}

loadPosts()