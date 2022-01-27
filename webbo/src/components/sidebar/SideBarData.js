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
  ImportContacts,
  ListAlt,
  EventNote,
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
        to: "/administration/users/userManagement",
        icon: <></>,
        claim: "users.read",
      },
      {
        title: "institutions",
        to: "/administration/institutions/institutionsManagement",
        icon: <></>,
        claim: "institutions.read",
      },
      {
        title: "studies",
        to: "/administration/studies/studiesManagement",
        icon: <></>,
        claim: "studies.read",
      },
      {
        title: "courses",
        to: "/administration/courses/coursesManagement",
        icon: <></>,
        claim: "courses.read",
      },
      {
        title: "classrooms",
        to: "/administration/classrooms/classroomsManagement",
        icon: <></>,
        claim: "classrooms.read",
      },
      {
        title: "terms",
        to: "/administration/terms/termsManagement",
        icon: <></>,
        claim: "terms.read",
      },
      {
        title: "exams",
        to: "/administration/exams/examsManagement",
        icon: <></>,
        claim: "exams.read",
      },
      {
        title: "records",
        to: "/administration/records/recordsManagement",
        icon: <></>,
        claim: "records.read",
      },
      {
        title: "roles",
        to: "/administration/roles/rolesManagement",
        icon: <></>,
        claim: "roles.read",
      },
      {
        title: "permissions",
        to: "/administration/claim/permissionClaimManagement",
        icon: <></>,
        claim: "claims.read",
      },
    ],
  },
  {
    title: "libraries",
    icon: <LocalLibrary />,
    to: "/library",
    items: [
      {
        title: "libraries",
        to: "/library/libraryManagement",
        icon: <></>,
        claim: "library.read",
      },

      {
        title: "books",
        to: "/library/books/booksManagement",
        icon: <></>,
        claim: "books.read",
      },
      {
        title: "bookLibrary",
        to: "/library/bookLibrary/bookLibraryManagement",
        icon: <></>,
        claim: "bookLibrary.read",
      },
      {
        title: "categories",
        to: "/library/category/categoryManagement",
        icon: <></>,
        claim: "category.read",
      },
      {
        title: "studentBook",
        to: "/library/studentBook/studentBookManagement",
        icon: <></>,
        claim: "studentBook.read",
      },
    ],
  },
];
