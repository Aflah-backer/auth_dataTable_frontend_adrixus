import React from "react";
import { TableContainer } from "../Components/Styles/TableContainer.styled";
import UsersTable from "../Components/UsersTable";
import { Container } from "../Components/Styles/Container";

function Home() {
  return (
    <>
      <Container>
        <TableContainer>
          <UsersTable />
        </TableContainer>
      </Container>
    </>
  );
}

export default Home;
