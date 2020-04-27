const urlParams = new URLSearchParams(window.location.search);
idCate = urlParams.get('id');
productID = urlParams.get('productID');
cateName = urlParams.get('cateName');
var urlCancelEdit = document.querySelector('#cancel-btn').getAttribute('href') + idCate + "&cateName=" + cateName
document.querySelector('#cancel-btn').setAttribute('href', urlCancelEdit);

const cateApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/categories';
var productInfo = {};

// validate form
var validator = new Validator(document.querySelector('#edit-product-form'), function(err, res) {
    if (res === true) {
        editProduct();
    }

    return false;
}, {
    rules: {
        checkImgUrl: function(value) {
            if ((/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(value)) {
                document.querySelector('#img-preview').setAttribute('src', value);
                return true;
            }
        }
    },
    messages: {
        en: {
            required: {
                empty: 'Không được để trống',
                incorrect: 'Nhập sai thông tin'
            },
            minlength: {
                empty: 'Hãy nhập tối thiểu {0} ký tự',
                incorrect: 'Hãy nhập tối thiểu {0} ký tự'
            },
            checkImgUrl: {
                empty: 'Nhập đường dẫn ảnh',
                incorrect: 'Đường dẫn ảnh không đúng định dạng'
            }
        }
    }
});



function getProductInfor() {
    const getProductInforUrl = cateApiUrl + "/" + idCate + "/products/" + productID;
    axios.get(getProductInforUrl)
        .then(res => {
            if (res.statusText === "OK") {
                let productInfo = res.data;
                // 3. điền dữ liệu lấy đc từ api vào trong form
                document.querySelector('[name="product-name"]').value = productInfo.name;
                document.querySelector('[name="sku"]').value = productInfo.sku;
                document.querySelector('[name="price"]').value = productInfo.price;
                document.querySelector('[name="sale-price"]').value = productInfo.sale_price;
                document.querySelector('[name="amount"]').value = productInfo.amount;
                document.querySelector('[name="image"]').value = productInfo.feature_image;
                document.querySelector('[name="detail"]').value = productInfo.detail;
                document.querySelector('[name="pay"]').value = productInfo.pay;
                document.querySelector('#img-preview').setAttribute('src', document.querySelector('[name="image"]').value);
            }
        })

    axios.get(cateApiUrl)
        .then(res => {
            if (res.statusText === "OK") {
                document.querySelector('select[name="name-cate"]').innerHTML = '';
                var data = res.data;
                var content = "";
                data.forEach(element => {
                    if (element.id == idCate) {
                        content += `<option selected value="${element.id}">${element.name}</option>`;
                    } else {
                        content += `<option value="${element.id}">${element.name}</option>`;
                    }
                });
                document.querySelector('select[name="name-cate"]').innerHTML = content;
            }
        })
}

function editProduct() {
    const categoryId = document.querySelector('select[name="name-cate"]').value;
    const name = document.querySelector('[name="product-name"]').value;
    const sku = document.querySelector('[name="sku"]').value;
    const price = document.querySelector('[name="price"]').value;
    const sale_price = document.querySelector('[name="sale-price"]').value;
    const detail = document.querySelector('[name="detail"]').value;
    const amount = document.querySelector('[name="amount"]').value;
    const feature_image = document.querySelector('[name="image"]').value;
    const pay = document.querySelector('[name="pay"]').value;
    productInfo.categoryId = categoryId;
    productInfo.name = name;
    productInfo.sku = sku;
    productInfo.price = price;
    productInfo.sale_price = sale_price;
    productInfo.detail = detail;
    productInfo.amount = amount;
    productInfo.feature_image = feature_image;
    productInfo.pay = pay;
    // gửi request lên mockapi để thêm khách sạn
    const editProductlUrl = cateApiUrl + "/" + categoryId + "/products/" + productID;

    axios.put(editProductlUrl, productInfo)
        .then(data => {
            if (data.statusText === "OK") {
                window.location.href = `${urlCancelEdit}`;
            }
        })
}