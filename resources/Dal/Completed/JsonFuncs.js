import { DalBookingFuncsClass } from "../Bookings/JsonFuncs";
import _ from "../../js/lodash";

class DalCompletedClass {

    static ShowAllFunc = async () => {
        let LocalJsonFileName = "Completed.json";

        let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

        let LocalData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
        let LocalDataAsJson = JSON.parse(LocalData);
        let LocalCollectionData = Object.keys(LocalDataAsJson).map(key => ({ key, value: LocalDataAsJson[key] }));

        LocalReturnObject.JsonData = LocalCollectionData;
        LocalReturnObject.KTF = true;

        return await LocalReturnObject;
    };

    static ShowWithBookingDataFunc = async () => {
        let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

        let LocalBookingData = await DalBookingFuncsClass.ShowAllFunc();
        let LocalCompletedData = await this.ShowAllFunc();

        if (LocalCompletedData.KTF === false) {
            LocalReturnObject.KReason = LocalCompletedData.KReason;
            return await LocalReturnObject;
        };

        if (LocalBookingData.KTF === false) {
            LocalReturnObject.KReason = LocalBookingData.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.JsonData = _.map(LocalCompletedData.JsonData, (LoopItem) => {
            let LoopInside = _.find(LocalBookingData.JsonData, LoopBooking => {
                return LoopItem.key in LoopBooking.value.QrCodes;
            });
            console.log("LoopInside", LoopInside);
            if ((LoopInside === undefined) === false) {
                LoopItem.value.CustomerName = LoopInside.value.CustomerName;
            } else {
                LocalReturnObject.KReason = `${LoopItem.key} : Qrcode not found in Bookings.json`;
            };

            return LoopItem;
        });

        LocalReturnObject.KTF = true;

        return await LocalReturnObject;
    };


    static CommonFuns = {
        toNumbers: arr => arr.map(Number),
        LocalGetDate: () => {
            let date = new Date();

            let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
            let yyyy = date.getFullYear();
            let HH = date.getHours();
            let mm = date.getMinutes();
            let ss = date.getSeconds();

            return `${dd}-${MM}-${yyyy}-${HH}-${mm}-${ss}`;
        },
        LocalGetDateOnly: () => {
            let date = new Date();

            let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
            let yyyy = date.getFullYear();

            return `${dd}-${MM}-${yyyy}`;
        }
    }
};

export { DalCompletedClass }
