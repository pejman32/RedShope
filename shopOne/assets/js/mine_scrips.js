
    let allproduct;



    //--------------------------------------------------my codes ----------------------------
    let allpros;
    let allproimgs;
    let allproinfo;
    getallpros()
    function getallpros() {



        $.post("/Home/getallpros")

            .done(function (result) {
                allproduct = result;
                allpros = result.pros;
                allproimgs = result.imgs;
                allproinfo = result.info;






                shearchBoxFier()
                basketiconHandler()


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

                $(".section-tab-nav").empty();

                result.forEach(element => {




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

                $("#top_nav").append(`<li class=""><a href="/home/store/pro_0">all products</a></li>`);
                $("#top_nav").append(`<li class="active"><a href="/home">Home</a></li>`);



            })


            .fail(function () {

                console.log("request ===> file")
            })

            .always(function () {

            });











        $.post("/Home/getofferProducts")

            .done(function (result) {


                $(".offerpro").empty()



                for (let i = 0; i < 10; i++) {
                    let ID = result.products[i].pkID
                    let Bphoto;

                    result.productsPhotos.forEach(element => {
                        console.log(element)
                        if (element.FKproductID == ID && element.MainPic) {
                            Bphoto = element.PicSrc
                            //console.log(Bphoto)
                        }
                    });

                    let oldprice = result.products[i].price - ((result.products[i].price / 100) * result.products[i].discount)


                    $(".offerpro").append(


                        `
                                              <div id="product_${result.products[i].pkID}" class="product">
                                        <div class="product-img"style="width: 263px;height: 263px;">
                                            <img src="${Bphoto}"/>
                                            <div class="product-label product-label_${result.products[i].pkID}">
                                                
                                            </div>
                                        </div>
                                        <div class="product-body">
                                            <p class="product-category">Category</p>
                                            <h3 class="product-name"><a href="#">${result.products[i].pName}</a></h3>
                                            <h4 class="product-price">${result.products[i].price} <del class="product-old-price">${oldprice}</del></h4>
                                            <div class="product-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                            <div class="product-btns">
                                                <button id="wishlist_${result.products[i].pkID}" onclick="wishlistHandler(event ,this.id) class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                                                <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                                                <button id="quick-view_${result.products[i].pkID}" onclick="quickViewHandler(event ,this.id)" class="quick-view  "><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                                            </div>
                                        </div>
                                        <div  class="add-to-cart">
                                            <button id="addToCartoff_${result.products[i].pkID}" class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                                        </div>
                                    </div>

                `
                    )

                    let label = ""

                    if (result.products[i].discount > 1) {
                        //$(`.product-label_${result.products[i].pkID}`).append(
                        label += `<span class="sale">-%${result.products[i].discount}</span>`
                        //)
                    }


                    var date = new Date(parseInt(result.products[i].createTime.substr(6)));
                    var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                    var targetDate = new Date(formattedDate);
                    var currentDate = new Date();
                    if ((currentDate - targetDate) < (32 * 24 * 60 * 60 * 1000)) {

                        //$(`.product-label_${result.products[i].pkID}`).append(
                        label += `<span class="new">جدید</span>`
                        //)
                    }
                    $(`.product-label_${result.products[i].pkID}`).append(label)

                };

            })


            .fail(function () {

                console.log("request ===> file")
            })

            .always(function () {
                getnewproducts()

            });





        function getnewproducts() {

            $.post("/Home/getnewProducts")

                .done(function (result) {


                    $("#pt1").empty()

                    $("#pt1").append('<div id="tab2" class="tab-pane fade in active"></div>');
                    $("#tab2").append('<div id="testdiv" class="products-slick"> </div>');


                    for (let i = 0; i < 10; i++) {
                        let ID = result.products[i].pkID
                        let Bphoto;

                        result.productsPhotos.forEach(element => {

                            if (element.FKproductID == ID && element.MainPic) {
                                Bphoto = element.PicSrc
                                //console.log(Bphoto)
                            }
                        });

                        //console.log(result.products[i].pkID)


                        $("#testdiv").append(


                            `
                                        <div id="product_${result.products[i].pkID}" class="product">
                                        <div class="product-img" style="width: 263px;height: 263px;">
                                            <img src="${Bphoto}"/>
                                            <div class="product-label productnew-label_${result.products[i].pkID}">
                                                
                                            </div>
                                        </div>
                                        <div class="product-body">
                                            <p class="product-category">Category</p>
                                            <h3 class="product-name"><a href="#">${result.products[i].pName}</a></h3>
                                            <h4 class="product-price">${result.products[i].price} <del class="product-old-price">$990.00</del></h4>
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
                                                <button id="quick-view_${result.products[i].pkID}" onclick="quickViewHandler(event ,this.id)" class="quick-view  "><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                                            </div>
                                        </div>
                                        <div class="add-to-cart">
                                            <button id="addToCartnew_${result.products[i].pkID}" class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                                        </div>
                                    </div>

                `
                        )





                        if (result.products[i].discount > 1) {
                            $(`.productnew-label_${result.products[i].pkID}`).append(
                                `<span class="sale">-%${result.products[i].discount}</span>`
                            )
                        }


                        var date = new Date(parseInt(result.products[i].createTime.substr(6)));
                        var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                        var targetDate = new Date(formattedDate);
                        var currentDate = new Date();


                        if ((currentDate - targetDate) < (32 * 24 * 60 * 60 * 1000)) {

                            $(`.productnew-label_${result.products[i].pkID}`).append(
                                ` <span class="new">جدید</span>`
                            )
                        }
                    };

                   

                })


                .fail(function () {

                    console.log("request ===> file")
                })

                .always(function () {
                    addtocartbtnH()

                    addProductClickHandeler()
                 oldcods() // akhar akharin kod bayad bezaram-------------------------------------------------
                });


        }
    });


    function wishlistHandler(event, id) {

        event.stopPropagation()

        let productID = id.split("_")[1] // GET product id 


        $.post("/Home/addwish", { id: productID })

            .done(function (result) {



                console.log(result);










            })


            .fail(function () {

                console.log("request ===> file")
            })

            .always(function () {

            });

    }










































