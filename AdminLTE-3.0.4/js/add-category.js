const cateApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/categories';

//validate form
var validator = new Validator(document.querySelector('#add-cate-form'), function(err, res) {
    if (res === true) {
        addCate();
    }
    return false;
}, {
    messages: {
        en: {
            required: {
                empty: 'Không được để trống !',
                incorrect: 'Nhập sai thông tin !'
            },
            minlength: {
                empty: 'Hãy nhập tối thiểu {0} ký tự !',
                incorrect: 'Hãy nhập tối thiểu {0} ký tự !'
            }
        }
    }
});


function addCate() {
    const name = document.querySelector('[name="name"]').value;
    const slug = document.querySelector('[name="slug"]').value;
    const requestObj = {
        name: name,
        slug: slug
    };
    // gửi request lên mockapi để thêm khách sạn
    axios.post(cateApiUrl, requestObj)
        .then(data => {
            if (data.statusText === "Created") {
                window.location.href = './list-category.html';
            }
        })
}