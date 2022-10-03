import { KSGlobalMenuClass } from "./MenuFuncs";
import { DalCompletedClass } from "../../../Dal/Completed/JsonFuncs";
import { KSGlobalScanClass } from "./ScanFuncs";

class KSGlobalBillingClass {
    
    static JSFuncs = {
        Insert: async () => {
            let jVarLocalFormVertical = document.getElementById("FormVertical");

            jVarLocalFormVertical.classList.remove('was-validated');
            jVarLocalFormVertical.classList.add('novalidate');

            if (jVarLocalFormVertical.checkValidity()) {
                let PromiseDataFromSave = await DalCompletedClass.Booking.InsertFunc({ inObjectToInsert: serializeObject(jVarLocalFormVertical) });

                if (PromiseDataFromSave.KTF) {
                    let jVarLocalAlertSuccessId = document.getElementById("AlertSuccessId");
                    let jVarLocalAlertSuccessMessageId = document.getElementById("AlertSuccessMessageId");
                    jVarLocalAlertSuccessId.style.display = "";
                    jVarLocalAlertSuccessMessageId.innerHTML = `<strong>Hurray!</strong> ${PromiseDataFromSave.KResult}`

                    setTimeout(function () {
                        jVarLocalAlertSuccessId.style.display = "none"

                    }, 7000);
                } else {
                    let jVarLocalAlertDangerId = document.getElementById("AlertWarningId");
                    let jVarLocalAlertDangerMessageId = document.getElementById("AlertWarningMessageId");
                    jVarLocalAlertDangerId.style.display = "";
                    jVarLocalAlertDangerMessageId.innerHTML = `<strong>Sorry!</strong> ${PromiseDataFromSave.KReason}`

                    setTimeout(function () {
                        jVarLocalAlertDangerId.style.display = "none"

                    }, 7000);
                };
            } else {
                document.forms[1].classList.add('was-validated');
            };
        },
        Show: async () => {
            let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

            let LocalDataFromJson = await DalCompletedClass.ShowWithBookingDataFunc();
            let LocalSNo = 1;

            LocalReturnObject.KReason = LocalDataFromJson.KReason;

            Object.entries(LocalDataFromJson.JsonData).forEach(
                ([key, value]) => {
                    LocalReturnObject.JsonData[key] = value;
                    LocalReturnObject.JsonData[key].SNo = LocalSNo;
                    LocalSNo += 1;
                }
            );

            LocalReturnObject.KTF = true;

            return await LocalReturnObject;
        },
        Update: async () => {
            let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

            let LocalDataFromJson = await DalWashingClass.UpdateFunc();
            let LocalSNo = 1;

            Object.entries(LocalDataFromJson.JsonData).forEach(
                ([key, value]) => {
                    LocalReturnObject.JsonData[key] = value;
                    LocalReturnObject.JsonData[key].SNo = LocalSNo;
                    LocalSNo += 1;
                }
            );

            LocalReturnObject.KTF = true;

            return await LocalReturnObject;

        }
    };

    static ApiFuncs = {
        Update: async (inEvent) => {
            if ((inEvent === undefined) === false) {
                let jVarLocalCurrentTarget = inEvent.currentTarget;
                this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({ inHtmlControl: jVarLocalCurrentTarget });
            };

            let jVarLocalFromTemplate = await this.HtmlFuns.Hbs.Update();

            var template = Handlebars.compile(jVarLocalFromTemplate);

            let jVarLocalDataNeeded = await this.JSFuncs.Update();

            if (jVarLocalDataNeeded.KTF === false) {

            };

            let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

            document.getElementById("KCont1").innerHTML = jVarLocalHtml;
        },
        Show: async (inEvent) => {
            if ((inEvent === undefined) === false) {
                let jVarLocalCurrentTarget = inEvent.currentTarget;
                this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({ inHtmlControl: jVarLocalCurrentTarget });
            };

            let jVarLocalFromTemplate = await this.HtmlFuns.Hbs.Show();

            var template = Handlebars.compile(jVarLocalFromTemplate);

            let jVarLocalDataNeeded = await this.JSFuncs.Show();

            if (jVarLocalDataNeeded.KTF === false) {
            
            };

            if ("KReason" in jVarLocalDataNeeded) {
                console.log("KError : ", jVarLocalDataNeeded.KReason);
            };

            let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

            document.getElementById("KCont1").innerHTML = jVarLocalHtml;
        },
        Header: {
            ShowinDOM: async () => {
                let jVarLocalFromHbs = await this.HtmlFuns.Templates.Header.PullFunc();
                let jVarLocalKCont1 = document.getElementById("KHeader");
                jVarLocalKCont1.innerHTML = jVarLocalFromHbs;
                this.ApiFuncs.Header.CommonFuncs.AddListeners();
            },
            CommonFuncs: {
                AddListeners: () => {
                    let jVarLocalHomeId = document.getElementById("HomeId");

                    jVarLocalHomeId.addEventListener("click", async () => {
                        await KSGlobalMenuClass.ApiFuncs.Header.BuildMenu();

                        let jVarLocalKCont1 = document.getElementById("KCont1");
                        jVarLocalKCont1.innerHTML = "";
                    });

                    let jVarLocalBillingHeaderId = document.getElementById("BillingHeaderId");

                    jVarLocalBillingHeaderId.addEventListener("click", this.ApiFuncs.Show);

                    
                    let jVarLocalBillingScanHeaderId = document.getElementById("BillingScanHeaderId");

                    jVarLocalBillingScanHeaderId.addEventListener("click", this.ApiFuncs.Header.CommonFuncs.ClickFuncs.BillingScanHeaderId);
                },
                ClickFuncs: {
                    BillingHeaderId: async () => {
                        let jVarInsideTemplate = await this.HtmlFuns.Templates.Show();
                        console.log("jVarInsideTemplate------- : ", jVarInsideTemplate);
                        let jVarLocalKCont1 = document.getElementById("KCont1");
                        jVarLocalKCont1.innerHTML = jVarInsideTemplate;

                        KSGlobalScanClass.ApiFuncs.AddListeners();
                    },
                    BillingScanHeaderId: async () => {
                        let jVarInsideTemplate = await this.HtmlFuns.Templates.Scan();
                        console.log("jVarInsideTemplate : ", jVarInsideTemplate);
                        let jVarLocalKCont1 = document.getElementById("KCont1");
                        jVarLocalKCont1.innerHTML = jVarInsideTemplate;

                        KSGlobalScanClass.ApiFuncs.AddListeners();
                    }
                }
            }
        }
    };

    static HtmlFuns = {
        Templates: {
            Header: {
                PullFunc: async () => {
                    let jVarLocalFetchUrl = "Templates/Billing/Header.html";
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
            },
            Scan: async () => {
                let jVarLocalFetchUrl = "Templates/Billing/Scan.html";
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
            Show: async () => {
                let jVarLocalFetchUrl = "Hbs/Completed/Completed.html";
                let response = await fetch(jVarLocalFetchUrl);
                let data = await response.text();
                return await data;
            },
            Update: async () => {
                let jVarLocalFetchUrl = "Hbs/Washing/ToComplete.html";
                let response = await fetch(jVarLocalFetchUrl);
                let data = await response.text();
                return await data;
            }
        }
    };

    static CommonFuncs = {
        Ui: {
            Html: {
                DOM: {
                    Header: {
                        ChangeClass: ({ inHtmlControl }) => {
                            let jVarLocalClosestUl = inHtmlControl.closest("ul");
                            let jVarLocalQueryATags = jVarLocalClosestUl.querySelectorAll("a");
                            let jVarLocalClassName = "text-info";
                            let jVarLocalWhiteClassName = "text-white";

                            jVarLocalQueryATags.forEach((LoopElement) => {
                                if (LoopElement.classList.contains(jVarLocalClassName)) {
                                    LoopElement.classList.remove(jVarLocalClassName);
                                    LoopElement.classList.add(jVarLocalWhiteClassName);
                                };
                            });

                            inHtmlControl.classList.remove(jVarLocalWhiteClassName);
                            inHtmlControl.classList.add(jVarLocalClassName);
                        }
                    }
                }
            }
        }
    }
};

export { KSGlobalBillingClass };
