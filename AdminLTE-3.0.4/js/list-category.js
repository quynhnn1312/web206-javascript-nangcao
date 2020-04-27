var cateApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/categories';
axios.get(cateApiUrl)
    .then(res => {
        if (res.statusText === "OK") {
            document.querySelector('tbody').innerHTML = '';
            var data = res.data;
            var content = ``;
            data.forEach(element => {
                content += `<tr id="row-${element.id}">
                            <td>${element.id}</td>
                            <td>${element.name}</td>
                            <td>${element.slug}</td>
                            <td>
                                <a href="./edit-category.html?id=${element.id}" class="btn btn-sm btn-primary">Sửa</a>  
                                <a href="./list-product.html?id=${element.id}&cateName=${element.name}" class="btn btn-sm btn-info">Chi tiết</a> 
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
            var deleteUrl = cateApiUrl + "/" + removeId;
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