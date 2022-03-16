import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import useRouterHooks from "../../hooks/useRouterHooks";
import toast from "react-hot-toast";
import Form from "../../containers/User/Tickets/Form";

//importing services
import ticketsService from "../../services/Admin/supporttickets.service";
import usersService from "../../services/Admin/users.service.js";
import labsService from "../../services/Admin/labs.service";
import computersService from "../../services/Admin/computers.service";

const DoMaintenance = () => {
  const { params, navigate } = useRouterHooks();
  const [ticket, setTicket] = useState({});
  const [lab, setLab] = useState({});
  const [user, setUser] = useState({});
  const [computer, setComputer] = useState({});

  const getTicketFromFetch = useCallback(async () => {
    const fetchedTicket = await ticketsService.ListOne(params.id);
    if (!fetchedTicket.id) {
      navigate("/user/tickets");
      toast.error("A ticket on this lab doesnt exists");
      return;
    }
    setTicket(fetchedTicket);
  }, [params.id]);

  const getLabFromFetch = useCallback(async () => {
    const fetchedLab = await labsService.ListOne(params.labid);
    if (!fetchedLab.id) {
      navigate("/user/tickets");
      toast.error("A ticket on this lab doesnt exists");
      return;
    }
    setLab(fetchedLab);
  }, [params.labid]);

  const getUserFromFetch = useCallback(async () => {
    const fetchedUser = await usersService.ListOne(params.userid);
    if (!fetchedUser.id) {
      navigate("/user/tickets");
      toast.error("A ticket with this user doesnt exists");
      return;
    }
    setUser(fetchedUser);
  }, [params.userid]);
  const getComputerFromFetch = useCallback(async () => {
    const fetchedPC = await computersService.ListOne(params.pcid);
    if (!fetchedPC.id) {
      navigate("/user/tickets");
      toast.error("A ticket with this computer doesnt exists");
      return;
    }
    setComputer(fetchedPC);
  }, [params.pcid]);

  useEffect(() => {
    getLabFromFetch();
    getUserFromFetch();
    getTicketFromFetch();
    getComputerFromFetch();
  }, [
    getLabFromFetch,
    getUserFromFetch,
    getTicketFromFetch,
    getComputerFromFetch,
  ]);

  return (
    <Container fluid>
      <h1 className="text-center fw-bold">Maintenance</h1>
      <h2 className="text-center fw-bold">
        Computer #{computer.id} from {lab.location} laboratory #{lab.id}
      </h2>
      <Card className="py-3 shadow-lg border-0 mt-4 rounded-0 mb-5">
        <Row>
          <Col xl="6">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <h4>Ticket author: {user.fullname}</h4>
              <p>{user.email}</p>
            </div>
          </Col>
          <Col xl="6">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <h4>Ticket details</h4>
              <p>{ticket.required_fixes}</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Form />
    </Container>
  );
};

export default DoMaintenance;
