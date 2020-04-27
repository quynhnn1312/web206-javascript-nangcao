const newApiUrl = 'https://5e9fbd7711b078001679cc5a.mockapi.io/news';
axios.get(newApiUrl)
    .then(res => {
            if (res.statusText === "OK") {
                document.querySelector('tbody').innerHTML = '';
                var data = res.data;
                var content = ``;
                data.forEach(element => {
                            content += `<tr id="row-${element.id}">
                            <td>${element.id}</td>
                            <td>${element.title}</td>
                            <td> <img src=" ${element.avatar}" width="100px" class="img img-avatar"/></td>
                            <td>
                                <li>Lượt xem: ${element.view_count}</li>
                                <li>Tác Giả: ${element.poster_name}</li>
                                <li>Ngày tạo: ${element.createdAt}</li>
                            </td>
                            <td>${element.status == 1 ? `<a style='color:white' class="btn btn-xs btn-success"> 
                            <i class="fas fa-eye"></i> Hiển thị</a>` : `<a style='color:white' class="btn btn-xs btn-danger"> 
                            <i class="fas fa-eye-slash"></i>Ẩn</a>`}</td>
                            <td>
                                <a href="./edit-new.html?id=${element.id}" class="btn btn-sm btn-primary">Sửa</a>  
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
            var deleteUrl = newApiUrl + "/" + removeId;
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