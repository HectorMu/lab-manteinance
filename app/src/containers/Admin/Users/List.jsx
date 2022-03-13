import React from "react";
import DataTable from "../../../components/Global/DataTable";
import usersService from "../../../services/Admin/users.service";
import useServiceFetch from "../../../hooks/useServiceFetch";

const List = () => {
  const { isLoading, hookData } = useServiceFetch(usersService.List);

  console.log(hookData);
  return (
    <div>
      <DataTable
        data={hookData}
        renameHeaders={{ fk_rol: "Rol" }}
        title="Registers"
      />
    </div>
  );
};

export default List;
