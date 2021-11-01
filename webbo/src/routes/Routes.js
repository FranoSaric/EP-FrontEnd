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
import PartnerProductForm from "../components/partnerProduct/partnerProductForm/PartnerProductForm";
import CategoryForm from "../components/categories/CategoryForm/CategoryForm";
import TableOfCategories from "../components/categories/tableOfCategories/TableOfCategories";
import BookForm from "../components/books/bookForm/BookForm";
import TableOfBooks from "../components/books/tableOfBooks/TableOfBooks";
import UserClaimForm from "../components/userClaimMapper/userClaimForm/UserClaimForm";

/////////////////////////////////////

import LibraryForm from "../components/libraries/libraryForm/LibraryForm";
import TableOfLibraries from "../components/libraries/tableOfLibraries/TableOfLibraries";
import TableOfInstitution from "../components/institutions/tableOfInstitution/TableOfInstitution";
import InstitutionForm from "../components/institutions/institutionForm/InstitutionForm";
import TableOfClassrooms from "../components/classrooms/tableOfClassrooms/TableOfClassrooms";
import ClassroomForm from "../components/classrooms/classroomForm/ClassroomForm";
import TableOfStudies from "../components/studies/tableOfStudies/TableOfStudies";
import StudyForm from "../components/studies/studyForm/StudyForm";
import TableOfCourses from "../components/courses/tableOfCourses/TableOfCourses";
import CourseForm from "../components/courses/courseForm/courseForm";
import TableOfStudentBook from "../components/studentBook/tableOfStudentBook/TableOfStudentBook";
import StudentBookForm from "../components/studentBook/studentBookForm/studentBookForm";

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
        path: "/administration/users/claimManagement/:userId",
        name: "Claim Management",
        component: UserClaimForm,
        exact: true,
        claimValue: "users.manageClaims",
    },
    {
        path: "/administration/institutions/institutionsManagement",
        name: "Institution Manager",
        component: TableOfInstitution,
        exact: true,
        claimValue: "institutions.read",
    },
    {
        path: "/administration/institutions/addInstitution",
        name: "Add Institution",
        component: InstitutionForm,
        exact: true,
        claimValue: "institutions.create",
    },
    {
        path: "/administration/institutions/addInstitution/:institutionId",
        name: "Add Institution",
        component: InstitutionForm,
        exact: true,
        claimValue: "institutions.update",
    },
    {
        path: "/administration/classrooms/classroomsManagement",
        name: "Classroom Manager",
        component: TableOfClassrooms,
        exact: true,
        claimValue: "classrooms.read",
    },
    {
        path: "/administration/classrooms/addClassroom",
        name: "Add Classroom",
        component: ClassroomForm,
        exact: true,
        claimValue: "classrooms.create",
    },
    {
        path: "/administration/classrooms/classroomForm/:classroomId",
        name: "Add Classroom",
        component: ClassroomForm,
        exact: true,
        claimValue: "classrooms.update",
    },
    {
        path: "/administration/studies/studiesManagement",
        name: "Classroom Manager",
        component: TableOfStudies,
        exact: true,
        claimValue: "studies.read",
    },
    {
        path: "/administration/studies/addStudy",
        name: "Add Study",
        component: StudyForm,
        exact: true,
        claimValue: "studies.create",
    },
    {
        path: "/administration/studies/studyForm/:studyId",
        name: "Add Study",
        component: StudyForm,
        exact: true,
        claimValue: "studies.update",
    },
    {
        path: "/administration/courses/coursesManagement",
        name: "Course Manager",
        component: TableOfCourses,
        exact: true,
        claimValue: "courses.read",
    },
    {
        path: "/administration/courses/addCourse",
        name: "Add Course",
        component: CourseForm,
        exact: true,
        claimValue: "courses.create",
    },
    {
        path: "/administration/courses/addCourse/:courseId",
        name: "Add Course",
        component: CourseForm,
        exact: true,
        claimValue: "courses.update",
    },
    {
        path: "/administration/studentBook/studentBookManagement",
        name: "Student Book Manager",
        component: TableOfStudentBook,
        exact: true,
        claimValue: "studentBook.read",
    },
    {
        path: "/administration/studentBook/addStudentBook",
        name: "Add Student Book",
        component: StudentBookForm,
        exact: true,
        claimValue: "studentBook.create",
    },
    {
        path: "/administration/studentBook/addStudentBook/:studentBookId",
        name: "Add Student Book",
        component: StudentBookForm,
        exact: true,
        claimValue: "studentBook.update",
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

/////////////////////////////////////////////////////////////////////////////////
    {
        path: "/library/libraryManagement",
        name: "Library Manager",
        component: TableOfLibraries,
        exact: true,
        claimValue: "library.read",
    },
    {
        path: "/library/addLibrary",
        name: "Add Library",
        component: LibraryForm,
        exact: true,
        claimValue: "library.create",
    },
    {
        path: "/library/addLibrary/:libraryId",
        name: "Library Form",
        component: LibraryForm,
        exact: true,
        claimValue: "library.update",
    },

    {
        path: "/library/category/categoryManagement",
        name: "Category Manager",
        component: TableOfCategories,
        exact: true,
        claimValue: "category.read",
    },
    {
        path: "/library/category/addCategory",
        name: "Add Category",
        component: CategoryForm,
        exact: true,
        claimValue: "category.create",
    },
    {
        path: "/library/category/categoryForm/:categoryId",
        name: "Category Form",
        component: CategoryForm,
        exact: true,
        claimValue: "category.update",
    },


    {
        path: "/library/books/booksManagement",
        name: "books Manager",
        component: TableOfBooks,
        exact: true,
        claimValue: "books.read",
    },
    {
        path: "/library/books/addBooks",
        name: "Add Books",
        component: BookForm,
        exact: true,
        claimValue: "books.create",
    },
    {
        path: "/library/books/bookForm/:bookId",
        name: "Books Form",
        component: BookForm,
        exact: true,
        claimValue: "books.update",
    },

];

export default Routes;
