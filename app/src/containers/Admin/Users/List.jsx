import React from "react";
import DataTable from "../../../components/Global/DataTable";
import usersService from "../../../services/Admin/users.service";
import useServiceFetch from "../../../hooks/useServiceFetch";
import Loading from "../../../components/Global/Loading";

const List = () => {
  const { isLoading, hookData } = useServiceFetch(usersService.List);

  const tableConfig = {
    buttons: [
      {
        key: "btnEdit",
        text: "Edit",
        style: "btn btn-secondary text-withe mx-1 btn-sm",
        fwicon: "fas fa-pen",
        click: (o) => {
          window.alert(`Default action ${o}`);
        },
      },
      {
        key: "btnDElete",
        text: "Delete",
        style: "btn btn-danger mx-1 btn-sm",
        fwicon: "fas fa-times",
        click: (o) => {
          window.alert(`Default action ${o}`);
        },
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
