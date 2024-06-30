
$(document).ready(function () {



    $.post("/Home/getcategorys")

        .done(function (result) {


            //console.log(result);


            $("#top_nav").empty()
            $("#input-select").empty()
            $("#input-select").append('<option value="0">All Categories</option>');


            result.forEach(element => {


                $("#input-select").append(
                    `
                        <option value="${element.pkID}">${element.value}</option>
                    `

                )

                $("#top_nav").append(
                    `
                        <li><a id="nav_menu_${element.pkID}" href="#">${element.value}</a></li>
                    `


                )
            });

            $("#top_nav").append(`<li class="active"><a href="/home/store/pro_0">Home</a></li>`);



        })// get nav menu and shearch categorys-----------------------------------------------









    let productID = document.location.pathname.split("/").slice(-1) // GET product id of page address

    $("#reviowid").val(productID)

    // get selected product imgages & attributes & info\/\/\/\/\\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\\/\/\/\/\/

    $.post("/Home/getProductinfo", { id: productID })

        .done(function (result) {


            console.log(result);


            $(".product-name").html(result.productinfo.pName)
            $(".product-price").html(result.productinfo.price)


            $("#P_description").html(result.productinfo.description)

            //console.log(result.productimg[0].banerphoto)
            $("#pimg2").attr("src", `/assets/img/products_imgae/${result.productimg[0].banerphoto}`)
            $("#pimg2-2").attr("src", `/assets/img/products_imgae/${result.productimg[0].banerphoto}`)







            result.productattr.forEach(element => {
                $("#p_attr").append(

                    `<p>${element.value}   :    ${element.attribute_name}  <p>`

                )
            })



        })


        .fail(function () {

            console.log("request ===> file")
        })

        .always(function () {

        });







    let Unam = (element1) => {
        if (element1.userName != null) {
            return element1.userName
        } else {
            return element1.Name
        }
        console.log(element1)


    }


    getreviews()




















    function getreviews() {

        let productID = document.location.pathname.split("/").slice(-1)
        //console.log("reveiwwwwwwwwwwwwwww")


        $.post("/Home/getreviews", { id: productID })

            .done(function (result) {
                $("#Reviewsnum").text(result.length)


                let userListContainer = document.querySelector('#reviewsul')
                let paginationContainer = document.querySelector('#pagination')

                let currentPage = 1
                let rowsCount = 3

                function displayUesrsList(allUesrsArray, usersContainer, rowsCount, currentPage) {
                    usersContainer.innerHTML = ''

                    let endIndex = rowsCount * currentPage
                    let startIndex = endIndex - rowsCount

                    let paginatedUsers = allUesrsArray.slice(startIndex, endIndex)

                    paginatedUsers.forEach(function (user) {


                        let testnum = "a" + Math.floor(Math.random() * 10000);
                        $("#reviewsul").append(
                            `
                <li>
                                        <div class="review-heading">
                                            <h5 class="name">${Unam(user)}</h5 >
                                            <p class="date">-------------</p>
                                            <div class="review-rating" id="${testnum}" >
                                            </div>
                                        </div>
                                        <div class="review-body">
                                            <p> ${user.Messages} </p>
                                        </div>
                                    </li>
                `
                        )
                        for (let i = 0; i < user.Score; i++) {

                            $(`#${testnum}`).append('<i class="fa fa-star"></i>')
                        }

                        for (let i = 1; i <= 5 - user.Score; i++) {

                            $(`#${testnum}`).append('<i class="fa fa-star-o empty"></i>')
                        }


                    })

                }

                function setupPagination(allUesrsArray, rowsCount) {
                    // Codes

                    $(".reviews-pagination").empty();

                    let pageCount = Math.ceil(allUesrsArray.length / rowsCount)

                    for (let i = 1; i < pageCount + 1; i++) {
                        let btn = paginationButtonGenerator(i, allUesrsArray)
                        $(".reviews-pagination").append(btn)
                    }

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
                        displayUesrsList(allUesrsArray, userListContainer, rowsCount, currentPage)

                        let prevPage = document.querySelector('li.rev.active')
                        console.log(prevPage)
                        prevPage.classList.remove('active')

                        button.classList.add('active')


                    })

                    return button
                }

                displayUesrsList(result, userListContainer, rowsCount, currentPage)
                setupPagination(result, rowsCount)

            })



            .fail(function () {

                console.log("request ===> file")
            })

            .always(function () {

            });


    }






    $("#subreviow").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let proid = productID;

        let reviowname = $("#reviowname").val();

        let reviowemail = $("#reviowemail").val();

        let reviowtext = $("#reviowtext").val();

        let star = $('input[name="rating"]:checked').val();


        if (proid && reviowname && reviowemail && reviowtext && star) {

            $.post("/Home/subreviow", { proid, reviowname, reviowemail, reviowtext, star })

                .done(function (result) {


                    console.log(result);


                })


                .fail(function () {

                    console.log("request ===> file")
                })

                .always(function () {

                });


        }




    })







});// redy doc











































//-----------------------old codes-----------------------------------------------

$(document).ready(function () {

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
        //	updatePriceSlider($(this).parent(), this.value)
        //});

        //priceInputMin.addEventListener('change', function () {
        //	updatePriceSlider($(this).parent(), this.value)
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



});//  document REdy
