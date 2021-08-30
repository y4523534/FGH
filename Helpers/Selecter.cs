using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SampleSite.Helpers
{

    public class Selecter
    {

        public static IHtmlString EmployeeSelecter(string linktext,string action,string controller,string target)
        {

            //<a class='popup' href='/Home/Save/?target=id'>{0}</a>
            return MvcHtmlString.Create(
                String.Format("<a class='popup' href='/{2}/{1}/?target={3}'>{0}</a>",
                    HttpUtility.HtmlAttributeEncode(linktext),
                    HttpUtility.HtmlAttributeEncode(action),
                    HttpUtility.HtmlAttributeEncode(controller),
                    HttpUtility.HtmlAttributeEncode(target)
                    ));
        }

    }
}