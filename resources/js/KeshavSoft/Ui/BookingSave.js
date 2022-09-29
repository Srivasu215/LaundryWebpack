class KSGlobalClientSideFuncsClass {
    static Booking = {
        JSFuncs: {
            Insert: async () => {
                let jVarLocalFormVertical = document.getElementById("FormVertical");

                jVarLocalFormVertical.classList.remove('was-validated');
                jVarLocalFormVertical.classList.add('novalidate');

                if (jVarLocalFormVertical.checkValidity()) {
                    let PromiseDataFromSave = await DalFuncsClass.Booking.InsertFunc({ inObjectToInsert: serializeObject(jVarLocalFormVertical) });

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

                let LocalDataFromJson = await DalFuncsClass.Booking.ShowTodayFunc();
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

            },
            Delete: async () => {
                let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

                let LocalDataFromJson = await DalFuncsClass.Booking.DeleteFunc();
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
        },
        ApiFuncs: {
            QrCode: async (inEvent) => {
                if ((inEvent === undefined) === false) {
                    let jVarLocalCurrentTarget = inEvent.currentTarget;
                    this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({ inHtmlControl: jVarLocalCurrentTarget });
                };

                let jVarLocalFromTemplate = await this.Booking.HtmlFuns.Hbs.QrCode();

                var template = Handlebars.compile(jVarLocalFromTemplate);
               
                let jVarLocalDataNeeded = await this.Booking.JSFuncs.Show();

                if (jVarLocalDataNeeded.KTF === false) {

                };

                let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

                document.getElementById("KCont1").innerHTML = jVarLocalHtml;
            },
            Delete: async (inEvent) => {
                if ((inEvent === undefined) === false) {
                    let jVarLocalCurrentTarget = inEvent.currentTarget;
                    this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({ inHtmlControl: jVarLocalCurrentTarget });
                };

                let jVarLocalFromTemplate = await this.Booking.HtmlFuns.Hbs.Delete();

                var template = Handlebars.compile(jVarLocalFromTemplate);
               
                let jVarLocalDataNeeded = await this.Booking.JSFuncs.Show();

                if (jVarLocalDataNeeded.KTF === false) {

                };

                let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

                document.getElementById("KCont1").innerHTML = jVarLocalHtml;
            },
            ShowAll: async (inEvent) => {
                if ((inEvent === undefined) === false) {
                    let jVarLocalCurrentTarget = inEvent.currentTarget;
                    this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({ inHtmlControl: jVarLocalCurrentTarget });
                };

                let jVarLocalFromTemplate = await this.Booking.HtmlFuns.Hbs.ShowAll();

                var template = Handlebars.compile(jVarLocalFromTemplate);
               
                let jVarLocalDataNeeded = await this.Booking.JSFuncs.Show();

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

                await this.Booking.HtmlFuns.Templates.Show();
                let jVarLocalDataNeeded = await this.Booking.JSFuncs.Show();
                let jVarLocalFromHbs = await this.Booking.HtmlFuns.Hbs.Row();

                if (jVarLocalDataNeeded.KTF === false) {

                };

                var template = Handlebars.compile(jVarLocalFromHbs);
                let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

                document.getElementById("KTableBody").innerHTML = jVarLocalHtml;
            },
            Insert: async (inEvent) => {
                if ((inEvent === undefined) === false) {
                    let jVarLocalCurrentTarget = inEvent.currentTarget;
                    this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({ inHtmlControl: jVarLocalCurrentTarget });
                };

                let jVarLocalFromHbs = await this.Booking.HtmlFuns.Templates.Insert();

                let jVarLocalKCont1 = document.getElementById("KCont1");
                jVarLocalKCont1.innerHTML = jVarLocalFromHbs;
            },
            Header: {
                ShowinDOM: async () => {
                    let jVarLocalFromHbs = await this.Booking.HtmlFuns.Templates.Header.PullFunc();

                    let jVarLocalKCont1 = document.getElementById("KHeader");
                    jVarLocalKCont1.innerHTML = jVarLocalFromHbs;
                },
            }
        },
        HtmlFuns: {
            Templates: {
                Header: {
                    PullFunc: async () => {
                        let jVarLocalFetchUrl = "Templates/Booking/Header.html";
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
                Delete: async () => {
                    let jVarLocalFetchUrl = "Hbs/Booking/Delete.html";
                    let response = await fetch(jVarLocalFetchUrl);
                    let data = await response.text();
                    return await data;
                }
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
