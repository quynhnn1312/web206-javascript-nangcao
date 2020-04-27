const urlParams = new URLSearchParams(window.location.search);
proId = urlParams.get('proId');
cateId = urlParams.get('cateId');
axios.get(`https://5e9fbd7711b078001679cc5a.mockapi.io/categories/${cateId}`)
    .then(response => {
        if (response.statusText === "OK") {
            var data = response.data;
            document.querySelector('#name-cate-product a').innerHTML = `<a href="all-products.html?cateID=${data.id}" target="_self">${data.name}</a>`
        }
    })
const productApiUrl = `https://5e9fbd7711b078001679cc5a.mockapi.io/categories/${cateId}/products/${proId}`;
axios.get(productApiUrl)
    .then(response => {
        if (response.statusText === "OK") {
            var data = response.data;
            var sale_price = parseInt(data.sale_price);
            var price = parseInt(data.price);
            sale_price = sale_price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
            price = price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
            document.querySelector("#title-head").innerHTML = data.name
            document.querySelector("#name-product-detail").innerHTML = data.name
            document.querySelector(".title-product").innerHTML = data.name
            document.querySelector("#pro-price span").innerHTML = sale_price
            document.querySelector("#pro-price del").innerHTML = price
            document.querySelector("#sku-product").innerHTML = data.sku
            document.querySelector("#shortDesc-pro").innerHTML = data.detail
            document.querySelector("#desc-tab p").innerHTML = data.detail

            if (data.amount > 0) {
                document.querySelector("#price-preview").innerHTML = "Còn hàng"
                document.querySelector("#form-pro").style.display = "block"
                document.querySelector("#out-of-stock").style.display = "none"
                document.querySelector("#btn-add-cart").style.display = "block"
                document.querySelector("#link-detail").innerHTML = `<a href="#" id="btn-add-cart" data-toggle="modal" data-target="#addCartModal" onclick="addToCartPro({cateId:${cateId},proId:${proId},name:'${data.name}',price:${data.sale_price},image:'${data.feature_image}'})" class="add-to-c btnAddCart">Thêm vào giỏ</a>`
            } else {
                document.querySelector("#price-preview").innerHTML = "Hết hàng"
                document.querySelector("#form-pro").style.display = "none"
                document.querySelector("#out-of-stock").style.display = "block"
                document.querySelector("#btn-add-cart").style.display = "none"
                document.querySelector("#out-of-stock").innerHTML = "Hết hàng"
            }

            var content = `<div id="slider" class="flexslider">
                                <ul class="slides">
                                    <li>
                                        <span>
                                            <a class="fancybox-thumb" href="${data.feature_image}" title="Hình chính">
                                                <img class="product-image-feature"  src="${data.feature_image}"  alt="" >
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div class="image ma-product-slider-img hidden">
                                <a title="Áo CONTRAST PIPING" class="fancybox-thumb" data-fancybox="images" href="${data.feature_image}">
                                    <img alt="Áo CONTRAST PIPING" data-image="${data.feature_image}" data-dcm="${data.feature_image}" class="center-block img-responsive main-image " style="" src="${data.feature_image}">
                                </a>
                            </div>
                            <div class="image ma-product-slider-img hidden">
                                <a title="Áo CONTRAST PIPING" class="fancybox-thumb" data-fancybox="images" href="${data.feature_image}">
                                    <img alt="Áo CONTRAST PIPING" data-image="${data.feature_image}" data-dcm="${data.feature_image}" class="center-block img-responsive main-image " style="" src="${data.feature_image}">
                                </a>
                            </div>
                            <div class="image ma-product-slider-img hidden">
                                <a title="Áo CONTRAST PIPING" class="fancybox-thumb" data-fancybox="images" href="${data.feature_image}">
                                    <img alt="Áo CONTRAST PIPING" data-image="${data.feature_image}" data-dcm="${data.feature_image}" class="center-block img-responsive main-image " style="" src="${data.feature_image}">
                                </a>
                            </div>
                            <div class="image ma-product-slider-img hidden">
                                <a title="Áo CONTRAST PIPING" class="fancybox-thumb" data-fancybox="images" href="${data.feature_image}">
                                    <img alt="Áo CONTRAST PIPING" data-image="${data.feature_image}" data-dcm="${data.feature_image}" class="center-block img-responsive main-image " style="" src="${data.feature_image}">
                                </a>
                            </div>
                            <div id="carousel" class="flexslider">
                                <ul class="slides">
                                    <li class="product-thumb checked">
                                        <a href="#" data-image="${data.feature_image}" data-zoom-image="${data.feature_image}">
                                            <img src="${data.feature_image}" data-image="${data.feature_image}" alt="">
                                        </a>
                                    </li>
                                    <li class="product-thumb ">
                                        <a href="#" data-image="${data.feature_image}" data-zoom-image="${data.feature_image}">
                                            <img src="${data.feature_image}" data-image="${data.feature_image}" alt="">
                                        </a>
                                    </li>
                                    <li class="product-thumb ">
                                        <a href="#" data-image="${data.feature_image}" data-zoom-image="${data.feature_image}">
                                            <img src="${data.feature_image}" data-image="${data.feature_image}" alt="">
                                        </a>
                                    </li>
                                    <li class="product-thumb ">
                                        <a href="#" data-image="${data.feature_image}" data-zoom-image="${data.feature_image}">
                                            <img src="${data.feature_image}" data-image="${data.feature_image}" alt="">
                                        </a>
                                    </li>
                                </ul>
                            </div>`
            document.querySelector("#slider-image-product").innerHTML = content
        }
    })