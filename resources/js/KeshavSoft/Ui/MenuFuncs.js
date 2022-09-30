class KSGlobalMenuClass {
    static ApiFuncs = {
        Header: {
            BuildMenu: async () => {
                let jVarLocalFromHbs = await this.HtmlFuns.Templates.Header.BuildMenu();

                let jVarLocalKHeader = document.getElementById("KHeader");
                jVarLocalKHeader.innerHTML = jVarLocalFromHbs;
                let jVarLocalKCont1 = document.getElementById("KCont1");
                jVarLocalKCont1.innerHTML = "";
            },
            MenuItemClick:
            {
                Booking: async () => {
                    KSGlobalClientSideFuncsClass.Booking.ApiFuncs.Header.ShowinDOM();
                    KSGlobalClientSideFuncsClass.Booking.ApiFuncs.Insert();
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