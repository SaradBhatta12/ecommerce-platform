import React, { useEffect, useMemo, useState } from "react";
import UserTable from "./sub-comp/UserTable";
import { useGetUsersQuery } from "../redux/api/usersSlice";

const Alluser = () => {
  const { data: userData, isLoading, isError, error } = useGetUsersQuery();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (userData && userData.data) {
      setData(userData.data);
    }
  }, [userData]);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Username", accessor: "username" },
      { Header: "Email", accessor: "email" },
      {
        Header: "Admin",
        accessor: "isAdmin",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => handleUpdate(row.original)}
              style={{ marginRight: "10px" }}
            >
              Update
            </button>
            <button onClick={() => handleDelete(row.original._id)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleUpdate = (user) => {
    console.log("Update user:", user);
  };

  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Table</h1>
      <UserTable columns={columns} data={data} />
    </div>
  );
};

export default Alluser;
