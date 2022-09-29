let ShowIroningToCompleteFunc = async () => {
    let LocalJsonFileName = "Bookings.json";

    let LocalReturnObject = { KTF: false, KResult: "", JsonData: {} };

    let LocalCustomersData = await Neutralino.filesystem.readFile(`./KData/JSON/2017/${LocalJsonFileName}`);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    let LocalCollectionData = Object.keys(LocalCustomersDataAsJson).map(key => ({ key, value: LocalCustomersDataAsJson[key] }));

    // let LocalWashedData = _.filter(LocalCollectionData, (LoopItem) => {
    //     if ("WashingDone" in LoopItem.value) {
    //         LoopItem.value.WashingDone.KTF === true;
    //     };
    // });


    let LocalDryedData = _.filter(LocalCollectionData, (LoopItem) => {
        if ("DryingDone" in LoopItem.value) {
            return LoopItem.value.DryingDone.KTF === true;
        };
    });

    let LocalFilteredData = _.filter(LocalDryedData, (LoopItem) => {
        if ("IroningDone" in LoopItem.value) {
            return (LoopItem.value.IroningDone.KTF === true) === false;
        } else {
            return true;
        }
    });

    LocalReturnObject.JsonData = LocalFilteredData;
    console.log("LocalReturnObject : ", LocalReturnObject);
    return await LocalReturnObject;
};

let LocalGetDateOnly = () => {
    let date = new Date();

    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();

    return `${dd}-${MM}-${yyyy}`;
};
