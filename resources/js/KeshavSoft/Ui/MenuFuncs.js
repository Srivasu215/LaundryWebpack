class KSGlobalMenuClass {
    static ApiFuncs = {
        Header: {
            MenuItemClick:
            {
                Booking: async () => {
                    KSGlobalClientSideFuncsClass.Booking.ApiFuncs.Header.ShowinDOM();
                    KSGlobalClientSideFuncsClass.Booking.ApiFuncs.Insert();
                }
            }
        }
    };
};
