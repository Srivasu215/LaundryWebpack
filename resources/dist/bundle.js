(()=>{"use strict";class e{static ApiFuncs={Header:{BuildMenu:async()=>{let e=await this.HtmlFuns.Templates.Header.BuildMenu();document.getElementById("KHeader").innerHTML=e;let t=document.getElementById("BookingId");console.log("jVarLocalBookingId : ",t),t.addEventListener("click",(async()=>{await this.ApiFuncs.Header.MenuItemClick.Booking()}))},MenuItemClick:{Booking:async()=>{console.log("KSGlobalBookingClass : ",a),a.ApiFuncs.Header.ShowinDOM(),a.ApiFuncs.Insert()}}}};static HtmlFuns={Templates:{Header:{BuildMenu:async()=>{let e=await fetch("Templates/Header.html"),t=await e.text();return await t}},Show:async()=>{let e=await fetch("Templates/Booking/Show.html"),t=await e.text();document.getElementById("KCont1").innerHTML=t},Insert:async()=>{let e=await fetch("Templates/Booking/Insert.html"),t=await e.text();return await t}},Hbs:{Row:async()=>{let e=await fetch("Hbs/Booking/Row.html"),t=await e.text();return await t},QrCode:async()=>{let e=await fetch("Hbs/Booking/QrCode.html"),t=await e.text();return await t},ShowAll:async()=>{let e=await fetch("Hbs/Booking/ShowAll.html"),t=await e.text();return await t},ShowDataForDelete:async()=>{let e=await fetch("Hbs/Booking/Delete.html"),t=await e.text();return await t}}}}class t{static InsertFunc=async({inObjectToInsert:e={}})=>{let t={KTF:!1,KResult:""};try{let a="Bookings.json",n=await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${a}`),s=JSON.parse(n),i=await Neutralino.filesystem.readFile(`./KData/JSON/2017/${a}`),o=JSON.parse(i),l=Object.keys(o),r=1;if(l.length>0){let e=this.CommonFuns.toNumbers(l);r=Math.max(...e)+1}let c=_.pick(e,Object.keys(s));c.DateTime=this.CommonFuns.LocalGetDate(),o[r]=c,(await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${a}`,JSON.stringify(o))).success&&(t.KResult=`${r} saved successfully...`,t.KTF=!0)}catch(e){console.log("error InsertFunc : ",e)}return await t};static ShowTodayFunc=async()=>{let e={KTF:!1,KResult:"",JsonData:{}};try{let t="./KData/JSON/2017/Bookings.json",a=await Neutralino.filesystem.readFile(t),n=JSON.parse(a),s=Object.keys(n).map((e=>({key:e,value:n[e]}))),i=_.filter(s,(e=>{if("DateTime"in e.value)return e.value.DateTime.substring(0,10)===this.CommonFuns.GetDateOnly()}));e.JsonData=i,e.KTF=!0}catch(t){e.KError=t}return await e};static ShowDataForDelete=async()=>{let e={KTF:!1,KResult:"",JsonData:{}};try{let t="./KData/JSON/2017/Bookings.json",a=await Neutralino.filesystem.readFile(t),n=JSON.parse(a),s=Object.keys(n).map((e=>({key:e,value:n[e]}))),i=_.filter(s,(e=>{if("DateTime"in e.value)return e.value.DateTime.substring(0,10)===this.CommonFuns.GetDateOnly()}));e.JsonData=i,e.KTF=!0}catch(t){e.KError=t}return await e};static PickFunc=async({inRowPK:e})=>{let t={KTF:!1,KResult:""},a=await Neutralino.filesystem.readFile("./KData/JSON/2017/Bookings.json"),n=JSON.parse(a);return e in n&&(t.KTF=!0,t.KResult=n[e]),await t};static CommonFuns={toNumbers:e=>e.map(Number),LocalGetDate:()=>{let e=new Date;return`${(e.getDate()<10?"0":"")+e.getDate()}-${(e.getMonth()+1<10?"0":"")+(e.getMonth()+1)}-${e.getFullYear()}-${e.getHours()}-${e.getMinutes()}-${e.getSeconds()}`},GetDateOnly:()=>{let e=new Date;return`${(e.getDate()<10?"0":"")+e.getDate()}-${(e.getMonth()+1<10?"0":"")+(e.getMonth()+1)}-${e.getFullYear()}`}}}class a{static JSFuncs={Show:async()=>{let e={KTF:!1,KResult:"",JsonData:{}},a=await t.ShowTodayFunc(),n=1;return Object.entries(a.JsonData).forEach((([t,a])=>{e.JsonData[t]=a,e.JsonData[t].SNo=n,n+=1})),e.KTF=!0,await e},ShowDataForDelete:async()=>{let e={KTF:!1,KResult:"",JsonData:{}},t=await DalFuncsClass.Booking.ShowDataForDelete(),a=1;return Object.entries(t.JsonData).forEach((([t,n])=>{e.JsonData[t]=n,e.JsonData[t].SNo=a,a+=1})),e.KTF=!0,await e}};static ApiFuncs={SaveFunc:async()=>{let e=document.getElementById("FormVertical");if(e.classList.remove("was-validated"),e.classList.add("novalidate"),e.checkValidity()){let a=await t.InsertFunc({inObjectToInsert:this.CommonFuncs.serializeObject(e)});if(a.KTF){let e=document.getElementById("AlertSuccessId"),t=document.getElementById("AlertSuccessMessageId");e.style.display="",t.innerHTML=`<strong>Hurray!</strong> ${a.KResult}`,setTimeout((function(){e.style.display="none"}),7e3)}else{let e=document.getElementById("AlertWarningId"),t=document.getElementById("AlertWarningMessageId");e.style.display="",t.innerHTML=`<strong>Sorry!</strong> ${a.KReason}`,setTimeout((function(){e.style.display="none"}),7e3)}}else document.forms[1].classList.add("was-validated")},Insert:async e=>{if(void 0===e==0){let t=e.currentTarget;this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({inHtmlControl:t})}let t=await this.HtmlFuns.Templates.Insert();document.getElementById("KCont1").innerHTML=t,document.getElementById("BookingSaveButtonId").addEventListener("click",(async()=>{await this.ApiFuncs.SaveFunc()}))},QrCode:{ShowAll:async e=>{if(void 0===e==0){let t=e.currentTarget;this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({inHtmlControl:t})}let t=await this.HtmlFuns.Hbs.QrCode();var a=Handlebars.compile(t);let n=await this.JSFuncs.Show();n.KTF;let s=a(n.JsonData);document.getElementById("KCont1").innerHTML=s,this.ApiFuncs.QrCode.CommonFuncs.AddListeners()},ToModal:async({inRowPK:e})=>{let a=await t.PickFunc({inRowPK:e});if(console.log("jVarLocalDataNeeded : ",a),a.KTF){let t=document.getElementById("ModalCustomerName"),n=document.getElementById("ModalPK"),s=document.getElementById("ModalGarments"),i=document.getElementById("ModalWeight"),o=document.getElementById("ModalMobile");t.innerHTML=a.KResult.CustomerName,n.innerHTML=e,s.innerHTML=a.KResult.Garments,i.innerHTML=`${a.KResult.Weight} Kg.`,o.innerHTML=a.KResult.Mobile;let l=`${e}/${a.KResult.CustomerName}/${a.KResult.Mobile}/${a.KResult.Garments}/${a.KResult.Weight}`;this.CommonFuncs.QrCode.GenerateQrCodeOnCanvas({inQrData:l});let r="ModalForQrCode";new bootstrap.Modal(document.getElementById(r),{keyboard:!0,focus:!0}).show()}},CommonFuncs:{AddListeners:()=>{let e=document.getElementsByClassName("QrCodeButtonClass");for(var t=0;t<e.length;t++)e[t].addEventListener("click",(async e=>{let t=e.currentTarget.closest("tr").dataset.qrcode;this.ApiFuncs.QrCode.ToModal({inRowPK:t})}))}}},ShowDataForDelete:async e=>{if(void 0===e==0){let t=e.currentTarget;this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({inHtmlControl:t})}let t=await this.Booking.HtmlFuns.Hbs.ShowDataForDelete();var a=Handlebars.compile(t);let n=await this.Booking.JSFuncs.Show();n.KTF;let s=a(n.JsonData);document.getElementById("KCont1").innerHTML=s},ShowAll:async e=>{if(void 0===e==0){let t=e.currentTarget;this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({inHtmlControl:t})}let t=await this.HtmlFuns.Hbs.ShowAll();var a=Handlebars.compile(t);let n=await this.JSFuncs.Show();n.KTF;let s=a(n.JsonData);document.getElementById("KCont1").innerHTML=s},Show:async e=>{if(void 0===e==0){let t=e.currentTarget;this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({inHtmlControl:t})}await this.Booking.HtmlFuns.Templates.Show();let t=await this.Booking.JSFuncs.Show(),a=await this.Booking.HtmlFuns.Hbs.Row();t.KTF;let n=Handlebars.compile(a)(t.JsonData);document.getElementById("KTableBody").innerHTML=n},Header:{ShowinDOM:async()=>{let t=await this.HtmlFuns.Templates.Header.PullFunc();document.getElementById("KHeader").innerHTML=t;let a=document.getElementById("HomeId"),n=document.getElementById("BookingHeaderTodayId"),s=document.getElementById("BookingHeaderShowAllId"),i=document.getElementById("BookingHeaderInsertId"),o=document.getElementById("BookingHeaderQrCodeId");a.addEventListener("click",(async()=>{await e.ApiFuncs.Header.BuildMenu(),document.getElementById("KCont1").innerHTML=""})),n.addEventListener("click",(async()=>{await this.ApiFuncs.Show()})),s.addEventListener("click",(async()=>{await this.ApiFuncs.ShowAll()})),i.addEventListener("click",(async()=>{await this.ApiFuncs.Insert()})),o.addEventListener("click",(async()=>{await this.ApiFuncs.QrCode.ShowAll()}))},MenuItemClick:{HomeClick:async()=>{let e=await this.HtmlFuns.Templates.Header.MenuItemClick.HomeClick();document.getElementById("KHeader").innerHTML=e,document.getElementById("KCont1").innerHTML=""}}}};static HtmlFuns={Templates:{Header:{MenuItemClick:{HomeClick:async()=>{let e=await fetch("Templates/Header.html"),t=await e.text();return await t}},PullFunc:async()=>{let e=await fetch("Templates/Booking/Header.html"),t=await e.text();return await t}},Show:async()=>{let e=await fetch("Templates/Booking/Show.html"),t=await e.text();document.getElementById("KCont1").innerHTML=t},Insert:async()=>{let e=await fetch("Templates/Booking/Insert.html"),t=await e.text();return await t}},Hbs:{Row:async()=>{let e=await fetch("Hbs/Booking/Row.html"),t=await e.text();return await t},QrCode:async()=>{let e=await fetch("Hbs/Booking/QrCode.html"),t=await e.text();return await t},ShowAll:async()=>{let e=await fetch("Hbs/Booking/ShowAll.html"),t=await e.text();return await t},ShowDataForDelete:async()=>{let e=await fetch("Hbs/Booking/Delete.html"),t=await e.text();return await t}}};static CommonFuncs={serializeObject:e=>{const t=new FormData(e),a={};for(const[e,n]of t)a[e]=n;return a},QrCode:{GenerateQrCodeOnCanvas:({inQrData:e=""})=>{var t=document.getElementById("canvas");t.height=1,t.width=1,t.style.visibility="hidden";let a={};a.text=e,a.bcid="qrcode",a.scaleX=1,a.scaleY=1,a.rotate="N";try{new Date,bwipjs.toCanvas(t,a),new Date,t.style.visibility="visible"}catch(e){return void console.log("error : ",e)}}},Ui:{Html:{DOM:{Header:{ChangeClass:({inHtmlControl:e})=>{let t=e.closest("ul").querySelectorAll("a"),a="text-info",n="text-white";t.forEach((e=>{e.classList.contains(a)&&(e.classList.remove(a),e.classList.add(n))})),e.classList.remove(n),e.classList.add(a)}}}}}}}(async()=>{await a.ApiFuncs.Header.ShowinDOM(),await a.ApiFuncs.Insert()})().then((e=>{}))})();