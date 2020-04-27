const newApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/news';

//validate form
var validator = new Validator(document.querySelector('#add-new-form'), function(err, res) {
    if (res === true) {
        addNew();
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
                empty: 'Không được để trống !',
                incorrect: 'Nhập sai thông tin !'
            },
            minlength: {
                empty: 'Hãy nhập tối thiểu {0} ký tự !',
                incorrect: 'Hãy nhập tối thiểu {0} ký tự !'
            },
            checkImgUrl: {
                empty: 'Nhập đường dẫn ảnh',
                incorrect: 'Đường dẫn ảnh không đúng định dạng'
            }
        }
    }
});


function addNew() {
    const title = document.querySelector('[name="title"]').value;
    const short_description = document.querySelector('[name="short_description"]').value;
    const view_count = document.querySelector('[name="view_count"]').value;
    const poster_name = document.querySelector('[name="poster_name"]').value;
    const createdAt = document.querySelector('[name="createdAt"]').value;
    const avatar = document.querySelector('[name="avatar"]').value;
    const description = document.querySelector('[name="description"]').value;
    if (exampleRadios1.checked) {
        status = document.querySelector('#exampleRadios1').value
    }
    if (exampleRadios2.checked) {
        status = document.querySelector('#exampleRadios2').value
    }
    const requestObj = {
        title: title,
        short_description: short_description,
        view_count: view_count,
        poster_name: poster_name,
        createdAt: createdAt,
        avatar: avatar,
        description: description,
        status: status
    };
    // gửi request lên mockapi để thêm khách sạn
    axios.post(newApiUrl, requestObj)
        .then(data => {
            if (data.statusText === "Created") {
                window.location.href = './list-new.html';
            }
        })
}