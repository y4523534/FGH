using SampleSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SampleSite.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Save(string target)
        {

            //ここに社員選択情報一覧を追加する

            EmployeeInfo empInfo = new EmployeeInfo();


            empInfo.EmployeeCd = "testUserCd";
            empInfo.EmployeeNm = "testUserNm";

            if (empInfo != null)
            {
                ViewBag.EmployeeCd = empInfo.EmployeeCd;
                ViewBag.EmployeeNm = empInfo.EmployeeNm;
            }
            else
            {
                return HttpNotFound();
            }

            ViewBag.target = target;

            return PartialView("Save", empInfo);

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(EmployeeInfo empInfo)
        {

            string message = "";
            bool status = false;

            if (ModelState.IsValid)
            {

                status = true;
                message = "Successfully Saved.";

            }
            else
            {

                message = "Error! Please try again.";

            }

            return new JsonResult { Data = new { status = status, message = message } };

        }

        public JsonResult GetContacts()
        {

            List<EmployeeInfo> empInfos = new List<EmployeeInfo>();
            EmployeeInfo empInfo = new EmployeeInfo();

            //元本ではここでDBの内容を再読み込み行っている

            empInfo.EmployeeCd = "111";
            empInfo.EmployeeNm = "bbb";
            empInfos.Add(empInfo);

            return new JsonResult { Data = empInfos, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


    }
}