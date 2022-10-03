import { KSGlobalMenuClass } from "./MenuFuncs";
import { DalBookingFuncsClass } from "../../../Dal/Bookings/JsonFuncs";

class KSGlobalBookingClass {
    static JSFuncs = {
        Show: async () => {
            let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

            let LocalDataFromJson = await DalBookingFuncsClass.ShowTodayFunc();
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
        ShowDataForDelete: async () => {
            let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

            let LocalDataFromJson = await DalFuncsClass.Booking.ShowDataForDelete();
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
        ShowinDOM: {
            Insert: async (inEvent) => {
                if ((inEvent === undefined) === false) {
                    let jVarLocalCurrentTarget = inEvent.currentTarget;
                    this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({ inHtmlControl: jVarLocalCurrentTarget });
                };

                let jVarLocalFromHbs = await this.HtmlFuns.Templates.Insert();

                let jVarLocalKCont1 = document.getElementById("KCont1");
                jVarLocalKCont1.innerHTML = jVarLocalFromHbs;

                await this.ApiFuncs.ShowinDOM.CommonFuncs.AddListeners();
            },
            CommonFuncs: {
                AddListeners: () => {
                    let jVarLocalBookingSaveButtonId = document.getElementById("BookingSaveButtonId");

                    jVarLocalBookingSaveButtonId.addEventListener("click", this.ApiFuncs.ShowinDOM.CommonFuncs.ListenerFuncs.SaveFunc);
                },
                ListenerFuncs: {
                    SaveFunc: async () => {
                        console.log("this is save func for bookings");
                    },
                    SaveFunc_oldgood: async () => {
                        let jVarLocalFormVertical = document.getElementById("FormVertical");

                        jVarLocalFormVertical.classList.remove('was-validated');
                        jVarLocalFormVertical.classList.add('novalidate');

                        if (jVarLocalFormVertical.checkValidity()) {
                            let PromiseDataFromSave = await DalBookingFuncsClass.InsertFunc({ inObjectToInsert: this.CommonFuncs.serializeObject(jVarLocalFormVertical) });

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
                    }
                }
            }
        },
        QrCode: {
            ShowAll: async (inEvent) => {
                if ((inEvent === undefined) === false) {
                    let jVarLocalCurrentTarget = inEvent.currentTarget;
                    this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({ inHtmlControl: jVarLocalCurrentTarget });
                };

                let jVarLocalFromTemplate = await this.HtmlFuns.Hbs.QrCode();

                var template = Handlebars.compile(jVarLocalFromTemplate);

                let jVarLocalDataNeeded = await this.JSFuncs.Show();
                console.log("jVarLocalDataNeeded : ", jVarLocalDataNeeded);
                if (jVarLocalDataNeeded.KTF === false) {

                };

                let jVarLocalHtml = template(jVarLocalDataNeeded.JsonData);

                document.getElementById("KCont1").innerHTML = jVarLocalHtml;
                this.ApiFuncs.QrCode.CommonFuncs.AddListeners();
            },
            ToModal: async ({ inRowPK }) => {
                let jVarLocalDataNeeded = await DalBookingFuncsClass.PickFunc({ inRowPK });

                if (jVarLocalDataNeeded.KTF) {
                    let jVarLocalModalBody = document.getElementById("ModalBody");

                    let jVarLocalFromTemplate = await this.HtmlFuns.Hbs.QrCodeModalPopUp();

                    var template = Handlebars.compile(jVarLocalFromTemplate);
                    jVarLocalDataNeeded.KResult.PK = inRowPK;
                    jVarLocalModalBody.innerHTML = template(jVarLocalDataNeeded.KResult);

                    // let jVarLocalModalCustomerName = document.getElementById("ModalCustomerName");
                    // let jVarLocalModalPK = document.getElementById("ModalPK");
                    // let jVarLocalModalGarments = document.getElementById("ModalGarments");
                    // let jVarLocalModalWeight = document.getElementById("ModalWeight");
                    // let jVarLocalModalMobile = document.getElementById("ModalMobile");

                    // jVarLocalModalCustomerName.innerHTML = jVarLocalDataNeeded.KResult.CustomerName;
                    // jVarLocalModalPK.innerHTML = inRowPK;
                    // jVarLocalModalGarments.innerHTML = jVarLocalDataNeeded.KResult.Garments;
                    // jVarLocalModalWeight.innerHTML = `${jVarLocalDataNeeded.KResult.Weight} Kg.`;
                    // jVarLocalModalMobile.innerHTML = jVarLocalDataNeeded.KResult.Mobile;

                    let jVarLocalQrData = `${inRowPK}/${jVarLocalDataNeeded.KResult.CustomerName}/${jVarLocalDataNeeded.KResult.Mobile}/${jVarLocalDataNeeded.KResult.Garments}/${jVarLocalDataNeeded.KResult.Weight}`;
                    // this.CommonFuncs.QrCode.GenerateQrCodeOnCanvas({ inQrData: jVarLocalQrData });

                    Object.entries(jVarLocalDataNeeded.KResult.QrCodes).forEach(
                        ([key, value]) => {
                            let jVarLocalHtmlQr = document.getElementById(`${inRowPK}-${key}`);
                            let jVarLocalQrData = `${inRowPK}-${key}/${jVarLocalDataNeeded.KResult.CustomerName}/${jVarLocalDataNeeded.KResult.Mobile}/${jVarLocalDataNeeded.KResult.Garments}/${jVarLocalDataNeeded.KResult.Weight}`;
                            this.CommonFuncs.QrCode.GenerateQrCodeOnModal({
                                inQrData: jVarLocalQrData,
                                inCanvasId: jVarLocalHtmlQr
                            });
                        }
                    );

                    let jVarLocalId = "ModalForQrCode";

                    var myModal = new bootstrap.Modal(document.getElementById(jVarLocalId), { keyboard: true, focus: true });

                    myModal.show();
                };

            },
            ToModal1Inch: async ({ inRowPK }) => {
                let jVarLocalDataNeeded = await DalBookingFuncsClass.PickFunc({ inRowPK });

                if (jVarLocalDataNeeded.KTF) {
                    let jVarLocalModalCustomerName = document.getElementById("ModalCustomerName");
                    let jVarLocalModalPK = document.getElementById("ModalPK");
                    let jVarLocalModalGarments = document.getElementById("ModalGarments");
                    let jVarLocalModalWeight = document.getElementById("ModalWeight");
                    let jVarLocalModalMobile = document.getElementById("ModalMobile");

                    jVarLocalModalCustomerName.innerHTML = jVarLocalDataNeeded.KResult.CustomerName;
                    jVarLocalModalPK.innerHTML = inRowPK;
                    jVarLocalModalGarments.innerHTML = jVarLocalDataNeeded.KResult.Garments;
                    jVarLocalModalWeight.innerHTML = `${jVarLocalDataNeeded.KResult.Weight} Kg.`;
                    jVarLocalModalMobile.innerHTML = jVarLocalDataNeeded.KResult.Mobile;

                    let jVarLocalQrData = `${inRowPK}/${jVarLocalDataNeeded.KResult.CustomerName}/${jVarLocalDataNeeded.KResult.Mobile}/${jVarLocalDataNeeded.KResult.Garments}/${jVarLocalDataNeeded.KResult.Weight}`;
                    this.CommonFuncs.QrCode.GenerateQrCodeOnCanvas({ inQrData: jVarLocalQrData });

                    let jVarLocalId = "ModalForQrCode";

                    var myModal = new bootstrap.Modal(document.getElementById(jVarLocalId), { keyboard: true, focus: true });

                    myModal.show();
                };

            },
            CommonFuncs: {
                AddListeners: () => {
                    let jVarLocalQrCodeButtonClass = document.getElementsByClassName("QrCodeButtonClass");

                    for (var i = 0; i < jVarLocalQrCodeButtonClass.length; i++) {
                        jVarLocalQrCodeButtonClass[i].addEventListener('click', async (inEvent) => {
                            let jVarInsideCurrentTarget = inEvent.currentTarget;
                            let jVarInsideClosestTr = jVarInsideCurrentTarget.closest("tr");
                            let jVarInsideQrCodeValue = jVarInsideClosestTr.dataset.qrcode;
                            this.ApiFuncs.QrCode.ToModal({ inRowPK: jVarInsideQrCodeValue });
                        });
                    };
                }
            }
        },
        ShowDataForDelete: async (inEvent) => {
            if ((inEvent === undefined) === false) {
                let jVarLocalCurrentTarget = inEvent.currentTarget;
                this.CommonFuncs.Ui.Html.DOM.Header.ChangeClass({ inHtmlControl: jVarLocalCurrentTarget });
            };

            let jVarLocalFromTemplate = await this.Booking.HtmlFuns.Hbs.ShowDataForDelete();

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

            let jVarLocalFromTemplate = await this.HtmlFuns.Hbs.ShowAll();

            var template = Handlebars.compile(jVarLocalFromTemplate);

            let jVarLocalDataNeeded = await this.JSFuncs.Show();

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
        Header: {
            ShowinDOM: async () => {
                let jVarLocalFromHbs = await this.HtmlFuns.Templates.Header.PullFunc();

                let jVarLocalKCont1 = document.getElementById("KHeader");
                jVarLocalKCont1.innerHTML = jVarLocalFromHbs;

                let jVarLocalHomeId = document.getElementById("HomeId");
                let jVarLocalBookingHeaderTodayId = document.getElementById("BookingHeaderTodayId");
                let jVarLocalBookingHeaderShowAllId = document.getElementById("BookingHeaderShowAllId");

                let jVarLocalBookingHeaderInsertId = document.getElementById("BookingHeaderInsertId");
                let jVarLocalBookingHeaderQrCodeId = document.getElementById("BookingHeaderQrCodeId");


                jVarLocalHomeId.addEventListener("click", async () => {
                    await KSGlobalMenuClass.ApiFuncs.Header.BuildMenu();

                    let jVarLocalKCont1 = document.getElementById("KCont1");
                    jVarLocalKCont1.innerHTML = "";
                });


                jVarLocalBookingHeaderTodayId.addEventListener("click", async () => {
                    await this.ApiFuncs.Show();
                });

                jVarLocalBookingHeaderShowAllId.addEventListener("click", async () => {
                    await this.ApiFuncs.ShowAll();
                });

                jVarLocalBookingHeaderInsertId.addEventListener("click", this.ApiFuncs.ShowinDOM.Insert());

                jVarLocalBookingHeaderQrCodeId.addEventListener("click", async () => {
                    await this.ApiFuncs.QrCode.ShowAll();
                });


            },
            MenuItemClick:
            {
                HomeClick: async () => {
                    let jVarLocalFromHbs = await this.HtmlFuns.Templates.Header.MenuItemClick.HomeClick();

                    let jVarLocalKHeader = document.getElementById("KHeader");
                    jVarLocalKHeader.innerHTML = jVarLocalFromHbs;
                    let jVarLocalKCont1 = document.getElementById("KCont1");
                    jVarLocalKCont1.innerHTML = "";
                }
            }
        }
    };

    static HtmlFuns = {
        Templates: {
            Header: {
                MenuItemClick:
                {
                    HomeClick: async () => {
                        let jVarLocalFetchUrl = "Templates/Header.html";
                        let response = await fetch(jVarLocalFetchUrl);
                        let data = await response.text();
                        return await data;
                    }
                },
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
            QrCodeModalPopUp: async () => {
                let jVarLocalFetchUrl = "Hbs/Booking/QrCodeModalPopUp.html";
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

    static CommonFuncs = {
        serializeObject: (form) => {
            // Create a new FormData object
            const formData = new FormData(form);

            // Create an object to hold the name/value pairs
            const pairs = {};

            // Add each name/value pair to the object
            for (const [name, value] of formData) {
                pairs[name] = value;
            }

            // Return the object
            return pairs;
        },
        QrCode: {
            GenerateQrCodeOnCanvas: ({ inQrData = "" }) => {
                var canvas = document.getElementById('canvas');
                canvas.height = 1;
                canvas.width = 1;
                canvas.style.visibility = 'hidden';

                // Convert the options to an object.
                let opts = {};

                // Finish up the options
                opts.text = inQrData;
                opts.bcid = "qrcode";
                opts.scaleX = 1;
                opts.scaleY = 1;
                opts.rotate = "N";

                // Draw the bar code to the canvas
                try {
                    let ts0 = new Date;
                    bwipjs.toCanvas(canvas, opts);
                    show(ts0, new Date);
                } catch (e) {
                    console.log("error : ", e);
                    // Watch for BWIPP generated raiseerror's.

                    return;
                }

                function show(ts0, ts1) {
                    canvas.style.visibility = 'visible';
                }
            },
            GenerateQrCodeOnModal: ({ inQrData = "", inCanvasId }) => {
                var canvas = inCanvasId;
                canvas.height = 1;
                canvas.width = 1;
                canvas.style.visibility = 'hidden';

                // Convert the options to an object.
                let opts = {};

                // Finish up the options
                opts.text = inQrData;
                opts.bcid = "qrcode";
                opts.scaleX = 1;
                opts.scaleY = 1;
                opts.rotate = "N";

                // Draw the bar code to the canvas
                try {
                    let ts0 = new Date;
                    bwipjs.toCanvas(canvas, opts);
                    show(ts0, new Date);
                } catch (e) {
                    console.log("error : ", e);
                    // Watch for BWIPP generated raiseerror's.

                    return;
                }

                function show(ts0, ts1) {
                    canvas.style.visibility = 'visible';
                }
            }
        },
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

export { KSGlobalBookingClass };
