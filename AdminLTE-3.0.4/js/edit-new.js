const newApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/news';
// 1. lấy tham số id trên đường dẫn
const urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');

//validate form
var validator = new Validator(document.querySelector('#edit-new-form'), function(err, res) {
    if (res === true) {
        editNew();
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


function getNewInfor() {
    // 2. gửi request lên mock api để lấy thông tin của khách sạn về
    const getNewInfoUrl = newApiUrl + "/" + id;
    axios.get(getNewInfoUrl)
        .then(res => {
            if (res.statusText === "OK") {
                let newInfo = res.data;
                // 3. điền dữ liệu lấy đc từ api vào trong form
                document.querySelector('[name="title"]').value = newInfo.title
                document.querySelector('[name="short_description"]').value = newInfo.short_description
                document.querySelector('[name="view_count"]').value = newInfo.view_count
                document.querySelector('[name="poster_name"]').value = newInfo.poster_name
                document.querySelector('[name="createdAt"]').value = newInfo.createdAt
                document.querySelector('[name="avatar"]').value = newInfo.avatar
                document.querySelector('[name="description"]').value = newInfo.description
                document.querySelector('#img-preview').setAttribute('src', document.querySelector('[name="avatar"]').value);
                if (newInfo.status == 1) {
                    document.querySelector('#exampleRadios1').setAttribute('checked', '');
                }
                if (newInfo.status == 0) {
                    document.querySelector('#exampleRadios2').setAttribute('checked', '');
                }
            }
        })

}

function editNew() {
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
    const updateNewUrl = newApiUrl + "/" + id;
    axios.put(updateNewUrl, requestObj)
        .then(data => {
            if (data.statusText === "OK") {
                window.location.href = './list-new.html';
            }
        })
}