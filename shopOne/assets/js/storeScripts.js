



function getcategorypros(id) {

    $.post("/Home/getstorepros", { id: id })

        .done(function (result) {

            $("#alprolen").text(result.products.length)
            console.log(result.products.length);

            let rowsCount = 6;
            let currentPage = 1;

            let pageCount = Math.ceil(result.products.length / rowsCount);
            //console.log(pageCount)








            let proListContainer = document.querySelector('.stor-pro')

            displayUesrsList(result.products, proListContainer, rowsCount, currentPage)


            function displayUesrsList(allArray, usersContainer, rowsCount, currentPage) {
                usersContainer.innerHTML = ''

                let endIndex = rowsCount * currentPage
                let startIndex = endIndex - rowsCount

                let paginated = allArray.slice(startIndex, endIndex)

                let flag = 0;
                let Bphoto;
                paginated.forEach(function (pro) {

                    let prolabales = "";
                    if (pro.discount > 1) {
                        prolabales += `<span class="sale">-%${pro.discount}</span>`
                    }



                    var date = new Date(parseInt(pro.createTime.substr(6)));
                    var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                    var targetDate = new Date(formattedDate);
                    var currentDate = new Date();


                    if ((currentDate - targetDate) < (32 * 24 * 60 * 60 * 1000)) {

                       
                        prolabales+=      ` <span class="new">جدید</span>`

                    }


                    let oldprice = pro.price - ((pro.price / 100) * pro.discount)

                    let ID = pro.pkID
                    flag++
                    result.productsPhotos.forEach(element => {

                        if (element.FKproduct_ID == ID) {
                            Bphoto = element.banerphoto
                            //console.log(Bphoto)
                        }
                    });



                    $(".stor-pro").append(`
                                  <div class="col-md-4 col-xs-6">
                                  <div id="product_${pro.pkID}" class="product">
                                                <div class="product-img"style="width: 100%;height: 263px;">
                                                    <img src="/assets/img/products_imgae/${Bphoto}"/>
                                                    <div class="product-label product-label_${pro.pkID}">

                                                   ${prolabales}

                                                    </div>
                                                </div>
                                                <div class="product-body">
                                                    <p class="product-category">Category</p>
                                                    <h3 class="product-name"><a href="#">${pro.pName}</a></h3>
                                                    <h4 class="product-price">${pro.price} <del class="product-old-price">${oldprice}</del></h4>
                                                    <div class="product-rating">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <div class="product-btns">
                                                        <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                                                        <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                                                        <button id="quick-view_${pro.pkID}" onclick="quickViewHandler(event ,this.id)" class="quick-view  "><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                                                    </div>
                                                </div>
                                                <div  class="add-to-cart">
                                                    <button id="addToCartoff_${pro.pkID}" class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                                                </div>
                                            </div>

                        </div>




                        `)

                    if (flag % 3 === 0) {
                        $(".stor-pro").append(`

                            <div class="clearfix visible-lg visible-md"></div>
                            `
                        )
                    }

                })






            };


            //--------------------------------------------------
            $(".store-pagination").empty();

            for (let i = 1; i < pageCount + 1; i++) {
                let btn = paginationButtonGenerator(i, result.products)
                $(".store-pagination").append(btn)
            }



            function paginationButtonGenerator(page, allUesrsArray) {
                let button = document.createElement('li')
                button.classList.add("rev")
                button.innerHTML = page

                if (page === currentPage) {
                    button.classList.add('active')
                }

                button.addEventListener('click', function () {
                    currentPage = page
                    displayUesrsList(allUesrsArray, proListContainer, rowsCount, currentPage)

                    let prevPage = document.querySelector('li.rev.active')
                    //console.log(prevPage)
                    prevPage.classList.remove('active')

                    button.classList.add('active')



                    addProductClickHandeler();


                })
                return button

            }



            //    $(".stor-pro").empty()
            //    let flag = 0;
            //    result.products.forEach(element => {
            //        let ID = element.pkID
            //        let Bphoto;
            //        flag++
            //        result.productsPhotos.forEach(element => {

            //            if (element.FKproduct_ID == ID) {
            //                Bphoto = element.banerphoto
            //                //console.log(Bphoto)
            //            }
            //        });

            //        $(".stor-pro").append(`
            //          <div class="col-md-4 col-xs-6">
            //      <div id="product_${element.pkID}" class="product">
            //                                <div class="product-img"style="width: 100%;height: 263px;">
            //                                    <img src="/assets/img/products_imgae/${Bphoto}"/>
            //                                    <div class="product-label product-label_${element.pkID}">

            //                                    </div>
            //                                </div>
            //                                <div class="product-body">
            //                                    <p class="product-category">Category</p>
            //                                    <h3 class="product-name"><a href="#">${element.pName}</a></h3>
            //                                    <h4 class="product-price">${element.price} <del class="product-old-price">$990.00</del></h4>
            //                                    <div class="product-rating">
            //                                        <i class="fa fa-star"></i>
            //                                        <i class="fa fa-star"></i>
            //                                        <i class="fa fa-star"></i>
            //                                        <i class="fa fa-star"></i>
            //                                        <i class="fa fa-star"></i>
            //                                    </div>
            //                                    <div class="product-btns">
            //                                        <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
            //                                        <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
            //                                        <button id="quick-view_${element.pkID}" onclick="quickViewHandler(event ,this.id)" class="quick-view  "><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
            //                                    </div>
            //                                </div>
            //                                <div  class="add-to-cart">
            //                                    <button id="addToCartoff_${element.pkID}" class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
            //                                </div>
            //                            </div>

            //</div>




            //        `)

            //        if (flag % 3 === 0) {
            //            $(".stor-pro").append(`

            //            <div class="clearfix visible-lg visible-md"></div>
            //            `
            //            )
            //        }
            //    })

            //------------------------------------------------------------------------------------------------------------------------------;;;
            //    let paginationContainer = document.querySelector('#pagination')

            //    let currentPage = 1
            //    let rowsCount = 9

            //    





            //        setupPagination(result.products, rowsCount)

            //        //------------------------------------------------------------------------------------------------------------------------------;;;

            //    }


            addProductClickHandeler();


        })


        .fail(function () {

            console.log("request ===> file")
        })

        .always(function () {
        });



}




$(document).ready(function () {


    //var token = $('input[name="__RequestVerificationToken"]').val()

    $.post("/Home/getcategorys")

        .done(function (result) {


            //console.log(result);


            $("#top_nav").empty()
            $("#input-select").empty()
            $("#input-select").append('<option value="0">All Categories</option>');
            $(".section-tab-nav").empty();

            result.forEach(element => {


                $("#input-select").append(
                    `
                        <option value="${element.pkID}">${element.value}</option>
                    `

                )

                $("#top_nav").append(
                    `
                         <li><a id="nav_menu_${element.pkID}" href="/home/store/pro_${element.pkID}">${element.value}</a></li>
                    `
                )
                $(".section-tab-nav").append(
                    `
                        <li><a id="nav_menu_${element.pkID}" href="#">${element.value}</a></li>
                    `
                )
            });
            $(".section-tab-nav").append('<li><a href="#">All Categories</a></li>');

            $("#top_nav").append(`<li class="active"><a href="/home/store/pro_0">Home</a></li>`);


        })


        .fail(function () {

            console.log("request ===> file")
        })

        .always(function () {

        });




    let categoryID = document.location.pathname.split("/").slice(-1)[0].split("_").slice(-1)[0] // GET category id of page address

    categoryID = categoryID
    console.log(categoryID)



    getcategorypros(categoryID)












});


basketiconHandler()

function addProductClickHandeler() {

    const allproelm = document.querySelectorAll(".product");

    allproelm.forEach(element1 => {

        /*  console.log(element1.id)*/
        element1.addEventListener("click", function (e) {


            let pid = this.id.split("_")[1];

            ///home/products/product=3

            location.href = "/home/products/" + pid



        })


    })


}


































//-----------------------old codes-----------------------------------------------


function oldcods() {



    (function ($) {
        "use strict"

        // Mobile Nav toggle
        $('.menu-toggle > a').on('click', function (e) {
            e.preventDefault();
            $('#responsive-nav').toggleClass('active');
        })

        // Fix cart dropdown from closing
        $('.cart-dropdown').on('click', function (e) {
            e.stopPropagation();
        });

        /////////////////////////////////////////

        // Products Slick
        $('.products-slick').each(function () {
            var $this = $(this),
                $nav = $this.attr('data-nav');

            $this.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                infinite: true,
                speed: 300,
                dots: false,
                arrows: true,
                appendArrows: $nav ? $nav : false,
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                ]
            });
        });

        // Products Widget Slick
        $('.products-widget-slick').each(function () {
            var $this = $(this),
                $nav = $this.attr('data-nav');

            $this.slick({
                infinite: true,
                autoplay: true,
                speed: 300,
                dots: false,
                arrows: true,
                appendArrows: $nav ? $nav : false,
            });
        });

        /////////////////////////////////////////

        // Product Main img Slick
        $('#product-main-img').slick({
            infinite: true,
            speed: 300,
            dots: false,
            arrows: true,
            fade: true,
            asNavFor: '#product-imgs',
        });

        // Product imgs Slick
        $('#product-imgs').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            centerPadding: 0,
            vertical: true,
            asNavFor: '#product-main-img',
            responsive: [{
                breakpoint: 991,
                settings: {
                    vertical: false,
                    arrows: false,
                    dots: true,
                }
            },
            ]
        });

        // Product img zoom
        var zoomMainProduct = document.getElementById('product-main-img');
        if (zoomMainProduct) {
            $('#product-main-img .product-preview').zoom();
        }

        /////////////////////////////////////////

        // Input number
        $('.input-number').each(function () {
            var $this = $(this),
                $input = $this.find('input[type="number"]'),
                up = $this.find('.qty-up'),
                down = $this.find('.qty-down');

            down.on('click', function () {
                var value = parseInt($input.val()) - 1;
                value = value < 1 ? 1 : value;
                $input.val(value);
                $input.change();
                updatePriceSlider($this, value)
            })

            up.on('click', function () {
                var value = parseInt($input.val()) + 1;
                $input.val(value);
                $input.change();
                updatePriceSlider($this, value)
            })
        });

        var priceInputMax = document.getElementById('price-max'),
            priceInputMin = document.getElementById('price-min');

        //priceInputMax.addEventListener('change', function () {
        //    updatePriceSlider($(this).parent(), this.value)
        //});
        ///////////////////////////////////////////////////////////////+++++++++++++++++++++++++++++
        //priceInputMin.addEventListener('change', function () {
        //    updatePriceSlider($(this).parent(), this.value)
        //});

        function updatePriceSlider(elem, value) {
            if (elem.hasClass('price-min')) {
                console.log('min')
                priceSlider.noUiSlider.set([value, null]);
            } else if (elem.hasClass('price-max')) {
                console.log('max')
                priceSlider.noUiSlider.set([null, value]);
            }
        }

        // Price Slider
        var priceSlider = document.getElementById('price-slider');
        if (priceSlider) {
            noUiSlider.create(priceSlider, {
                start: [1, 999],
                connect: true,
                step: 1,
                range: {
                    'min': 1,
                    'max': 999
                }
            });

            priceSlider.noUiSlider.on('update', function (values, handle) {
                var value = values[handle];
                handle ? priceInputMax.value = value : priceInputMin.value = value
            });
        }

    })(jQuery);
}


//  document REdy






