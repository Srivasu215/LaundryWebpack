class DalBookingFuncsClass {
    static InsertFunc = async ({ inObjectToInsert = {} }) => {
        let LocalReturnObject = { KTF: false, KResult: "" };

        try {

            let LocalJsonFileName = "Bookings.json";

            let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
            let ModalDataAsJson = JSON.parse(ModalData);

            let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
            let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
            let LocalKeys = Object.keys(LocalCustomersDataAsJson);
            let max = 1;

            if (LocalKeys.length > 0) {
                let LocalKeysAsNumbers = this.CommonFuns.toNumbers(LocalKeys);

                max = Math.max(...LocalKeysAsNumbers) + 1;
            };

            let LocalNewData = _.pick(inObjectToInsert, Object.keys(ModalDataAsJson));
            LocalNewData.DateTime = this.CommonFuns.LocalGetDate();
            LocalCustomersDataAsJson[max] = LocalNewData;

            let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${LocalJsonFileName}`, JSON.stringify(LocalCustomersDataAsJson));

            if (LocalFromWriteFile.success) {
                LocalReturnObject.KResult = `${max} saved successfully...`;
                LocalReturnObject.KTF = true;
            };

        } catch (error) {
            console.log("error InsertFunc : ", error);
        };

        return await LocalReturnObject;
    };

    static ShowTodayFunc = async () => {
        let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

        try {
            let LocalJsonFileName = "Bookings.json";
            let LocalFileName = `./KData/JSON/2017/${LocalJsonFileName}`;

            let LocalCustomersData = await Neutralino.filesystem.readFile(LocalFileName);
            let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

            let LocalCollectionData = Object.keys(LocalCustomersDataAsJson).map(key => ({ key, value: LocalCustomersDataAsJson[key] }));

            let LocalFilteredData = _.filter(LocalCollectionData, (LoopItem) => {
                if ("DateTime" in LoopItem.value) {
                    return LoopItem.value.DateTime.substring(0, 10) === this.CommonFuns.GetDateOnly();
                };
            });

            LocalReturnObject.JsonData = LocalFilteredData;
            LocalReturnObject.KTF = true;
        } catch (error) {
            //LocalReturnObject.KError =`${LocalFileName} `;
            LocalReturnObject.KError = error;
        };
        return await LocalReturnObject;
    };
    
    static ShowAllFunc = async () => {
        let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

        try {
            let LocalJsonFileName = "Bookings.json";
            let LocalFileName = `./KData/JSON/2017/${LocalJsonFileName}`;

            let LocalCustomersData = await Neutralino.filesystem.readFile(LocalFileName);
            let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

            let LocalCollectionData = Object.keys(LocalCustomersDataAsJson).map(key => ({ key, value: LocalCustomersDataAsJson[key] }));

            LocalReturnObject.JsonData = LocalCollectionData;
            LocalReturnObject.KTF = true;
        } catch (error) {
            //LocalReturnObject.KError =`${LocalFileName} `;
            LocalReturnObject.KError = error;
        };
        return await LocalReturnObject;
    };

    static ShowDataForDelete = async () => {
        let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

        try {
            let LocalJsonFileName = "Bookings.json";
            let LocalFileName = `./KData/JSON/2017/${LocalJsonFileName}`;

            let LocalCustomersData = await Neutralino.filesystem.readFile(LocalFileName);
            let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

            let LocalCollectionData = Object.keys(LocalCustomersDataAsJson).map(key => ({ key, value: LocalCustomersDataAsJson[key] }));

            let LocalFilteredData = _.filter(LocalCollectionData, (LoopItem) => {
                if ("DateTime" in LoopItem.value) {
                    return LoopItem.value.DateTime.substring(0, 10) === this.CommonFuns.GetDateOnly();
                };
            });

            LocalReturnObject.JsonData = LocalFilteredData;
            LocalReturnObject.KTF = true;
        } catch (error) {
            //LocalReturnObject.KError =`${LocalFileName} `;
            LocalReturnObject.KError = error;
        };
        return await LocalReturnObject;
    };

    static PickFunc = async ({ inRowPK }) => {
        let LocalJsonFileName = "Bookings.json";

        let LocalReturnObject = { KTF: false, KResult: "" };

        let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

        if (inRowPK in LocalCustomersDataAsJson) {
            LocalReturnObject.KTF = true;
            LocalReturnObject.KResult = LocalCustomersDataAsJson[inRowPK];
        };

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
        GetDateOnly: () => {
            let date = new Date();

            let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
            let yyyy = date.getFullYear();

            return `${dd}-${MM}-${yyyy}`;
        }
    }
};

export { DalBookingFuncsClass }