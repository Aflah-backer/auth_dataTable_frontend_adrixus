import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SearchInput } from "./Styles/SearchInput";
import { LogoutButton } from "./Styles/LogoutButton";
import { LogoutBtnContainer } from "./Styles/LogoutBtnContainer";
import { Table } from "./Styles/Table";
import { ArrowUp } from "./Styles/ArrowUp";
import { Center } from "./Styles/Center";
import { ArrowDown } from "./Styles/ArrowDown";
import { SortDiv } from "./Styles/SortDiv";
import { PgNum } from "./Styles/PageNum";
import { Td } from "./Styles/TableData";
import { Th } from "./Styles/TableHead";
import { Pagination } from "./Styles/Pagination";
import { Tr } from "./Styles/TableRow";
import { ArrowContainer } from "./Styles/ArrowContainer";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authActions";

function UsersTable() {
  const dispatch = useDispatch();
  let users = useSelector((state) => state.users.users);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [rowperPage] = useState(15);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilterData(users);
  }, []);

  useEffect(() => {
    setTableData(filterData.slice(0, rowperPage));
  }, [filterData]);

  const handleNext = () => {
    if (currentpage < filterData.length / rowperPage) {
      setTableData(
        filterData.slice(
          currentpage * rowperPage,
          currentpage * rowperPage + rowperPage
        )
      );
      setCurrentpage(currentpage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentpage === 1) {
      return;
    }
    setTableData(
      filterData.slice(
        (currentpage - 2) * rowperPage,
        (currentpage - 1) * rowperPage
      )
    );
    setCurrentpage(currentpage - 1);
  };

  const sortAscending = () => {
    let data = filterData.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    setFilterData([...data]);
  };

  const sortDesending = () => {
    let data = filterData.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
    setFilterData([...data]);
  };

  const ageIncrement = () => {
    let data = filterData
      .filter((item) => item.age)
      .sort((prev, next) => prev.age - next.age);
    setFilterData([...data]);
  };

  const ageDecrement = () => {
    let data = filterData
      .filter((item) => item.age)
      .sort((prev, next) => next.age - prev.age);
    setFilterData([...data]);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchResults = users.filter((user) => {
      return Object.values(user)
        .join("")
        .toLowerCase()
        .includes(search?.toLowerCase());
    });
    setFilterData([...searchResults]);
  };

  return (
    <>
      <SearchInput
        size="lg"
        type="text"
        placeholder="search"
        value={search}
        onChange={handleSearch}
      ></SearchInput>
      <LogoutBtnContainer>
        <LogoutButton onClick={() => dispatch(logout())}>LogOut</LogoutButton>
      </LogoutBtnContainer>
      <Table>
        <thead>
          <tr>
            <Th>No</Th>
            <Th>
              <ArrowContainer>
                User Name{" "}
                <SortDiv
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "end",
                    color: "#fff",
                  }}
                >
                  <ArrowUp
                    onClick={() => sortAscending()}
                    style={{ marginLeft: "10px" }}
                  />{" "}
                  <ArrowDown onClick={() => sortDesending()} />
                </SortDiv>
              </ArrowContainer>
            </Th>
            <Th>Mobile Number</Th>
            <Th>Email</Th>
            <Th>
              <ArrowContainer>
                age
                <SortDiv
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "end",
                    color: "#fff",
                  }}
                >
                  <ArrowUp
                    onClick={() => ageIncrement()}
                    style={{ marginLeft: "8px" }}
                  />{" "}
                  <ArrowDown onClick={() => ageDecrement()} />
                </SortDiv>
              </ArrowContainer>
            </Th>
            <Th>Register Date</Th>
          </tr>
        </thead>
        <tbody>
          {tableData[0] &&
            tableData.map((user, index) => {
              return (
                <Tr key={user.name}>
                  <Td>{index + 1 + (currentpage - 1) * rowperPage}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.number}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.age}</Td>
                  <Td>{user.date}</Td>
                </Tr>
              );
            })}
        </tbody>
      </Table>
      <Center>
        <Pagination>
          <PgNum onClick={() => handlePrevious()}>&laquo;</PgNum>
          <PgNum>{currentpage}</PgNum>
          <PgNum onClick={() => handleNext()}>&raquo;</PgNum>
        </Pagination>
      </Center>
    </>
  );
}

export default UsersTable;
