var storagekey = 'listCart';
var dataString = localStorage.getItem(storagekey);
var listCart;
var totalCart = 0;
if (dataString) {
    document.querySelector("#noCart").style.display = 'none';
    listCart = JSON.parse(dataString);
    document.querySelector("#cart-content").innerHTML = '';
    var content = `<tr>
                        <th class="product">Sản phẩm</th>
                        <th class="qty">Số lượng</th>
                        <th class="linePrice">Tổng tiền</th>
                        <th class="remove">Xóa</th>
                    </tr>`;

    listCart.forEach((element, index) => {
        var price = element.price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        var total = element.price * element.quantity;
        totalCart += total;
        var linePrice = total.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        content += `<tr class="cartItem" id="row-cart-${index}" data-id="22557316">
                        <td class="product">
                            <div class="thumb-cart">
                                <a href="./product-detail.html?proId=${element.proId}&cateId=${element.cateId}" title="${element.name}">
                                    <img src="${element.image}" alt="${element.name}">
                                </a>
                                <a href="./product-detail.html?proId=${element.proId}&cateId=${element.cateId}" title="${element.name}">
                                    <h4>${element.name}</h4>
                                </a>
                                <span>${price}</span>
                            </div>
                        </td>
                        <td class="qty">
                            <div class="qty-number">
                                <input type="button" onclick='qtyminus(${index},${element.price},${total})' value="<" class="qtyminus" field="quantity">
                                <input type="text" size="4" name="quantity" min="1" dataid="22557316" id="updates_1" value="${element.quantity}" onchange="this.val" onfocus="this.select();" class="tc item-quantity eventnone qty quantity-${index}">
                                <input type="button" value=">" onclick='qtyplus(${index},${element.price},${total})' class="qtyplus" field="quantity">
                            </div>
                        </td>
                        <td class="linePrice-${index}">
                            <b>${linePrice}</b>
                        </td>
                        <td class="remove">
                            <a title="Xóa" onclick='removeRowCart(${element.proId},${element.cateId},${element.price},${index})' class="remove-item" data-id="1"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                        </td>
                    </tr>`

    });
    document.querySelector("#cart-content").innerHTML = content;
    document.querySelector("#total-cart").innerHTML = `Tổng tiền <b>${totalCart.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b>`
} else {
    document.querySelector("#hasCart").style.display = 'none'
}

function removeRowCart(proId, cateId, price, index) {
    var qty = document.querySelector(".quantity-" + index).value;
    var total = price * qty;
    totalCart = totalCart - total;
    for (var i = 0; i < listCart.length; i++) {
        if (listCart[i].proId == proId && listCart[i].cateId == cateId) {
            listCart.splice(i, 1)
            break;
        }
    }
    if (listCart.length == 0) {
        localStorage.removeItem('listCart');
        document.querySelector("#noCart").style.display = 'block';
        document.querySelector("#hasCart").style.display = 'none'
    } else {
        localStorage.setItem('listCart', JSON.stringify(listCart));
    }
    document.querySelector("#total-cart").innerHTML = `Tổng tiền <b>${totalCart.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b>`
    document.querySelector('#row-cart-' + index).remove();
}

function qtyminus(index, price, total) {
    var x = totalCart - total
    var qty = document.querySelector(".quantity-" + index)
    var linePrice = document.querySelector(".linePrice-" + index);
    if (qty.value > 1) {
        listCart[index].quantity = listCart[index].quantity - 1;
        localStorage.setItem(storagekey, JSON.stringify(listCart));
        var minus = qty.value = qty.value - 1;
        var totalMinus = price * minus;
        x = x + totalMinus;
        linePrice.innerHTML = totalMinus.toLocaleString('vi', { style: 'currency', currency: 'VND' })
        document.querySelector("#total-cart").innerHTML = `Tổng tiền <b>${x.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b>`
    }
}

function qtyplus(index, price, total) {
    listCart[index].quantity = listCart[index].quantity + 1;
    localStorage.setItem(storagekey, JSON.stringify(listCart));
    var x = totalCart - total
    var qty = document.querySelector(".quantity-" + index)
    var linePrice = document.querySelector(".linePrice-" + index);
    var plus = qty.value = parseInt(qty.value) + 1;
    var totalPlus = price * plus;
    x = x + totalPlus;
    linePrice.innerHTML = totalPlus.toLocaleString('vi', { style: 'currency', currency: 'VND' })
    document.querySelector("#total-cart").innerHTML = `Tổng tiền <b>${x.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b>`
}