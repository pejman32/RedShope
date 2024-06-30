
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






















function quickViewHandler(event, id) {
    event.stopPropagation()



    $("#myModal").modal("show");
    let productID = id.split("_")[1] // GET product id 


    // get selected product imgages & attributes & info\/\/\/\/\\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\\/\/\/\/\/

    $.post("/Home/getProductinfo", { id: productID })

        .done(function (result) {



            console.log(result);


            $("#modal-body").empty();
            $("#modal-title").html(result.productinfo.pName)
            //$(".product-price").html(result.productinfo.price)


            //$("#P_description").html(result.productinfo.description)

            //console.log(result.productimg[0].banerphoto)
            //$("#pimg2").attr("src", `/assets/img/products_imgae/${result.productimg[0].banerphoto}`)
            //$("#pimg2-2").attr("src", `/assets/img/products_imgae/${result.productimg[0].banerphoto}`)







            result.productattr.forEach(element => {
                $("#modal-body").append(

                    `<p>${element.value}   :    ${element.attribute_name}  <p>`

                )
            })



        })


        .fail(function () {

            console.log("request ===> file")
        })

        .always(function () {

        });
}









function basketiconHandler() {
    let sumprice = 0;
    let basket = localStorage.getItem("thisbasket")

    if (basket) {
        let basketitems = basket.split(",");

        $("#cartLength").html(basketitems.length)

        $(".cart-list").empty();
        basketitems.forEach(element => {

            allproduct.pros.forEach(element1 => {

                let propic;
                allproduct.imgs.forEach(images => {
                    if (images.FKproduct_ID == element1.pkID)
                        propic = images.banerphoto
                })

                if (element1.pkID == element) {
                    sumprice += element1.price;

                    $(".cart-list").append(

                        `
                                        <div class="product-widget">
                                            <div class="product-img">
                                                <img src="/././assets/img/products_imgae/${propic}" alt="img">
                                            </div>
                                            <div class="product-body">
                                                <h3 class="product-name"><a href="#">${element1.pName}</a></h3>
                                                <h4 class="product-price"><span class="qty">x1</span>تومان${element1.price}</h4>
                                            </div>
                                            <button class="delete" onclick="basketDelBtn(${element1.pkID})"><i class="fa fa-close"></i></button>
                                        </div>
                    `
                    )

                }

            })

            $("#somprice").text("مجموع سبد = " + sumprice)
            $("#basketlen").text("  تعداد محصولات انتخابی = " + basketitems.length)
        })







    } else {
        $(".cart-list").empty();


        $("#somprice").text("مجموع سبد = " + 0)
        $("#basketlen").text("  تعداد محصولات انتخابی = " + 0)
        $("#cartLength").html("0")
    }


}


function basketDelBtn(id) {
    let basket = localStorage.getItem("thisbasket").split(",")
    let removeditem = basket.indexOf(id + "")

    basket.splice(removeditem, 1)




    localStorage.setItem("thisbasket", basket)

    basketiconHandler();
}






//---------------search box auto finde product full name------
function shearchBoxFier() {

    let allproductName = []
    allpros.forEach(element => {

        allproductName.push(element.pName)

    })





    let autoCompleteWrapper = document.querySelector('.search-input')
    let searchInpueElem = document.querySelector('#searchInput')
    let autoCompleteBox = document.querySelector('.autocom-box')

    searchInpueElem.addEventListener('keyup', function () {
        let searchValue = searchInpueElem.value

        if (searchValue) {
            autoCompleteWrapper.classList.add('active')

            let filteredWords = allproductName.filter(function (word) {
                // return word.toLowerCase().startsWith(searchValue.toLowerCase())
                return word.toLowerCase().includes(searchValue.toLowerCase())
            })

            suggestionWordsGenerator(filteredWords)

        } else {
            autoCompleteWrapper.classList.remove('active')
        }
    })

    function suggestionWordsGenerator(wordsArray) {
        let listItemsArray = wordsArray.map(function (word) {
            return '<li>' + word + '</li>'
        })

        let customListItem
        if (!listItemsArray.length) {
            customListItem = '<li>' + searchInpueElem.value + '</li>'
        } else {
            customListItem = listItemsArray.join('')
        }

        autoCompleteBox.innerHTML = customListItem
        select()
    }

    function select() {
        let allListItems = autoCompleteBox.querySelectorAll('li')
        allListItems.forEach(function (wordItem) {
            wordItem.addEventListener('click', function (event) {
                searchInpueElem.value = event.target.textContent
                autoCompleteWrapper.classList.remove('active')
            })
        })

    }


}

function searchVal() {
    let searchInpueElem = document.querySelector('#searchInput').value;

    let search = searchInpueElem.replaceAll(/ /g, "_")



    location.href = `/Home/search/${search}`

}
//---------------search box auto finde product full name-------




function addtocartbtnH() {
    $(".add-to-cart-btn").on("click", function (e) {
        event.stopPropagation()
        let id = e.target.id
        id = id.split("_")[1];
        let isbasket = localStorage.thisbasket

        if (!isbasket) {
            localStorage.setItem("thisbasket", id)
        } else {
            let oldbasket = localStorage.getItem("thisbasket")
            let newbasket = oldbasket + "," + id;
            localStorage.setItem("thisbasket", newbasket)
        }

        basketiconHandler()

    })



}

















// age user log in bashe sing in ro hide mikone--------------------

function getCookieValue(cookieName) {
    var cookies = document.cookie.split(";"); // تبدیل رشته کوکی ها به آرایه
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); // حذف فاصله های اضافی از ابتدا و انتهای کوکی
        if (cookie.startsWith(cookieName + "=")) { // بررسی کوکی مورد نظر
            return cookie.split("=")[1]; // جدا کردن مقدار کوکی و بازگشت آن
        }
    }
    return null; // در صورت عدم وجود کوکی، بازگشت مقدار null
}


function checkCookie() {
    let username = getCookieValue("resun");
    if (username) {
        document.getElementById("singinbtn").style.display = "none"

    }
}
checkCookie();

    // age user log in bashe sing in ro hide mikone--------------------



















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


window.addEventListener("load", function () {


    // اسکریپت دوم را اینجا قرار دهید


});