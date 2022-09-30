import { KSGlobalBookingClass } from "./KeshavSoft/Ui/BookingFuncs";

let jFStart = async () => {
    await KSGlobalBookingClass.ApiFuncs.Header.ShowinDOM();
    await KSGlobalBookingClass.ApiFuncs.Insert();
};

jFStart().then(p => {

});
