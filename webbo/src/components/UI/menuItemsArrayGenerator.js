import { MenuItem } from "@material-ui/core";

const menuItemsArrayGenerator = (id, itemsData) => {
    let generatedItems;
    switch (id) {
        case "userType":
            generatedItems = itemsData.map((listItem) => {
                return (
                    <MenuItem
                        key={listItem.IDUserType}
                        value={listItem.IDUserType}
                    >
                        {listItem.Name}
                    </MenuItem>
                );
            });
            break;
        case "partnerID":
            generatedItems = itemsData.map((listItem) => {
                return (
                    <MenuItem
                        key={listItem.IDPartner}
                        value={listItem.IDPartner}
                    >
                        {listItem.Naziv}
                    </MenuItem>
                );
            });
            break;
        case "scopePermission":
            generatedItems = itemsData.map((listItem) => {
                return (
                    <MenuItem
                        key={listItem.IDPermissionScope}
                        value={listItem.IDPermissionScope}
                    >
                        {listItem.Name}
                    </MenuItem>
                );
            });
            break;
        case "product":
            generatedItems = itemsData.map((listItem) => {
                return (
                    <MenuItem
                        key={listItem.IDProduct}
                        value={listItem.IDProduct}
                    >
                        {listItem.Name}
                    </MenuItem>
                );
            });
            break;
        case "role":
            generatedItems = itemsData.map((listItem) => {
                return (
                    <MenuItem key={listItem.IDRole} value={listItem.IDRole}>
                        {listItem.Name}
                    </MenuItem>
                );
            });
            break;

        case "states":
            generatedItems = itemsData.map((listItem) => {
                return (
                    <MenuItem
                        key={listItem.IDDrzava}
                        value={listItem.IDDrzava}
                        name={listItem.NazivDrzave}
                    >
                        {listItem.NazivDrzave}
                    </MenuItem>
                );
            });
            break;
        case "language":
            generatedItems = itemsData.map((listItem, index) => {
                return (
                    <MenuItem key={index} value={listItem.value}>
                        {listItem.name}
                    </MenuItem>
                );
            });
            break;

        default:
            generatedItems = itemsData.map((listItem, index) => {
                return (
                    <MenuItem key={index} value={listItem.id}>
                        {listItem.name}
                    </MenuItem>
                );
            });
    }
    return generatedItems;
};

export default menuItemsArrayGenerator;
