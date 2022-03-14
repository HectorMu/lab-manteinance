import React from "react";
import DataTable from "../../../components/Global/DataTable";
import usersService from "../../../services/Admin/users.service";
import useServiceFetch from "../../../hooks/useServiceFetch";
import useRouterHooks from "../../../hooks/useRouterHooks";
import Loading from "../../../components/Global/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import helpers from "../../../helpers/helpers";

const List = () => {
  const { isLoading, hookData, refreshData } = useServiceFetch(
    usersService.List
  );
  const { navigate } = useRouterHooks();

  const handleDelete = async (user) => {
    Swal.fire({
      text: `¿Delete user '${user.fullname}'?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await usersService.Delete(user.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("User deleted");
        await refreshData();
      }
    });
  };

  const redirectToEditPage = (user) => {
    navigate(`/users/edit/${user.id}`);
  };

  const tableConfig = {
    buttons: [
      {
        key: "btnEdit",
        text: "Edit",
        style: "btn btn-secondary text-withe mx-1 btn-sm",
        fwicon: "fas fa-pen",
        click: (o) => redirectToEditPage(o),
      },
      {
        key: "btnDElete",
        text: "Delete",
        style: "btn btn-danger mx-1 btn-sm",
        fwicon: "fas fa-times",
        click: (o) => handleDelete(o),
      },
    ],
  };
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          data={hookData}
          renameHeaders={{ rol_name: "Rol" }}
          hideColumns={["rol_id"]}
          title="Registers"
          actions={true}
          buttons={tableConfig.buttons}
        />
      )}
    </div>
  );
};

export default List;
