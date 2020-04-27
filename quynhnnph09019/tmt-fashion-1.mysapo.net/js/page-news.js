const newApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/news';
axios.get(newApiUrl)
    .then(response => {
        if (response.statusText === "OK") {
            document.querySelector('#blog_area').innerHTML = '';
            var data = response.data;
            var content = ``;
            data.forEach(element => {
                if (element.status == 1) {
                    content += `<article class="blog_single">
                                <div class="entry-header">
                                    <span class="post-category">
                                        <a href="#"> </a>
                                    </span>
                                    <h3 class="entry-title xx">
                                        <a href="chitiet-tintuc.html?newId=${element.id}" title="${element.title}">${element.title}</a>
                                    </h3>
                                    <span class="post-author">
                                    <span class="post-by"> Đăng bởi : </span> ${element.poster_name} </span>
                                    <span class="post-separator">|</span>
                                    <span class="blog-post-date"><i class="fas fa-calendar-alt"></i>${element.createdAt} </span>
                                </div>
                                <div class="post-thumbnail img-full">
                                    <a href="chitiet-tintuc.html?newId=${element.id}" title="${element.title}">
                                        <img src="${element.avatar}" alt="${element.title}">
                                    </a>
                                </div>
                                <div class="postinfo-wrapper">
                                    <div class="post-info">
                                        <div class="entry-summary">
                                            <p> ${element.short_description} </p>
                                            <a href="chitiet-tintuc.html?newId=${element.id}" title="Xem thêm" class="form-button">Xem thêm</a>
                                        </div>
                                    </div>
                                </div>
                            </article>`;
                }

            });
            document.querySelector('#blog_area').innerHTML = content;
        }
    })