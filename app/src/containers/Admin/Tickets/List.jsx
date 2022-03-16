import React from "react";
import DataTable from "../../../components/Global/DataTable";
import supportticketsService from "../../../services/Admin/supporttickets.service";
import useServiceFetch from "../../../hooks/useServiceFetch";
import useRouterHooks from "../../../hooks/useRouterHooks";
import Loading from "../../../components/Global/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import helpers from "../../../helpers/helpers";

const List = () => {
  const { isLoading, hookData, refreshData } = useServiceFetch(
    supportticketsService.List
  );
  const { navigate } = useRouterHooks();

  const handleDelete = async (ticket) => {
    Swal.fire({
      text: `¿Delete ticket '${ticket.id}'?`,
      icon: "info",
      ...helpers.alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await supportticketsService.Delete(ticket.id);
        if (!deleteResults.status) {
          return toast.error(deleteResults.statusText);
        }
        toast.success("Ticket deleted");
        await refreshData();
      }
    });
  };

  const redirectToEditPage = (lab) => {
    navigate(`/tickets/edit/${lab.id}`);
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
          actions={true}
          renameHeaders={{
            fk_user: "User ID",
            fk_computer: "PC ID",
            fk_laboratory: "Lab ID",
            lifting_date: "Lifting date",
            required_fixes: "Required fixes",
          }}
          buttons={tableConfig.buttons}
        />
      )}
    </div>
  );
};

export default List;
