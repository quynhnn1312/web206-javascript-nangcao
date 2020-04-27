function modalContent(cateId, proId) {
    const productApiUrl = `https://5e9fbd7711b078001679cc5a.mockapi.io/categories/${cateID}/products/${proId}`;
    axios.get(productApiUrl)
        .then(response => {
            if (response.statusText === "OK") {
                document.querySelector('#modal-body').innerHTML = '';
                var data = response.data;
                var sale_price = parseInt(data.sale_price);
                var price = parseInt(data.price);
                sale_price = sale_price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                price = price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
                var content = `
                <div class="container-fluid">
                <div class="row">
                   <form method="post" action="/cart/add">
                      <div class="col-lg-5 col-md-6">
                         <div class="image-zoom row">
                            <img class="p-product-image-feature" src="${data.feature_image}" alt="${data.name}">
                            <div id="p-sliderproduct" class="flexslider">
                               <ul class="slides owlDesign  owl-responsive-992 owl-carousel owl-theme owl-loaded">
                                  <div class="owl-stage-outer">
                                     <div class="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 358px;">
                                        <div class="owl-item active" style="width: 79.5px; margin-right: 10px;">
                                            <li class="product-thumb"><a href="#" data-image="${data.feature_image}" data-zoom-image="${data.feature_image}"><img data-image="${data.feature_image}" data-zoom-image="${data.feature_image}" src="${data.feature_image}"></a></li>
                                        </div>
                                        <div class="owl-item active" style="width: 79.5px; margin-right: 10px;">
                                            <li class="product-thumb"><a href="#" data-image="${data.feature_image}" data-zoom-image="${data.feature_image}"><img data-image="${data.feature_image}" data-zoom-image="${data.feature_image}" src="${data.feature_image}"></a></li>
                                        </div>
                                        <div class="owl-item active" style="width: 79.5px; margin-right: 10px;">
                                            <li class="product-thumb"><a href="#" data-image="${data.feature_image}" data-zoom-image="${data.feature_image}"><img data-image="${data.feature_image}" data-zoom-image="${data.feature_image}" src="${data.feature_image}"></a></li>
                                        </div>
                                        <div class="owl-item active" style="width: 79.5px; margin-right: 10px;">
                                           <li class="product-thumb"><a href="#" data-image="${data.feature_image}" data-zoom-image="${data.feature_image}"><img data-image="${data.feature_image}" data-zoom-image="${data.feature_image}" src="${data.feature_image}"></a></li>
                                        </div>
                                     </div>
                                  </div>
                                  <div class="owl-controls">
                                     <div class="owl-nav">
                                        <div class="owl-prev" style="">‹</div>
                                        <div class="owl-next" style="">›</div>
                                     </div>
                                     <div class="owl-dots" style="display: block;">
                                        <div class="owl-dot active"><span></span></div>
                                     </div>
                                  </div>
                               </ul>
                            </div>
                         </div>
                      </div>
                      <div class="col-lg-7 col-md-6 pull-right" style="padding: 0px 10px;">
                         <div class="form-input">
                            <div class="product-title p-title">
                               <h3>${data.name}</h3>
                            </div>
                            <div class="product-price">
                               <span class="p-price ">${sale_price}</span>
                               <del>${price}</del>
                            </div>
                         </div>
                         <div class="form-des">${data.detail}</div>
                         <div class="clearfix"></div>
                         <div class="form-input vid hidden">
                            <div class="m-vendor"><span>Nhà cung cấp: </span>Thecosmo</div>
                            <div class="m-sku"><span>Mã sản phẩm: </span>${data.sku}</div>
                            <div class="m-tt">
                            </div>
                         </div>
                         <div class="p-option-wrapper" style="display: block;">
                            <div class="selector-wrapper">
                               <label>Kích thước</label>
                               <span class="custom-dropdown custom-dropdown--white">
                                  <select class="single-option-selector custom-dropdown__select custom-dropdown__select--white" data-option="option1" id="qv-product-selectors-option-0">
                                     <option value="L">L</option>
                                     <option value="M">M</option>
                                  </select>
                               </span>
                            </div>
                            <select id="qv-product-selectors" name="variantId" style="display: none;">
                               <option value="22557316">L - 750000</option>
                               <option value="22557325">M - 800000</option>
                            </select>
                         </div>
                         <div class="form-input qty" style="display: block;">
                            <label>Số lượng</label>
                            <input name="quantity" type="number" min="1" value="1" class="quantityPro-${data.id}" id="lll">
                         </div>
                         <div class="form-input actionQVC" style="width: 100%">
                            <button type="button" data-toggle="modal" data-target="#addCartModal" onclick="addToCartPro({cateId:${cateId},proId:${proId},name:'${data.name}',price:${data.sale_price},image:'${data.feature_image}'})" class="btn-addCart btn-addcart ds-cart addToCartModal cart_QV">Thêm vào giỏ</button>
                            <!--<button disabled class="btn-detail addtocart btn-color-add btn-min-width btn-mgt btn-soldout">Hết hàng</button>-->
                            <button style="display:none" type="button" class="btn-addCart ds-cart cart_QV noPrice" onclick="window.location = '/cart'">Xem giỏ hàng</button>
                            <div class="qv-readmore">
                               <span> hoặc </span><a class="read-more p-url" href="./product-detail.html?proId=${data.id}&cateId=${cateId}" role="button" title="Xem chi tiết">Xem chi tiết</a>
                            </div>
                         </div>
                      </div>
                   </form>
                </div>
             </div>`;

                document.querySelector('#modal-body').innerHTML = content;
            }
        })
}