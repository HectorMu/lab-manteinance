import React from "react";
import DataTable from "../../../components/Global/DataTable";
import maintenanceService from "../../../services/Admin/maintenance.service";
import useServiceFetch from "../../../hooks/useServiceFetch";
import useRouterHooks from "../../../hooks/useRouterHooks";
import Loading from "../../../components/Global/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import helpers from "../../../helpers/helpers";

const List = () => {
  const { isLoading, hookData, refreshData } = useServiceFetch(
    maintenanceService.List
  );
  const { navigate } = useRouterHooks();

  const handleDelete = async (maintenance) => {
    Swal.fire({
      text: `¿Delete maintenance '${maintenance.id}'?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await maintenanceService.Delete(maintenance.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Maintenance deleted");
        await refreshData();
      }
    });
  };

  const redirectToEditPage = (maintenance) => {
    navigate(`/maintenances/edit/${maintenance.id}`);
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
          title="Registers"
          renameHeaders={{
            fk_computer: "PC ID",
            fk_laboratory: "LAB ID",
          }}
          actions={true}
          buttons={tableConfig.buttons}
        />
      )}
    </div>
  );
};

export default List;
