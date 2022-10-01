class KSGlobalScanClass {
    static JSFuncs = {
        Scan: async () => {
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
    };

    static ApiFuncs = {
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
                    let jVarLocalCompletedHeaderId = document.getElementById("CompletedHeaderId");
                    
                    jVarLocalCompletedHeaderId.addEventListener("click", async () => {
                        await KSGlobalMenuClass.ApiFuncs.Header.BuildMenu();

                        let jVarLocalKCont1 = document.getElementById("KCont1");
                        jVarLocalKCont1.innerHTML = "";
                    });

                }
            }
        }
    };

    static HtmlFuns = {
        Templates: {
            Header: {
                PullFunc: async () => {
                    let jVarLocalFetchUrl = "Templates/Completed/Header.html";
                    let response = await fetch(jVarLocalFetchUrl);
                    let data = await response.text();
                    return await data;
                }
            }
        },
        Hbs: {

            Scan: async () => {
                let jVarLocalFetchUrl = "Hbss/Completed/Scan.html";
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
export { KSGlobalScanClass };
