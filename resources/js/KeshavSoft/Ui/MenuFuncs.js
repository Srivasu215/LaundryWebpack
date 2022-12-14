import { KSGlobalBookingClass } from "./BookingFuncs";
import { KSGlobalWashingCompletedClass } from "./CompletedFuncs";
import { KSGlobalBillingClass } from "./BillingFuncs";

class KSGlobalMenuClass {
    static ApiFuncs = {
        Header: {
            BuildMenu: async () => {

                let jVarLocalFromHbs = await this.HtmlFuns.Templates.Header.BuildMenu();

                let jVarLocalKHeader = document.getElementById("KHeader");
                jVarLocalKHeader.innerHTML = jVarLocalFromHbs;

                this.ApiFuncs.Header.CommonFuncs.AddListener();
            },
            CommonFuncs: {
                AddListener: () => {
                    let jVarLocalBookingId = document.getElementById("BookingId");
                    let jVarLocalWashingCompletedId = document.getElementById("WashingCompletedId");
                    let jVarLocalBillingId = document.getElementById("BillingId");

                    jVarLocalBookingId.addEventListener("click", this.ApiFuncs.Header.MenuItemClick.Booking);

                    jVarLocalWashingCompletedId.addEventListener("click", this.ApiFuncs.Header.MenuItemClick.Completed);

                    jVarLocalBillingId.addEventListener("click", this.ApiFuncs.Header.MenuItemClick.Billing);

                }
            },
            MenuItemClick:
            {
                Booking: async () => {
                    KSGlobalBookingClass.ApiFuncs.Header.ShowinDOM();
                    KSGlobalBookingClass.ApiFuncs.Insert();
                },
                Completed: async () => {
                    KSGlobalWashingCompletedClass.ApiFuncs.Header.ShowinDOM();
                    KSGlobalWashingCompletedClass.ApiFuncs.Show();
                },
                Billing: async () => {
                    KSGlobalBillingClass.ApiFuncs.Header.ShowinDOM();
                    KSGlobalBillingClass.ApiFuncs.Show();
                }
            }
        }
    };

    static HtmlFuns = {
        Templates: {
            Header: {
                BuildMenu: async () => {
                    let jVarLocalFetchUrl = "Templates/Header.html";
                    let response = await fetch(jVarLocalFetchUrl);
                    let data = await response.text();
                    return await data;
                }
            },
            Show: async () => {
                let jVarLocalFetchUrl = "Templates/Booking/Show.html";
                let response = await fetch(jVarLocalFetchUrl);
                let data = await response.text();
                let jVarLocalKCont1 = document.getElementById("KCont1");
                jVarLocalKCont1.innerHTML = data;
            },
            Insert: async () => {
                let jVarLocalFetchUrl = "Templates/Booking/Insert.html";
                let response = await fetch(jVarLocalFetchUrl);
                let data = await response.text();
                return await data;
            }
        },
        Hbs: {
            Row: async () => {
                let response = await fetch("Hbs/Booking/Row.html");
                let data = await response.text();

                return await data;

            },
            QrCode: async () => {
                let jVarLocalFetchUrl = "Hbs/Booking/QrCode.html";
                let response = await fetch(jVarLocalFetchUrl);
                let data = await response.text();
                return await data;
            },
            ShowAll: async () => {
                let jVarLocalFetchUrl = "Hbs/Booking/ShowAll.html";
                let response = await fetch(jVarLocalFetchUrl);
                let data = await response.text();
                return await data;
            },
            ShowDataForDelete: async () => {
                let jVarLocalFetchUrl = "Hbs/Booking/Delete.html";
                let response = await fetch(jVarLocalFetchUrl);
                let data = await response.text();
                return await data;
            }
        }
    };
};


export { KSGlobalMenuClass }