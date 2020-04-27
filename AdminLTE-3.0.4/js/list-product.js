const urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
cateName = urlParams.get('cateName');
var urlAddProduct = document.querySelector('#add-product').getAttribute('href') + id + '&cateName=' + cateName;
document.querySelector('#add-product').setAttribute('href', urlAddProduct)
var urlProducts = `https://5e9fbd7711b078001679cc5a.mockapi.io/categories/${id}/products`;
axios.get(urlProducts)
    .then(res => {
        if (res.statusText === "OK") {
            document.querySelector('tbody').innerHTML = '';
            var data = res.data;
            var content = ``;
            data.forEach(element => {
                content += `<tr id="row-${element.id}">
                            <td>${element.id}</td>
                            <td>${cateName}</td>
                            <td>${element.name}</td>
                            <td>
                                <img src="${element.feature_image}" width="100px" class="img img-avatar"/>
                            </td>
                            <td>${element.price}$</td>
                            <td>${element.sale_price}$</td>
                            <td>
                                <li>Mã SP : ${element.sku}</li>
                                <li>Số lượng : ${element.amount}</li>
                                <li>Mô tả : ${element.detail}</li>
                                <li>Đã bán : ${element.pay}</li>
                            </td>
                            <td>
                                <a href="./edit-product.html?id=${id}&productID=${element.id}&cateName=${cateName}" class="btn btn-sm btn-primary">Sửa</a>  
                                <button class="btn btn-sm btn-danger"  onclick="removeElement(${element.id})">Xóa</button>  
                            </td>
                        </tr>`;
            });
            document.querySelector('tbody').innerHTML = content;
        }
    })

function removeElement(removeId) {
    // confirm
    Swal.fire({
        title: 'Chắc chắn xóa hotels?',
        text: "Sau khi xóa sẽ không lấy lại dữ liệu được!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý!',
        cancelButtonText: 'Không đồng ý!'
    }).then((result) => {
        if (result.value) {
            // gửi request lên server
            var deleteUrl = urlProducts + "/" + removeId;
            axios.delete(deleteUrl)
                .then(response => {
                    console.log(response);
                })
                .then(() => {
                    var removeElement = document.querySelector('#row-' + removeId);
                    removeElement.remove();
                    Swal.fire({
                        position: 'bottom-end',
                        icon: 'success',
                        title: 'Đã xóa',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
    })
}