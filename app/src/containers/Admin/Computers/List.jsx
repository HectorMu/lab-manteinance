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
  const redirectToDetailsPage = (computer) => {
    navigate(`/computer/details/${computer.id}`);
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
      {
        key: "btnDetails",
        text: "Details",
        style: "btn btn-success mx-1 btn-sm",
        fwicon: "fas fa-info",
        click: (o) => redirectToDetailsPage(o),
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
          actions={true}
          buttons={tableConfig.buttons}
        />
      )}
    </div>
  );
};

export default List;
