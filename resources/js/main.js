import { KSGlobalBookingClass } from "./KeshavSoft/Ui/BookingFuncs";

let jFStart = async () => {
    await KSGlobalBookingClass.ApiFuncs.Header.ShowinDOM();
    await KSGlobalBookingClass.ApiFuncs.ShowinDOM.Insert();
};

jFStart().then(p => {

});
