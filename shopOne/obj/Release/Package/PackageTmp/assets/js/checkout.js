let allproduct;
let allpros;
let allproimgs;
let allproinfo;
getallpros()





function checkValue(id, text, min, max, titel) {


    let thisval = document.getElementById(id).value;
    if (thisval.length > max || thisval.length < min) {
        $(`#${titel}`).text(text);
        return false;
    } else {
        $(`#${titel}`).text("");
        return true;
    };


};

function chekphonenum() {
    let thisval = document.getElementById("cpn").value;
    if (thisval.length != 11 || isNaN(thisval)) {
        $("#pnt").text("مقدار شماره تماس اشتباه است");
        return false;
    } else {
        $("#pnt").text("");
        return true;
    }
}



$(document).ready(function () {

    $("#cfname").on("blur", function () {
        checkValue('cfname', "مقدار نام باید بین 3 تا 20 حرف باشد", 3, 20, 'fnt')

    });

    $("#clname").on("blur", function () {
        checkValue('clname', "مقدار نام خانوادگی باید بین 3 تا 30 حرف باشد", 3, 30, 'lnt')

    });


    $("#cpn").on("blur", function () {

        chekphonenum()
    });



    $("#cst").on("blur", function () {
        checkValue('cst', "مقدار استان باید بین 2 تا 18 حرف باشد", 2, 20, "stt")
    });

    $("#cct").on("blur", function () {
        checkValue('cct', "مقدار شهر باید بین 2 تا 18 حرف باشد", 2, 20, "ctt")

    });


    $("#cad").on("blur", function () {
        checkValue('cad', "مقدار آدرس باید طولانی تر باشد", 7, 200, "adt")

    });


    $("#pass").on("blur", function () {
        checkValue('pass', "مقدار پسورد باید طولانی تر باشد", 5, 49, "pst")


    });
    $("#uname").on("blur", function () {
        checkValue('uname', "مقدار پسورد باید طولانی تر باشد", 5, 49, "unt")


    });


});


function getallpros() {



    $.post("/Home/getallpros")

        .done(function (result) {
            allproduct = result;
            allpros = result.pros;
            allproimgs = result.imgs;
            allproinfo = result.info;






            shearchBoxFier()
            basketiconHandler()
            chekUotInvoice()


        })


        .fail(function () {

            console.log("request ===> file")
        })

        .always(function () {

        });
}




// ------------------------ heder basket ---------------------------

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

    chekUotInvoice()
}


// ------------------------ heder basket ---------------------------











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



// ==========================> check out scripts <==================================




$(document).ready(function () {

    function checkCookie() {
        let username = getCookieValue("resun");
        if (username) {
            document.getElementById("singinbtn").style.display = "none"

            $.post("/Home/getuser", { username: username })

                .done(function (result) {


                    if (result.status) {
                        console.log(result)
                        $("#create-account").prop("disabled", true) // disable create account checkBox

                        $("#cfname").val(result.user[0].fName) // ferst name
                        $("#cfname").prop("disabled", true)

                        $("#clname").val(result.user[0].lName) // last name
                        $("#clname").prop("disabled", true)

                        $("#cpn").val(result.user[0].phoneNumber) // phoneNumber
                        $("#cpn").prop("disabled", true)

                        $("#cst").val(result.user[0].state) // state
                        $("#cst").prop("disabled", true)

                        $("#cct").val(result.user[0].city) // city
                        $("#cct").prop("disabled", true)

                        $("#cad").val(result.user[0].address) // address
                        $("#cad").prop("disabled", true)


                        $("#cfname").val(result.user[0].fName)
                        $("#cfname").prop("disabled", true)





                    } else {
                        // user not find ..........
                        // log out & refresh & ........
                    }

                })


                .fail(function () {

                    console.log("request ===> file")
                })

                .always(function () {

                });




        } else {

            $("#shiping-address").prop("disabled", true)
            console.log ("not login")
        }

    }
    checkCookie()
    //-------------------------------------------------------------------------
























});



function chekUotInvoice() {

    let somPrisce = 0;

    let mybasket = localStorage.getItem("thisbasket")

    if (mybasket) {
        let basketitems = mybasket.split(",");

        $("#cartLength").html(basketitems.length)

        $(".order-products").empty();
        basketitems.forEach(element => {

            allproduct.pros.forEach(element1 => {



                if (element1.pkID == element) {
                    somPrisce += element1.price;

                    $(".order-products").append(

                        `
                                    <div class="order-col">
                                         <div>${element1.pName}</div>
                                         <div>تومان${element1.price}</div>
                                      </div>


                    `
                    )

                }

            })

            $(".order-total").text(somPrisce)
            //$("#basketlen").text("  تعداد محصولات انتخابی = " + basketitems.length)
        })







    } else {
        $(".cart-list").empty();


        $(".order-total").text("0")
        //$("#basketlen").text("  تعداد محصولات انتخابی = " + 0)
        //$("#cartLength").html("0")
    }


}










// =============> pay  order btb handler <===================
function loginedpeyment() {
    let fbasket = localStorage.getItem("thisbasket");

    $.post("/Home/checkouthandeler", { fbasket, status: 1, fn: "-1", ln: "-1", pn: "-1", st: "-1", ct: "-1", ad: "-1", pc: "-1" })

        .done(function (result) {
            console.log(result)

            if (result.status) {
                let fn = result.fn + ""

                let price = result.price + "";

                console.log(typeof (fn), typeof (price))
                peyment(fn, price)
            }
        })


        .fail(function () {

            console.log("request ===> file")
        })

        .always(function () {

        });

}

function peyment(fn, price) {
    let token = $('input[name="__RequestVerificationToken"]').val();
    $.post("/Pay/submit", { fn: fn, price: price, __RequestVerificationToken: token })

        .done(function (result) {
            console.log(result)
            if (result.success) {

                location.href = result.message;
            //    let fn = result.fn + ""

            //    let price = result.price + "";
            ////    peyment(fn,price)
            }
        })


        .fail(function () {

            console.log("request ===> file")
        })

        .always(function () {

        });



}

$(".order-submit").on("click", peybtnHandler)

function peybtnHandler() {



    console.log("peybtnHandler clickkkkkkk")







    let fbasket = localStorage.getItem("thisbasket");
    // if  user just login 
    if (getCookieValue("resun") && !($("#shiping-address").prop("checked"))) {
        console.log("if  user just login == 1")

        loginedpeyment()


    }
    else if (getCookieValue("resun") && $("#shiping-address").prop("checked")) {

        // if logined ond want shiping other address

        let ofn = $("#otherfn").val();
        let oln = $("#otherln").val();
        let opn = $("#otherpn").val();
        let ost = $("#otherst").val();
        let oct = $("#otherct").val();
        let oad = $("#otherad").val();
        let opc = $("#otherpc").val();


        console.log("if logined ond want shiping other address  == 2")



        $.post("/Home/logined diffrent address Pey", { fbasket, status: 2, fn: ofn, ln: oln, pn: opn, st: ost, ct: oct, ad: oad, pc: opc })

            .done(function (result) {

                if (result.status) {
                    let fn = result.fn + ""

                    let price = result.price + "";

                    console.log(typeof (fn), typeof (price))
                    peyment(fn, price)

                }
            })


            .fail(function () {

                console.log("request ===> file")
            })

            .always(function () {

            });



    } else if (!(getCookieValue("resun")) && !($("#create-account").prop("checked"))) {
        // if usre not login & does not want signup

        if (
            checkValue('pass', "مقدار پسورد باید طولانی تر باشد", 5, 49, "pst"),
            checkValue('cad', "مقدار آدرس باید طولانی تر باشد", 7, 200, "adt"),
            checkValue('cct', "مقدار شهر باید بین 2 تا 18 حرف باشد", 2, 20, "ctt"),
            checkValue('cst', "مقدار استان باید بین 2 تا 18 حرف باشد", 2, 20, "stt"),
            checkValue('uname', "مقدار نام کاربری باید بین 6 تا 18 حرف باشد", 2, 20, "unt"),
            //chekphonenum(),
            checkValue('clname', "مقدار نام خانوادگی باید بین 3 تا 30 حرف باشد", 3, 30, 'lnt'),
            checkValue('cfname', "مقدار نام باید بین 3 تا 20 حرف باشد", 3, 20, 'fnt')
        ) {

            let fn = $("#cfname").val();
            let ln = $("#clname").val();
            let pn = $("#cpn").val();
            let st = $("#cst").val();
            let ct = $("#cct").val();
            let ad = $("#cad").val();
            let pc = $("#cpc").val();

            console.log("if usre not login & does not want signup== 3")

            $.post("/Home/checkouthandeler", { fbasket, status: 3, fn, ln, pn, st, ct, ad, pc })



                .done(function (result) {


                    console.log(result)

                    if (result.status) {
                        let fn = result.fn + ""

                        let price = result.price + "";

                        console.log(typeof (fn), typeof (price))
                        peyment(fn, price)
                    }

                })


                .fail(function () {

                    console.log("request ===> file")
                })

                .always(function () {

                });


        }
    } else if (!(getCookieValue("resun")) && $("#create-account").prop("checked")) {
        // if not login and want signup 



        console.log("if not login and want signup ")
        // frst sign up 
        // auto login 
        //pey with accuont 






        //event.preventDefault()


        if ($("#create-account").prop("checked"),

            checkValue('pass', "مقدار پسورد باید طولانی تر باشد", 5, 49, "pst"),
            checkValue('cad', "مقدار آدرس باید طولانی تر باشد", 7, 200, "adt"),
            checkValue('cct', "مقدار شهر باید بین 2 تا 18 حرف باشد", 2, 20, "ctt"),
            checkValue('cst', "مقدار استان باید بین 2 تا 18 حرف باشد", 2, 20, "stt"),
            checkValue('uname', "مقدار نام کاربری باید بین 6 تا 18 حرف باشد", 2, 20, "unt"),
            //chekphonenum(),
            checkValue('clname', "مقدار نام خانوادگی باید بین 3 تا 30 حرف باشد", 3, 30, 'lnt'),
            checkValue('cfname', "مقدار نام باید بین 3 تا 20 حرف باشد", 3, 20, 'fnt')) {

            let fname = document.getElementById("cfname").value;
            let lname = document.getElementById("clname").value;
            let phone = document.getElementById("cpn").value;
            let email = document.getElementById("email").value;
            let state = document.getElementById("cst").value;
            let city = document.getElementById("cct").value;
            let address = document.getElementById("cad").value;
            let pass = document.getElementById("pass").value;
            let uname = document.getElementById("uname").value;
            //let uname = document.getElementById("cpc").value;



            $.post("/Home/signUpHandler", { fname, lname, phone, email, state, city, address, pass, uname })

                .done(function (result) {

                    console.log(result)

                    switch (result) {
                        case 1:
                            // code block
                            swal({
                                title: "خطا!",
                                text: "شماره وارد شده ثبت نام شده !",
                                icon: "error",
                                button: "باشه!",
                            });

                            break;
                        case 4:
                            // code block

                            swal({
                                title: "تایید!",
                                text: "با موفقیت sign شدید !",
                                icon: "success",
                                button: "باشه!",
                            }).then((value) => {
                                loginedpeyment()
                            });


                            break;
                        case 2:
                            // code block

                            swal({
                                title: "خطا!",
                                text: "uname وارد شده اشتباه است !",
                                icon: "error",
                                button: "باشه!",
                            });
                            break;
                        case 3:
                            // code block
                            swal({
                                title: "خطا!",
                                text: "email وارد شده اشتباه است !",
                                icon: "error",
                                button: "باشه!",
                            });
                            break;
                        default:
                        // code block
                    }


                })


                .fail(function () {

                    console.log("request ===> file")
                })

                .always(function () {

                });







        };





















    }


}









// =============> pay  order btb handler <===================




