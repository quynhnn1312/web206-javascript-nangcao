const urlParams = new URLSearchParams(window.location.search);
newId = urlParams.get('newId');
const newApiUrl = `https://5e9fbd7711b078001679cc5a.mockapi.io/news/${newId}`;
axios.get(newApiUrl)
    .then(response => {
        if (response.statusText === "OK") {
            var data = response.data;
            document.querySelector('#title-news-detail').innerText = data.title
            document.querySelector('#title-news-span').innerText = data.title
            document.querySelector('.entry-title.arti').innerHTML = `<a href="./chitiet-tintuc.html?newId=${data.id}" title="${data.title}">${data.title}</a>`
            document.querySelector('#name-poster').innerHTML = `Đăng bởi : ${data.poster_name}`
            document.querySelector('#blog-post-date').innerHTML = `<i class="fas fa-calendar-alt"></i> ${data.createdAt}`
            document.querySelector('#blog-post-description').innerHTML = data.description
        }
    })