let PickFunc = async ({ inRowPK }) => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "" };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    console.log("LocalCustomersDataAsJson : ", inRowPK, LocalCustomersDataAsJson);
    if (inRowPK in LocalCustomersDataAsJson) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = LocalCustomersDataAsJson[inRowPK];
    };

    return await LocalReturnObject;
};
