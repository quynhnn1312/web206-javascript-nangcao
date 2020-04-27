const cateApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/categories';
axios.get(cateApiUrl)
    .then(response => {
        if (response.statusText === "OK") {
            document.querySelector('#show-categorys').innerHTML = '';

            var data = response.data;
            var content = ``;
            data.forEach(element => {
                content += `<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                                <a href="all-products.html?cateID=${element.id}">${element.name}</a>
                            </li>`;
            });
            document.querySelector('#show-categorys').innerHTML = content;

        }
    })


axios.get(cateApiUrl)
    .then(response => {
        if (response.statusText === "OK") {
            document.querySelector('#show-category-sidebar').innerHTML = '';
            var data = response.data;
            var content = ``;
            data.forEach(element => {
                content += `<li class="nav-item lv2">
                                <a class="nav-link" href="all-products.html?cateID=${element.id}">${element.name}</a>
                            </li>`;
            });
            document.querySelector('#show-category-sidebar').innerHTML = content;

        }
    })

var listCartxxx = JSON.parse(localStorage.getItem('listCart'));
document.querySelector('#hd-cart-count').innerHTML = listCartxxx.length