import React, { useEffect, useMemo, useState } from "react";
import UserTable from "./sub-comp/UserTable";
import { useGetUsersQuery } from "../redux/api/usersSlice";
import { useDeleteUserMutation } from "../redux/api/usersSlice";
import { toast, ToastContainer } from "react-toastify";
const Alluser = () => {
  const { data: userData, isLoading, isError, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadings }] = useDeleteUserMutation();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (userData && userData.data) {
      setData(userData.data);
    }
  }, [userData, deleteUser]);

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
              onClick={() => handleUpdate(row.values._id)}
              style={{ marginRight: "10px" }}
            >
              Update
            </button>
            <button onClick={() => handleDelete(row.values._id)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const handleUpdate = (user) => {
    console.log("Update user:", user);
  };

  const handleDelete = async (id) => {
    await deleteUser(id).unwrap();
    toast.success("User deleted successfully");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div> Error: {error.data.message} </div>;

  return (
    <div className="ml-14">
      <ToastContainer />
      <h1>User Table</h1>
      <UserTable columns={columns} data={data} />
    </div>
  );
};

export default Alluser;
