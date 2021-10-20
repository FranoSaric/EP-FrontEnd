import DashboardIcon from "@material-ui/icons/Dashboard";
import BarChartIcon from "@material-ui/icons/BarChart";
import PeopleIcon from "@material-ui/icons/People";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import BlurCircularIcon from "@material-ui/icons/BlurCircular";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import AddIcon from "@material-ui/icons/Add";
import MapIcon from "@material-ui/icons/Map";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PlaceIcon from "@material-ui/icons/Place";

import React from "react";
/**
 * all routes for sidebar
 */
export const menu = [
    {
        title: "dashboard",
        icon: <DashboardIcon />,
        to: "/dashboard",
        claim: "",
    },
    {
        title: "administration",
        icon: <SupervisedUserCircleIcon />,
        to: "/administration",
        items: [
            {
                title: "users",
                icon: <PeopleIcon />,
                to: "/administration/users",
                items: [
                    {
                        title: "userManagement",
                        to: "/administration/users/userManagement",
                        icon: <></>,
                        claim: "users.read",
                    },
                    {
                        title: "addUser",
                        to: "/administration/users/adduser",
                        icon: <></>,
                        claim: "users.create",
                    },
                ],
            },
            {
                title: "states",
                icon: <LocationCityIcon />,
                to: "/administration/states",
                items: [
                    {
                        title: "stateManager",
                        to: "/administration/states/statesManagement",
                        icon: <></>,
                        claim: "states.read",
                    },
                    {
                        title: "addState",
                        to: "/administration/states/addstate",
                        icon: <></>,
                        claim: "states.create",
                    },
                ],
            },
            {
                title: "places",
                icon: <PlaceIcon />,
                to: "/administration/places",
                items: [
                    {
                        title: "placesManager",
                        to: "/administration/places/placesManagement",
                        icon: <></>,
                        claim: "places.read",
                    },
                    {
                        title: "addPlace",
                        to: "/administration/places/addplace",
                        icon: <></>,
                        claim: "places.create",
                    },
                ],
            },
            {
                title: "roles",
                icon: <AssignmentIndIcon />,
                to: "/administration/roles",
                items: [
                    {
                        title: "rolesManagement",
                        to: "/administration/roles/rolesManagement",
                        icon: <></>,
                        claim: "roles.read",
                    },
                    {
                        title: "addRole",
                        to: "/administration/roles/roleForm",
                        icon: <></>,
                        claim: "roles.create",
                    },
                ],
            },
            {
                title: "types",
                icon: <AssignmentIndIcon />,
                to: "/administration/types",
                items: [
                    {
                        title: "typesManagement",
                        to: "/administration/types/typesManagement",
                        icon: <></>,
                        claim: "types.read",
                    },
                    {
                        title: "addType",
                        to: "/administration/types/addtype",
                        icon: <></>,
                        claim: "types.create",
                    },
                ],
            },
            {
                title: "scopes",
                icon: <LockOpenIcon />,
                to: "/administration/scopes",
                items: [
                    {
                        title: "permissionScopesManagement",
                        to: "/administration/scopes/permissionScopesManagement",
                        icon: <></>,
                        claim: "scopes.read",
                    },
                    {
                        title: "addPermissionScope",
                        to: "/administration/scopes/addpermissionscope",
                        icon: <></>,
                        claim: "scopes.create",
                    },
                ],
            },
            {
                title: "claims",
                icon: <LockOpenIcon />,
                to: "administration/claim",
                items: [
                    {
                        title: "permissionClaimManagement",
                        to: "/administration/claim/permissionClaimManagement",
                        icon: <></>,
                        claim: "claims.read",
                    },
                    {
                        title: "addPermissionClaim",
                        to: "/administration/claim/addpermissionclaim",
                        icon: <></>,
                        claim: "claims.create",
                    },
                ],
            },
			{
                title: "products",
                icon: <ListAltIcon />,
                to: "/administration/products",
                items: [
                    {
                        title: "productsManagement",
                        to: "/administration/products/productsManagement",
                        icon: <></>,
                        claim: "products.read",
                    },
                    {
                        title: "addProduct",
                        to: "/administration/products/addproduct",
                        icon: <></>,
                        claim: "products.create",
                    },
                    {
                        title: "productPermissions",
                        icon: <LockOpenIcon />,
                        to: "/administration/products/permissions",
                        items: [
                            {
                                title: "productPermissionScopeManagement",
                                to: "/administration/products/permissions/productPermissionScopeManagement",
                                icon: <></>,
                                claim: "productpermissions.read",
                            },
                            {
                                title: "addProductPermissionScope",
                                to: "/administration/products/permissions/productaddpermissionscope",
                                icon: <></>,
                                claim: "productpermissions.create",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "partners",
        icon: <ListAltIcon />,
        to: "/partners",
        items: [
            {
                title: "assignProduct",
                to: "/partners/assignProduct",
                icon: <></>,
                claim: "partnerProduct.create",
            },
            
        ],
    },
];
