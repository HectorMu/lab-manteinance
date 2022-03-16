import React from "react";
import DataTable from "../../../components/Global/DataTable";
import computersService from "../../../services/Admin/computers.service";
import useServiceFetch from "../../../hooks/useServiceFetch";
import useRouterHooks from "../../../hooks/useRouterHooks";
import Loading from "../../../components/Global/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import helpers from "../../../helpers/helpers";

const List = () => {
  const { isLoading, hookData, refreshData } = useServiceFetch(
    computersService.List
  );
  const { navigate } = useRouterHooks();

  const handleDelete = async (computer) => {
    Swal.fire({
      text: `¿Delete computer '${computer.id}'?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await computersService.Delete(computer.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Computer deleted");
        await refreshData();
      }
    });
  };

  const redirectToEditPage = (computer) => {
    navigate(`/computers/edit/${computer.id}`);
  };

  const tableConfig = {
    buttons: [
      {
        key: "btnEdit",
        text: "Edit",
        style: "btn btn-secondary text-withe m-1 btn-sm",
        fwicon: "fas fa-pen fa-xs",
        click: (o) => redirectToEditPage(o),
      },
      {
        key: "btnDElete",
        text: "Delete",
        style: "btn btn-danger m-1 btn-sm",
        fwicon: "fas fa-times fa-xs",
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
          title="Registers"
          renameHeaders={{
            fk_laboratory: "LAB ID",
            serial_number: "S/N",
            network_type: "Network type",
          }}
          actions={true}
          buttons={tableConfig.buttons}
        />
      )}
    </div>
  );
};

export default List;
