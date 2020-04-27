const cateApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/categories';
var CateInfo = {};
// 1. lấy tham số id trên đường dẫn
const urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');

//validate form
var validator = new Validator(document.querySelector('#add-edit-form'), function(err, res) {
    if (res === true) {
        editCate();
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

function getCateInfor() {
    // 2. gửi request lên mock api để lấy thông tin của khách sạn về
    const getCateInfoUrl = cateApiUrl + "/" + id;
    axios.get(getCateInfoUrl)
        .then(res => {
            if (res.statusText === "OK") {
                let CateInfo = res.data;
                // 3. điền dữ liệu lấy đc từ api vào trong form
                document.querySelector('[name="name"]').value = CateInfo.name;
                document.querySelector('[name="slug"]').value = CateInfo.slug;
            }
        })

}

function editCate() {
    const name = document.querySelector('[name="name"]').value;
    const slug = document.querySelector('[name="slug"]').value;
    CateInfo.name = name;
    CateInfo.slug = slug;
    // gửi request lên mockapi để thêm khách sạn
    const updateCatelUrl = cateApiUrl + "/" + id;
    axios.put(updateCatelUrl, CateInfo)
        .then(data => {
            if (data.statusText === "OK") {
                window.location.href = './list-category.html';
            }
        })
}