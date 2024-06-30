let submitbtn = document.getElementById("submitbtn");







submitbtn.addEventListener("click", function (event) {

    event.preventDefault()
    event.stopPropagation()
    console.log("click")

    let PhoneNumberinput = document.getElementById("PhoneNumberinput").value;
    let passinput = document.getElementById("passinput").value;

    //console.log(passinput, PhoneNumberinput)
    //console.log(typeof(passinput), typeof (PhoneNumberinput))


    $.post("/Home/checklogin", { phone: PhoneNumberinput, pass: passinput })

        .done(function (result) {

            console.log(result)

            switch (result) {
                case 1:
                    // code block
                    swal({
                        title: "خطا!",
                        text: "شماره وارد شده ثبت نام نشده اگ حساب کاربری ندارید وارد قسمت ثبت نام شوید !",
                        icon: "error",
                        button: "باشه!",
                    });

                    break;
                case 2:
                    // code block

                    swal({
                        title: "تایید!",
                        text: "با موفقیت وارد شدید !",
                        icon: "success",
                        button: "باشه!",
                    }).then((value) => {
                location.href= "/home/index";
                    });

                    break;
                case 3:
                    // code block

                    swal({
                        title: "خطا!",
                        text: "پسورد وارد شده اشتباه است !",
                        icon: "error",
                        button: "باشه!",
                    });
                    break;
                case 0:
                    // code block
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
});