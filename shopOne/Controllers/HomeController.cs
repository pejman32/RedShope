using System;
using System.Text;
using System.Web.Security;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using shopOne.Models;

namespace shopOne.Controllers
{
    public class HomeController : Controller
    {
        redshopDB context = new redshopDB();


        // GET: Home
        public ActionResult Index()
        {
            try

            {
                var contents = context.tbl_indexcontents.ToList();

                ViewBag.phonenumber = contents.Where(x => x.ContentsName == "phoneNumber").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.email = contents.Where(x => x.ContentsName == "email").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.location = contents.Where(x => x.ContentsName == "location").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.about = contents.Where(x => x.ContentsName == "about").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.yourCart = contents.Where(x => x.ContentsName == "yourCart").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.checkout = contents.Where(x => x.ContentsName == "checkout").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.viewcart = contents.Where(x => x.ContentsName == "viewcart").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.offersTitel = contents.Where(x => x.ContentsName == "offersTitel").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.newerpro = contents.Where(x => x.ContentsName == "newerpro").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.laptaps = contents.Where(x => x.ContentsName == "laptaps").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.mobiles = contents.Where(x => x.ContentsName == "mobiles").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.cameras = contents.Where(x => x.ContentsName == "cameras").Select(x => x.ContentsValue).SingleOrDefault();
                ViewBag.collectionsmaltitel = contents.Where(x => x.ContentsName == "collectionsmaltitel").Select(x => x.ContentsValue).SingleOrDefault();

            }
            catch (Exception e) { };




















            if (Request.Cookies["resun"] != null)
            {
                if (Request.Cookies["resun"].Value != null)
                {
                    ViewBag.uname = Request.Cookies["resun"].Value;
                }
                else
                {
                    ViewBag.uname = "ورود";

                }
            }
            else
            {
                ViewBag.uname = "ورود";

            }



            return View();
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult getnewProducts()
        {
            var products = context.tbl_products.Where(x => x.active == true).Select(x => new
            {

                x.createTime,
                x.description,
                x.pkID,
                x.pName,
                x.price,
                x.sku,
                x.discount

            }).OrderByDescending(x => x.createTime).ToList();


            var productsPhotos = context.tbl_pictures.Where(x => x.FKproductID != -1).Select(x => new { x.pkID, x.FKproductID, x.PicSrc, x.MainPic }).ToList();


            return Json(new { products, productsPhotos }, JsonRequestBehavior.AllowGet);
        }






        public ActionResult getofferProducts()
        {
            var products = context.tbl_products.Where(x => x.active == true).Select(x => new
            {

                x.createTime,
                x.description,
                x.pkID,
                x.pName,
                x.price,
                x.sku,
                x.discount

            }).OrderByDescending(x => x.discount).ToList();







            var productsPhotos = context.tbl_pictures.Where(x => x.FKproductID != -1).Select(x => new { x.pkID, x.FKproductID, x.PicSrc, x.MainPic }).ToList();


            return Json(new { products, productsPhotos }, JsonRequestBehavior.AllowGet);
        }




        public ActionResult getcategorys()
        {

            var Categorys = context.tbl_attribute_values.Where(x => x.FKattribute_ID == 6).Select(x => new { x.pkID, x.value }).OrderByDescending(x => x.pkID).ToList();


            return Json(Categorys, JsonRequestBehavior.AllowGet);

        }


        public ActionResult signUp()
        {
            return View();
        }








        [HttpPost]
        //[ValidateAntiForgeryToken] // ----------------------------------------------------------------------------------
        public ActionResult signUpHandler(
            string fname,
            string lname,
            string phone,
            string email,
            string pass,
            string state,
            string city,
            string address,
            string uname)
        {

            var getphone = context.tbl_users.Where(x => x.phoneNumber == phone).SingleOrDefault();
            var getuname = context.tbl_users.Where(x => x.userName == uname).SingleOrDefault();
            var getemail = context.tbl_users.Where(x => x.email == email).SingleOrDefault();



            if (getphone != null)
            {
                return Json(1, JsonRequestBehavior.AllowGet); // phone is Repetitious

            }
            else if (getuname != null)
            {
                return Json(2, JsonRequestBehavior.AllowGet); // user name is Repetitious

            }
            else if (getemail != null)
            {
                return Json(3, JsonRequestBehavior.AllowGet); // user email Repetitious

            }
            else
            {
                var cookieText = Encoding.UTF8.GetBytes(phone);
                var encryptedValue = Convert.ToBase64String(MachineKey.Protect(cookieText, "pejman32"));




                tbl_users newuser = new tbl_users();

                newuser.fName = fname;
                newuser.lName = lname;
                newuser.phoneNumber = phone;
                newuser.userName = uname;
                newuser.email = email;
                newuser.state = state;
                newuser.city = city;
                newuser.address = address;
                newuser.registeryDate = DateTime.Now;
                newuser.userHID = encryptedValue;
                newuser.userPass = pass;

                context.tbl_users.Add(newuser);
                context.SaveChanges();



                var user = context.tbl_users.Where(x => x.phoneNumber == phone && x.userName == uname && x.userHID == encryptedValue).Select(
                    x => new { x.userHID, x.userName }).SingleOrDefault();

                if (user != null)
                {


                    Response.Cookies["resu"].Value = user.userHID;
                    Response.Cookies["resun"].Value = user.userName;
                    Response.Cookies["resu"].Expires = DateTime.Now.AddDays(85);
                    Response.Cookies["resun"].Expires = DateTime.Now.AddDays(85);
                }



                return Json(4, JsonRequestBehavior.AllowGet); // user Was made :)


            }


        }








        public ActionResult products(string id)
        {
            return View();
        }


        public ActionResult getProductinfo(string id)
        {

            int pid = int.Parse(id);
            var product = context.tbl_products.Where(x => x.pkID == pid).Select(
                x => new { x.pName, x.price, x.sku, x.description, x.discount }).SingleOrDefault();


            var productimg = context.tbl_images.Where(x => x.FKproduct_ID == pid).Select(x => new { x.banerphoto, x.smallphoto, x.photo_1, x.photo_2, x.photo_3 });

            var productattr = context.View_product_attribute.Where(x => x.FKproduct_ID == pid).Select(x => new { x.attribute_name, x.value }).ToList();

            return Json(new { valid = true, productinfo = product, productimg = productimg, productattr = productattr }, JsonRequestBehavior.AllowGet);

        }





        public ActionResult store()
        {
            return View();
        }

        public ActionResult getstorepros(int id)
        {
            if (id != 0)
            {
                var products = context.View_product_attribute.Where(x => x.FKvalue_ID == id).ToList();
                var productsPhotos = context.tbl_images.Select(x => new { x.banerphoto, x.photo_1, x.photo_2, x.smallphoto, x.FKproduct_ID }).ToList();
                return Json(new { products, productsPhotos }, JsonRequestBehavior.AllowGet);

            }
            else
            {
                var products = context.tbl_products.Where(x => x.active != false).Select(x => new { x.pName, x.price, x.pkID }).ToList();
                var productsPhotos = context.tbl_images.Select(x => new { x.banerphoto, x.photo_1, x.photo_2, x.smallphoto, x.FKproduct_ID }).ToList();

                return Json(new { products, productsPhotos }, JsonRequestBehavior.AllowGet);


            }

        }






        public ActionResult search()
        {
            return View();
        }




        public ActionResult login()
        {
            return View();
        }



        public ActionResult checklogin(string phone, string pass)
        {

            int status = 0; // conection to DB failed


            var user = context.tbl_users.Where(x => x.phoneNumber == phone).SingleOrDefault();
            if (user != null)
            {

                if (user.userPass == pass)
                {
                    status = 2; // username & pass corent 

                    // set cookie 


                    string uName = "";
                    if (user.userName == null)
                    {
                        uName = user.phoneNumber;
                    }
                    else
                    {
                        uName = user.userName;
                    }

                    Response.Cookies["resu"].Value = user.userHID;
                    Response.Cookies["resun"].Value = uName;
                    Response.Cookies["resu"].Expires = DateTime.Now.AddDays(85);
                    Response.Cookies["resun"].Expires = DateTime.Now.AddDays(85);





                }
                else
                {
                    status = 3; // wrong pass
                }

            }
            else
            {
                status = 1; // phone number not finde
            }




            return Json(status, JsonRequestBehavior.AllowGet);

        }










        public ActionResult getallpros()
        {

            var pros = context.tbl_products.Where(x => x.active == true).Select(x => new
            {
                x.createTime,
                x.description,
                x.discount,
                x.pkID,
                x.pName,
                x.price,
                x.sku
            }).ToList();



            var imgs = context.tbl_pictures.Where(x => x.FKproductID != -1).Select(x => new{ x.pkID, x.FKproductID,x.PicSrc,x.MainPic}).ToList();

            var info = context.View_product_attribute.ToList();





            return Json(new { imgs, info, pros }, JsonRequestBehavior.AllowGet);


        }



        public ActionResult checkout()
        {

            if (Request.Cookies["resun"] != null)
            {
                if (Request.Cookies["resun"].Value != null)
                {
                    ViewBag.uname = Request.Cookies["resun"].Value;
                }
                else
                {
                    ViewBag.uname = "ورود";

                }
            }
            else
            {
                ViewBag.uname = "ورود";

            }


            return View();
        }



        public ActionResult getuser(string username)
        {
            var userinfo = context.tbl_users.Where(X => X.userName == username).Select(x => new
            {
                x.phoneNumber,
                x.state,
                x.city,
                x.address,
                x.fName,
                x.lName,
                // code posti 

            }).ToList();

            if (userinfo != null)
            {

                return Json(new { status = true, user = userinfo }, JsonRequestBehavior.AllowGet);

            }
            else
            {

                return Json(new { status = false, user = "null" }, JsonRequestBehavior.AllowGet);
            }


        }











        public ActionResult checkouthandeler(
            string fbasket,
            string fn,
            string ln,
            string pn,
            string st,
            string ct,
            string ad,
            string pc,
            int status)
        {


            long price = 0;

            long factornumber = context.tbl_invoice.Max(x => x.invoice_num);
            factornumber++;

            if (status == 1)
            {

                var bytes = Convert.FromBase64String(Request.Cookies["resu"].Value);
                var output = MachineKey.Unprotect(bytes, "pejman32");
                string result = Encoding.UTF8.GetString(output);

                string uname = Request.Cookies["resun"].Value;

                var user = context.tbl_users.Where(x => x.phoneNumber == result && x.userName == uname).Select(x => new
                {
                    x.pkID,
                    x.phoneNumber,
                    x.state,
                    x.city,
                    x.address,
                    x.fName,
                    x.lName

                }).SingleOrDefault();




                if (user != null)
                {

                    string[] basket2 = fbasket.Split(',');

                    int[] basket3 = Array.ConvertAll(basket2, s => int.Parse(s));


                    List<tbl_invoice> records = new List<tbl_invoice>();


                    foreach (int item in basket3)
                    {
                        var product = context.tbl_products.Where(x => x.pkID == item).Select(x => new { x.pkID, x.active, x.sku, x.price }).SingleOrDefault();


                        tbl_invoice ni = new tbl_invoice();
                        ni.invoice_num = factornumber;
                        ni.fkProduct_id = item;
                        ni.productPrice = product.price;
                        ni.fkUser_id = user.pkID;
                        ni.state = user.state;
                        ni.city = user.city;
                        ni.address = user.address;
                        ni.PostalCode = "123456789";
                        ni.orderFname = user.fName;
                        ni.orderLname = user.lName;
                        ni.orderPhoneNum = user.phoneNumber;
                        ni.transID = "0";
                        ni.transStatus = false;
                        ni.TrackingCode = "0";


                        records.Add(ni);

                    }

                    context.tbl_invoice.AddRange(records);
                    context.SaveChanges();

                    price = context.tbl_invoice.Where(x => x.invoice_num == factornumber).Sum(x => x.productPrice);






                    return Json(new { status = true, fn = factornumber, price = price }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                }// user not finde

            }
            else if (status == 2)
            {

                var bytes = Convert.FromBase64String(Request.Cookies["resu"].Value);
                var output = MachineKey.Unprotect(bytes, "pejman32");
                string result = Encoding.UTF8.GetString(output);

                string uname = Request.Cookies["resun"].Value;

                var user = context.tbl_users.Where(x => x.phoneNumber == result && x.userName == uname).Select(x => new
                {
                    x.pkID,
                    x.phoneNumber,
                    x.state,
                    x.city,
                    x.address,
                    x.fName,
                    x.lName

                }).SingleOrDefault();




                if (user != null)
                {

                    string[] basket2 = fbasket.Split(',');

                    int[] basket3 = Array.ConvertAll(basket2, s => int.Parse(s));


                    List<tbl_invoice> records = new List<tbl_invoice>();


                    foreach (int item in basket3)
                    {
                        var product = context.tbl_products.Where(x => x.pkID == item).Select(x => new { x.pkID, x.active, x.sku, x.price }).SingleOrDefault();


                        tbl_invoice ni = new tbl_invoice();
                        ni.invoice_num = factornumber;
                        ni.fkProduct_id = item;
                        ni.productPrice = product.price;
                        ni.fkUser_id = user.pkID;
                        ni.state = st;
                        ni.city = ct;
                        ni.address = ad;
                        ni.PostalCode = pc;
                        ni.orderFname = fn;
                        ni.orderLname = ln;
                        ni.orderPhoneNum = pn;
                        ni.transID = "0";
                        ni.transStatus = false;
                        ni.TrackingCode = "0";


                        records.Add(ni);

                    }

                    context.tbl_invoice.AddRange(records);
                    context.SaveChanges();

                    price = context.tbl_invoice.Where(x => x.invoice_num == factornumber).Sum(x => x.productPrice);






                    return Json(new { status = true, fn = factornumber, price = price }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                }// user not finde

            }
            else if (status == 3)
            {



                string[] basket2 = fbasket.Split(',');

                int[] basket3 = Array.ConvertAll(basket2, s => int.Parse(s));


                List<tbl_invoice> records = new List<tbl_invoice>();


                foreach (int item in basket3)
                {
                    var product = context.tbl_products.Where(x => x.pkID == item).Select(x => new { x.pkID, x.active, x.sku, x.price }).SingleOrDefault();


                    tbl_invoice ni = new tbl_invoice();
                    ni.invoice_num = factornumber;
                    ni.fkProduct_id = item;
                    ni.productPrice = product.price;
                    ni.fkUser_id = null;
                    ni.state = st;
                    ni.city = ct;
                    ni.address = ad;
                    ni.PostalCode = pc;
                    ni.orderFname = fn;
                    ni.orderLname = ln;
                    ni.orderPhoneNum = pn;
                    ni.transID = "0";
                    ni.transStatus = false;
                    ni.TrackingCode = "0";


                    records.Add(ni);

                }

                context.tbl_invoice.AddRange(records);
                context.SaveChanges();

                price = context.tbl_invoice.Where(x => x.invoice_num == factornumber).Sum(x => x.productPrice);


                //Response.Redirect("https://www.google.com/");

                //return null;


                return Json(new { status = true, fn = factornumber, price = price }, JsonRequestBehavior.AllowGet);


                //price = context.tbl_invoice.Where(x => x.invoice_num == factornumber).Sum(x => x.productPrice);

            }
            else
            {
            }
            return Json(new { status = false }, JsonRequestBehavior.AllowGet);

        }






        public ActionResult getreviews(int id)
        {


            var comments = context.View_comments.Where(x => x.fkproductID == id && x.status == true).OrderByDescending(x => x.time).ToList();


            return Json(comments, JsonRequestBehavior.AllowGet);

        }




        public ActionResult subreviow(int proid, string reviowname, string reviowemail, string reviowtext, int star)
        {

            var user = Request.Cookies["resu"];

            if (user == null)
            {

                tbl_comments ncom = new tbl_comments();

                ncom.Score = star;
                ncom.fkproductID = proid;
                ncom.Name = reviowname;
                ncom.email = reviowemail;
                ncom.Messages = reviowtext;
                ncom.time = DateTime.Now;



                context.tbl_comments.Add(ncom);
                context.SaveChanges();
                return Json("1", JsonRequestBehavior.AllowGet);
            }
            else
            {

                var userr = context.tbl_users.Where(x => x.userHID == user.Value).Select(x => new { x.pkID, x.userName, x.email }).Single();


                tbl_comments ncom = new tbl_comments();

                ncom.Score = star;
                ncom.fkproductID = proid;
                ncom.Name = userr.userName;
                ncom.email = userr.email;
                ncom.Messages = reviowtext;
                ncom.fkUserID = userr.pkID;
                ncom.time = DateTime.Now;


                context.tbl_comments.Add(ncom);
                context.SaveChanges();


                return Json("2", JsonRequestBehavior.AllowGet);

            }


        }






















    }//Home contoroler end
}