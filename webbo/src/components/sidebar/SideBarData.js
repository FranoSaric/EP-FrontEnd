import {
    DynamicFeed,
    MenuBook,
    Apartment,
    LocalLibrary,
    LibraryBooks,
    MeetingRoom,
    LockOpen,
    Bookmarks,
    Dashboard,
    People,
    SupervisedUserCircle,
    AssignmentInd,
    ImportContacts
} from "@material-ui/icons";

import React from "react";
/**
 * all routes for sidebar
 */
export const menu = [
    {
        title: "dashboard",
        icon: <Dashboard />,
        to: "/dashboard",
        claim: "",
    },
    {
        title: "administration",
        icon: <SupervisedUserCircle />,
        to: "/administration",
        items: [
            {
                title: "users",
                icon: <People />,
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
                title: "institutions",
                icon: <Apartment />,
                to: "/administration/institutions",
                items: [
                    {
                        title: "institutionManager",
                        to: "/administration/institutions/institutionsManagement",
                        icon: <></>,
                        claim: "institutions.read",
                    },
                    {
                        title: "addInstitution",
                        to: "/administration/institutions/addInstitution",
                        icon: <></>,
                        claim: "institutions.create",
                    },
                ],
            },
            {
                title: "classrooms",
                icon: <MeetingRoom />,
                to: "/administration/classrooms",
                items: [
                    {
                        title: "classroomManagement",
                        to: "/administration/classrooms/classroomsManagement",
                        icon: <></>,
                        claim: "classrooms.read",
                    },
                    {
                        title: "addClassroom",
                        to: "/administration/classrooms/addClassroom",
                        icon: <></>,
                        claim: "classrooms.create",
                    },
                ],
            },
            {
                title: "studies",
                icon: <DynamicFeed />,
                to: "/administration/studies",
                items: [
                    {
                        title: "studyManagement",
                        to: "/administration/studies/studiesManagement",
                        icon: <></>,
                        claim: "studies.read",
                    },
                    {
                        title: "addStudy",
                        to: "/administration/studies/addStudy",
                        icon: <></>,
                        claim: "studies.create",
                    },
                ],
            },
            {
                title: "courses",
                icon: <Bookmarks />,
                to: "/administration/courses",
                items: [
                    {
                        title: "courseManagement",
                        to: "/administration/courses/coursesManagement",
                        icon: <></>,
                        claim: "courses.read",
                    },
                    {
                        title: "addCourse",
                        to: "/administration/courses/addCourse",
                        icon: <></>,
                        claim: "courses.create",
                    },
                ],
            },
            {
                title: "roles",
                icon: <AssignmentInd />,
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
                title: "claims",
                icon: <LockOpen />,
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
        ],
    },
    {
        title: "library",
        icon: <LocalLibrary />,
        to: "/library",
        items: [
            {
                title: "libraryManagement",
                to: "/library/libraryManagement",
                icon: <></>,
                claim: "library.read",
            },
            {
                title: "addLibrary",
                to: "/library/addLibrary",
                icon: <></>,
                claim: "library.create",
            },
            {
                title: "books",
                icon: <LibraryBooks />,
                to: "/library/books",
                items: [
                    {
                        title: "booksManagement",
                        to: "/library/books/booksManagement",
                        icon: <></>,
                        claim: "books.read",
                    },
                    {
                        title: "addBook",
                        to: "/library/books/addBooks",
                        icon: <></>,
                        claim: "books.create",
                    },
                ],
            },
            {
                title: "booksCategories",
                icon: <MenuBook />,
                to: "/library/category",
                items: [
                    {
                        title: "categoryManagement",
                        to: "/library/category/categoryManagement",
                        icon: <></>,
                        claim: "category.read",
                    },
                    {
                        title: "addCategory",
                        to: "/library/category/addCategory",
                        icon: <></>,
                        claim: "category.create",
                    },
                ],
            },
            {
                title: "studentBook",
                icon: <ImportContacts />,
                to: "/administration/studentBook",
                items: [
                    {
                        title: "studentBookManager",
                        to: "/administration/studentBook/studentBookManagement",
                        icon: <></>,
                        claim: "studentBook.read",
                    },
                    {
                        title: "addStudentBook",
                        to: "/administration/studentBook/addStudentBook",
                        icon: <></>,
                        claim: "studentBook.create",
                    },
                ],
            },
        ],
    }
];
