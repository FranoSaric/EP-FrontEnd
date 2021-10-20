import { menu } from "../components/sidebar/SideBarData";

export let validatedSideBar = [];

export const SideBarValidator = (claims) => {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].items) {
            menu[i].items.map((item, key) => {
                let counter = 0;
                for (let j = 0; j < claims.length; j++) {
                    if (
                        item.title.toUpperCase() ===
                        claims[j].ClaimType.split(".")[0].toUpperCase()
                    ) {
                        counter++;
                    }
                }
                if (counter < 1) menu[i].items.splice(key, 1);
                let br = 0;
                if (item.items) {
                    for (let k = 0; k < claims.length; k++) {
                        claims[k].ClaimValues.map((claim, index) => {
                            // if (claim !== null) {
                                let splitedClaim = claim.split(".");
                                if (
                                    item.title.toUpperCase() ===
                                    splitedClaim[0].toUpperCase()
                                ) {
                                    if (splitedClaim[1] === "create") {
                                        br++;
                                    }
                                }
                            // }
                        });
                    }
                    if (br < 1) item.items.splice(1, 1);
                }
            });
        }
    }
    validatedSideBar = menu;
};
