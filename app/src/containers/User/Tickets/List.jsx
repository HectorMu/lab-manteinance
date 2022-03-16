import React, { useEffect, useState } from "react";
import DataTable from "../../../components/Global/DataTable";
import supportticketsService from "../../../services/Admin/supporttickets.service";
import useServiceFetch from "../../../hooks/useServiceFetch";
import useRouterHooks from "../../../hooks/useRouterHooks";
import Loading from "../../../components/Global/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import helpers from "../../../helpers/helpers";

const List = () => {
  const [openTickets, setOpenTickets] = useState([]);
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

  const redirectDoMaintenancePage = (maintenance) => {
    navigate(
      `/user/do-maintenance/${maintenance.id}/${maintenance.fk_computer}/${maintenance.fk_user}/${maintenance.fk_laboratory}`
    );
  };

  const tableConfig = {
    buttons: [
      {
        key: "btnMaintenance",
        text: "Make maintenance",
        style: "btn btn-success text-withe mx-1 btn-sm",
        fwicon: "fas fa-arrow-right",
        click: (o) => redirectDoMaintenancePage(o),
      },
    ],
  };

  useEffect(() => {
    setOpenTickets(hookData.filter((d) => d.status === "Open"));
  }, [hookData]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable
          data={openTickets}
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
