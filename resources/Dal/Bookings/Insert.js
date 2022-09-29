let LocalGetDate = () => {
    let date = new Date();

    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let HH = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    return `${dd}-${MM}-${yyyy}-${HH}-${mm}-${ss}`;
};

let InsertFunc = async ({ inObjectToInsert = {} }) => {
    console.log("inObjectToInsert : ", inObjectToInsert);

    let LocalReturnObject = { KTF: false, KResult: "" };

    try {

        let LocalJsonFileName = "Bookings.json";

        let ModalData = await Neutralino.filesystem.readFile(`./KData/JSON/TemplateData/${LocalJsonFileName}`);
        let ModalDataAsJson = JSON.parse(ModalData);

        let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
        let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
        let LocalKeys = Object.keys(LocalCustomersDataAsJson);
        let max = 1;
        console.log("11111111111 InsertFunc : ", LocalReturnObject);

        if (LocalKeys.length > 0) {
            let LocalKeysAsNumbers = toNumbers(LocalKeys);

            max = Math.max(...LocalKeysAsNumbers) + 1;
        };

        let LocalNewData = _.pick(inObjectToInsert, Object.keys(ModalDataAsJson));
        LocalNewData.DateTime = LocalGetDate();
        LocalCustomersDataAsJson[max] = LocalNewData;

        let LocalFromWriteFile = await Neutralino.filesystem.writeFile(`./KData/JSON/2017/${LocalJsonFileName}`, JSON.stringify(LocalCustomersDataAsJson));
        console.log("2222222222222 InsertFunc : ", LocalReturnObject);
        if (LocalFromWriteFile.success) {
            LocalReturnObject.KResult = `${max} saved successfully...`;
            LocalReturnObject.KTF = true;
        };

    } catch (error) {
        console.log("error InsertFunc : ", error);
    };

    console.log("4444444444444444 InsertFunc : ", LocalReturnObject);
    return await LocalReturnObject;
};

const toNumbers = arr => arr.map(Number);
