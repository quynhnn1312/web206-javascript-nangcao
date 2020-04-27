const urlParams = new URLSearchParams(window.location.search);
cateID = urlParams.get('cateID');

const productApiUrl = `https://5e9fbd7711b078001679cc5a.mockapi.io/categories/${cateID}/products`;
axios.get(productApiUrl)
    .then(response => {
        if (response.statusText === "OK") {
            document.querySelector('#show-page-products').innerHTML = '';
            var data = response.data;
            var content = ``;
            data.forEach(element => {
                var sale_price = parseInt(element.sale_price);
                var price = parseInt(element.price);
                var onsale = (100 - Math.round((sale_price / price) * 100)) + '%';
                sale_price = sale_price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                price = price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                if (element.sale_price > 0) {
                    content += `<div class="col-md-4 col-sm-6 col-xs-6">
                    <div class="single-product mb-10">
                        <div class="product-img img-full">
                            <a href="./product-detail.html?proId=${element.id}&cateId=${cateID}" title="${element.name}">
                            <span class="onsale">${onsale}</span>
                                <img class="visible-xs lazyload"  src="${element.feature_image}" alt="${element.name}">
                                <img class="hidden-xs lazyload protmt1 " src="${element.feature_image}" alt="${element.name}" data-src="${element.feature_image}">
                                <img class="pro-img2 hidden-xs" src="${element.feature_image}" alt="${element.name}">
                            </a>
                            <a href="#" class="product-action btn-quickview-1" data-handle="/black-velvet-jacket">
                                <ul>
                                    <li onclick="modalContent(${cateID},${element.id})">XEM NHANH</li>
                                </ul>
                            </a>
                        </div>
                        <div class="product-content">
                            <h3><a href="./product-detail.html?proId=${element.id}&cateId=${cateID}" title="${element.name}">${element.name}</a></h3>
                            <div class="product-price">
                                <div class="price-box">
                                    <span class="regular-price">${sale_price}</span>
                                    <span class="price ml5">${price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                } else {
                    content += `<div class="col-md-4 col-sm-6 col-xs-6">
                    <div class="single-product mb-10">
                        <div class="product-img img-full">
                            <a href="./product-detail.html?proId=${element.id}&cateId=${cateID}" title="${element.name}">
                                <img class="visible-xs lazyload"  src="${element.feature_image}" alt="${element.name}">
                                <img class="hidden-xs lazyload protmt1 " src="${element.feature_image}" alt="${element.name}" data-src="${element.feature_image}">
                                <img class="pro-img2 hidden-xs" src="${element.feature_image}" alt="${element.name}">
                            </a>
                            <a href="#" class="product-action btn-quickview-1" data-handle="/black-velvet-jacket">
                                <ul>
                                    <li>XEM NHANH</li>
                                </ul>
                            </a>
                        </div>
                        <div class="product-content">
                            <h3><a href="./product-detail.html?proId=${element.id}&cateId=${cateID}" title="${element.name}">${element.name}</a></h3>
                            <div class="product-price">
                                <div class="price-box">
                                    <span class="regular-price">${sale_price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                }


            });
            document.querySelector('#show-page-products').innerHTML = content;


        }
    })