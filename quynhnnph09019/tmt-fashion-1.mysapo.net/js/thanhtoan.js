if (localStorage.getItem('listCart')) {
    var listCart = JSON.parse(localStorage.getItem('listCart'));
    var content = '';
    var x = 0;
    var totalCart = 0;
    listCart.forEach(element => {
        x++
        var total = element.price * element.quantity;
        totalCart += total;
        content += `<tr class="product product-has-image clearfix">
                        <td>
                            <div class="product-thumbnail">
                                <div class="product-thumbnail__wrapper">
                                    <img src="${element.image}" class="product-thumbnail__image">
                                </div>
                                <span class="product-thumbnail__quantity" aria-hidden="true">${element.quantity}</span>
                            </div>
                        </td>
                        <td class="product-info">
                            <span class="product-info-name">
                                ${element.name}
                            </span>
                        </td>
                        <td class="product-price text-right">
                            ${element.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </td>
                    </tr>`
    });
    document.querySelector("#list-checkout").innerHTML = content;
    document.querySelector("#count-cart").innerHTML = `Đơn hàng (${x} sản phẩm)`;
    document.querySelector("#total-checkout").innerHTML = totalCart.toLocaleString('vi', { style: 'currency', currency: 'VND' })
    document.querySelector("#bottom-total-checkout").innerHTML = totalCart.toLocaleString('vi', { style: 'currency', currency: 'VND' })

}