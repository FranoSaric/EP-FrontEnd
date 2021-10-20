import UserForm from "../components/users/userForm/UserForm";
import Dashboard from "../components/dashboard/Dashboard";
import Settings from "../components/settings/Settings";
import TableOfUsers from "../components/users/tableOfUsers/TableOfUsers";
import TableOfTypes from "../components/typesOfUser/tableOfTypes/TableOfTypes";
import TableOfState from "../components/states/tableOfStates/TableOfState";
import StateForm from "../components/states/stateForm/StateForm";
import TableOfPlace from "../components/places/tableOfPlaces/TableOfPlace";
import PlaceForm from "../components/places/placeForm/PlaceForm";
import RoleForm from "../components/roles/roleForm/RoleForm";
import TypeForm from "../components/typesOfUser/typeForm/TypeForm";
import TableOfRoles from "../components/roles/tableOfRoles/TableOfRoles";
import MapperRoleForm from "../components/claimMapperRole/mapperRoleForm/MapperRoleForm";
import ChangePassword from "../components/changePassword/ChangePassword";
import PermissionScopeForm from "../components/permissionScope/permissionScopeForm/PermissionScopeForm";
import TableOfPermissionScope from "../components/permissionScope/tableOfPermissionScope/TableOfPermissionScope";
import TableOfPermissionClaim from "../components/permissionClaim/tableOfPermissionClaim/TableOfPermissionClaim";
import PermissionClaimForm from "../components/permissionClaim/permissionClaimForm/PermissionClaimForm";
import ProductsForm from "../components/products/productsForm/ProductsForm";
import TableOfProducts from "../components/products/tableOfProducts/TableOfProducts";
import TableOfProductPermissionScope from "../components/productPermissionScope/tableOfProductPermissionScope/TableOfProductPermissionScope";
import ProductPermissionScopeForm from "../components/productPermissionScope/productPermissionScopeForm/ProductPermissionScopeForm";
import UserRoleForm from "../components/userRoleMapper/userRoleForm/UserRoleForm";
import PartnerProductForm from "../components/partnerProduct/partnerProductForm/PartnerProductForm";

/**
 * all routes and their components
 */
const Routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        exact: true,
        claimValue: "",
    },
    {
        path: "/administration/users/adduser",
        name: "User Form",
        component: UserForm,
        exact: true,
        claimValue: "users.create",
    },
    {
        path: "/administration/users/adduser/:userId",
        name: "User Form",
        component: UserForm,
        exact: true,
        claimValue: "users.update",
    },
    {
        path: "/administration/users/roleManagement/:userId",
        name: "User claim mapper",
        component: UserRoleForm,
        exact: true,
        claimValue: "users.manageClaims",
    },
    {
        path: "/administration/states/statesManagement",
        name: "State Manager",
        component: TableOfState,
        exact: true,
        claimValue: "states.read",
    },
    {
        path: "/administration/states/addstate",
        name: "Add State",
        component: StateForm,
        exact: true,
        claimValue: "states.create",
    },
    {
        path: "/administration/states/addstate/:stateId",
        name: "Add State",
        component: StateForm,
        exact: true,
        claimValue: "states.update",
    },
    {
        path: "/administration/places/placesManagement",
        name: "Place Manager",
        component: TableOfPlace,
        exact: true,
        claimValue: "places.read",
    },
    {
        path: "/administration/places/addplace",
        name: "Add Place",
        component: PlaceForm,
        exact: true,
        claimValue: "places.create",
    },
    {
        path: "/administration/places/addplace/:placeId",
        name: "Add Place",
        component: PlaceForm,
        exact: true,
        claimValue: "places.update",
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
        exact: true,
        claimValue: "",
    },
    {
        path: "/administration/users/userManagement",
        name: "View Users",
        component: TableOfUsers,
        exact: true,
        claimValue: "users.read",
    },
    {
        path: "/administration/roles/rolesManagement",
        name: "Role Managment",
        component: TableOfRoles,
        exact: true,
        claimValue: "roles.read",
    },
    {
        path: "/administration/roles/roleForm",
        name: "Add Role",
        component: RoleForm,
        exact: true,
        claimValue: "roles.create",
    },
    {
        path: "/administration/roles/roleForm/:roleId",
        name: "Add Role",
        component: RoleForm,
        exact: true,
        claimValue: "roles.update",
    },
    {
        path: "/administration/roles/addClaimsToRole/:roleId",
        name: "Add Claims to Role",
        component: MapperRoleForm,
        exact: true,
        claimValue: "roles.manageClaims",
    },
    {
        path: "/administration/types/typesManagement",
        name: "View Types",
        component: TableOfTypes,
        exact: true,
        claimValue: "types.read",
    },
    {
        path: "/administration/types/addtype",
        name: "Add Type",
        component: TypeForm,
        exact: true,
        claimValue: "types.create",
    },
    {
        path: "/administration/types/addtype/:typeId",
        name: "Add Type",
        component: TypeForm,
        exact: true,
        claimValue: "types.update",
    },
    {
        path: "/administration/scopes/permissionScopesManagement",
        name: "View Permission Scopes",
        component: TableOfPermissionScope,
        exact: true,
        claimValue: "scopes.read",
    },
    {
        path: "/administration/scopes/addpermissionscope",
        name: "Add Permission Scope",
        component: PermissionScopeForm,
        exact: true,
        claimValue: "scopes.create",
    },
    {
        path: "/administration/scopes/addpermissionscope/:scopeId",
        name: "Add Permission Scope",
        component: PermissionScopeForm,
        exact: true,
        claimValue: "scopes.update",
    },
    {
        path: "/administration/claim/permissionClaimManagement",
        name: "View Permission Claim",
        component: TableOfPermissionClaim,
        exact: true,
        claimValue: "claims.read",
    },
    {
        path: "/administration/claim/addpermissionclaim",
        name: "Add Permission Claim",
        component: PermissionClaimForm,
        exact: true,
        claimValue: "claims.create",
    },
    {
        path: "/administration/claim/addpermissionclaim/:claimId",
        name: "Add Permission Claim",
        component: PermissionClaimForm,
        exact: true,
        claimValue: "claims.update",
    },
    {
        path: "/administration/products/productsManagement",
        name: "View Products",
        component: TableOfProducts,
        exact: true,
        claimValue: "products.read",
    },
    {
        path: "/administration/products/addproduct",
        name: "Add Product",
        component: ProductsForm,
        exact: true,
        claimValue: "products.create",
    },
    {
        path: "/administration/products/addproduct/:productId",
        name: "Add Product",
        component: ProductsForm,
        exact: true,
        claimValue: "products.update",
    },
    {
        path: "/administration/products/permissions/productPermissionScopeManagement",
        name: "View Products Permission Scope",
        component: TableOfProductPermissionScope,
        exact: true,
        claimValue: "productpermissions.read",
    },
    {
        path: "/administration/products/permissions/productaddpermissionscope",
        name: "Add Product Permission Scope",
        component: ProductPermissionScopeForm,
        exact: true,
        claimValue: "productpermissions.create",
    },
    {
        path: "/administration/products/permissions/productaddpermissionscope/:productPermissionScopeId",
        name: "Add Product Permission Scope",
        component: ProductPermissionScopeForm,
        exact: true,
        claimValue: "productpermissions.update",
    },
    {
        path: "/changePassword",
        name: "Change Password",
        component: ChangePassword,
        exact: true,
        claimValue: "",
    },
    {
        path: "/partners/assignProduct",
        name: "Assign Product",
        component: PartnerProductForm,
        exact: true,
        claimValue: "partnerProduct.create",
    },

];

export default Routes;
