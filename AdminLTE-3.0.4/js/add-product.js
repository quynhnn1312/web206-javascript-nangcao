const urlParams = new URLSearchParams(window.location.search);
idCate = urlParams.get('id')
cateName = urlParams.get('cateName');
var urlAddProduct = document.querySelector('#cancel-btn').getAttribute('href') + idCate + '&cateName=' + cateName;
document.querySelector('#cancel-btn').setAttribute('href', urlAddProduct);
// validate form
var validator = new Validator(document.querySelector('#add-product-form'), function(err, res) {
    if (res === true) {
        addProduct();
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


function addProduct() {
    const categoryId = document.querySelector('select[name="name-cate"]').value;
    const name = document.querySelector('[name="product-name"]').value;
    const sku = document.querySelector('[name="sku"]').value;
    const price = document.querySelector('[name="price"]').value;
    const sale_price = document.querySelector('[name="sale-price"]').value;
    const detail = document.querySelector('[name="detail"]').value;
    const amount = document.querySelector('[name="amount"]').value;
    const feature_image = document.querySelector('[name="image"]').value;
    const pay = document.querySelector('[name="pay"]').value;
    const requestProduct = {
        categoryId: categoryId,
        name: name,
        price: price,
        sale_price: sale_price,
        detail: detail,
        amount: amount,
        feature_image: feature_image,
        sku: sku,
        pay: pay
    };
    const apiUrlProduct = `https://5e9fbd7711b078001679cc5a.mockapi.io/categories/${idCate}/products`;
    //gửi request lên mockapi để thêm khách sạn
    axios.post(apiUrlProduct, requestProduct)
        .then(data => {
            if (data.statusText === "Created") {
                window.location.href = `./list-category.html`;
            }
        })
}

var cateApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/categories';
axios.get(cateApiUrl)
    .then(res => {
        if (res.statusText === "OK") {
            document.querySelector('select').innerHTML = '';
            var data = res.data;
            var content = `<option value="">----- Hãy chọn một khách sạn -----</option>`;
            data.forEach(element => {
                content += `<option value="${element.id}">${element.name}</option>`;
            });
            document.querySelector('select').innerHTML = content;
        }
    })