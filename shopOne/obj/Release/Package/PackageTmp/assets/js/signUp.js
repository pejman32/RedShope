
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
    let thisval = document.getElementById("phone").value;
    if (thisval.length != 11 || isNaN(thisval)) {
        $("#pnt").text("مقدار شماره تماس اشتباه است");
        return false;
    } else {
        $("#pnt").text("");
        return true;
    }
}



function checkpass2() {
    let thisval = document.getElementById("pass2").value;
    let pass = document.getElementById("pass").value;

    if (thisval != pass) {

        $("#ps2t").text("پسورد ها یکسان نیستند");
        return false;
    } else {
        $("#ps2t").text("");
        return true;
    }
}



$(document).ready(function () {

    $("#fName").on("blur", function () {
        checkValue('fName', "مقدار نام باید بین 3 تا 20 حرف باشد", 3, 20, 'fnt')

    });

    $("#LName").on("blur", function () {
        checkValue('LName', "مقدار نام خانوادگی باید بین 3 تا 30 حرف باشد", 3, 30, 'lnt')

    });


    $("#phone").on("blur", function () {

        chekphonenum()
    });



    $("#state").on("blur", function () {
        checkValue('state', "مقدار استان باید بین 2 تا 18 حرف باشد", 2, 20, "stt")
    });

    $("#city").on("blur", function () {
        checkValue('city', "مقدار شهر باید بین 2 تا 18 حرف باشد", 2, 20, "ctt")

    });


    $("#address").on("blur", function () {
        checkValue('address', "مقدار آدرس باید طولانی تر باشد", 7, 200, "adt")

    });


    $("#pass").on("blur", function () {
        checkValue('pass', "مقدار پسورد باید طولانی تر باشد", 5, 49, "pst")


    });
    $("#uname").on("blur", function () {
        checkValue('pass', "مقدار پسورد باید طولانی تر باشد", 5, 49, "pst")


    });

    $("#pass2").on("blur", function () {
        checkpass2()

    });



    $("#ansercbox").change(function () {
        if ($("#ansercbox").prop("checked")) {

            $("#submit").prop("disabled", false);

        } else {
            $("#submit").prop("disabled", true);

        }

    });








    $("#submit").click(function (event) {

        event.preventDefault()


        if ($("#ansercbox").prop("checked"),
            checkpass2(),
            checkValue('pass', "مقدار پسورد باید طولانی تر باشد", 5, 49, "pst"),
            checkValue('address', "مقدار آدرس باید طولانی تر باشد", 7, 200, "adt"),
            checkValue('city', "مقدار شهر باید بین 2 تا 18 حرف باشد", 2, 20, "ctt"),
            checkValue('state', "مقدار استان باید بین 2 تا 18 حرف باشد", 2, 20, "stt"),
            checkValue('uname', "مقدار نام کاربری باید بین 6 تا 18 حرف باشد", 2, 20, "unt"),
            chekphonenum(),
            checkValue('LName', "مقدار نام خانوادگی باید بین 3 تا 30 حرف باشد", 3, 30, 'lnt'),
            checkValue('fName', "مقدار نام باید بین 3 تا 20 حرف باشد", 3, 20, 'fnt')) {

            let fname = document.getElementById("fName").value;
            let lname = document.getElementById("LName").value;
            let phone = document.getElementById("phone").value;
            let email = document.getElementById("email").value;
            let state = document.getElementById("state").value;
            let city = document.getElementById("city").value;
            let address = document.getElementById("address").value;
            let pass = document.getElementById("pass").value;
            let uname = document.getElementById("uname").value;



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
                                location.href = "/home/index";
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

    });


}); // document redy