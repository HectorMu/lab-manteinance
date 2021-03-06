import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
// /**
//  * @param {String} title The table title
//  * @param {Array}   data JSON array with all the table data
//  * @param {Array}  buttons JSON array with all the buttons actions, text and styles
//  * @param {Boolean} actions Boolean, determines if table actions are shown or not
//  * @param {Object} filtersConfig Object that determines the filters to show. Receives the key and text to display Example: { name: "Name"}
//  * @param {String} actionsText Text to display in actions final table column head
//  * @param {String} searchText Text to display on search input placeholder
//  * @param {String} firstColumnKey Is the table key name for each row, example: folium, number, id, etc, it depends on your json array, default value = "id"
//  * @param {Object} renameHeaders Object with the key of the headers and the value to replace. Example: { id: "Folium"}
//  * @param {String} emptyDataText Text to display where there isnt data in the table
//  * @param {Array} hideColumns Array with the name of the json columns you want to hide in table. Example: ["name","id","foreign_key"]
//  *@param {Function} refreshCallback Function to callback to refresh the table, you can provide your fetching function: default: null
//  */
const DataTable = ({
  title = "Default title",
  firstColumnKey = "id",
  data = [],
  buttons = [
    {
      key: "default1",
      text: "Default button",
      style: "btn btn-secondary mx-1 btn-sm",
      fwicon: "fas fa-question",
      click: (o) => {
        window.alert(`Default action ${o}`);
      },
    },
  ],
  actions = false,
  filtersConfig = null,
  actionsText = "Actions",
  searchText = "Searching by",
  renameHeaders = null,
  emptyDataText = "No data",
  hideColumns = [],
  refreshCallback = null,
}) => {
  const [initialData, setInitialData] = useState([]);
  const [initialFilter, setInitialFilter] = useState(firstColumnKey);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [order, setOrder] = useState("DSC");
  const [selectedCol, setSelectedCol] = useState("");

  const searchOnData = (value) => {
    if (value === "") {
      return setInitialData(data);
    }
    if (selectedFilter === initialFilter) {
      const results = data.filter((d) => d[initialFilter].toString() === value);
      if (results.length > 0) {
        setInitialData(results);
      }
      return;
    }

    const results = data.filter((d) =>
      d[selectedFilter.toLowerCase()]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    if (results.length > 0) {
      setInitialData(results);
    }
  };

  const sortData = (col) => {
    setSelectedCol(col);
    if (order === "ASC") {
      if (Number.isInteger(initialData[0][col])) {
        const sortedData = [...initialData.sort((fe, se) => fe[col] - se[col])];
        setInitialData(sortedData);
        setOrder("DSC");
        return;
      }
      const sortedData = [
        ...initialData.sort((fe, se) =>
          fe[col].toString().toLowerCase() > se[col].toString().toLowerCase()
            ? 1
            : -1
        ),
      ];
      setInitialData(sortedData);
      setOrder("DSC");
    }
    if (order === "DSC") {
      if (Number.isInteger(initialData[0][col])) {
        const sortedData = [...initialData.sort((fe, se) => se[col] - fe[col])];
        setInitialData(sortedData);
        setOrder("ASC");
        return;
      }
      const sortedData = [
        ...initialData.sort((fe, se) =>
          fe[col].toString().toLowerCase() < se[col].toString().toLowerCase()
            ? 1
            : -1
        ),
      ];

      setInitialData(sortedData);
      setOrder("ASC");
    }
  };

  useEffect(() => {
    if (initialData.length > 0) {
      setInitialFilter(Object.keys(initialData[0])[0]);
    }
  }, [initialData]);

  useEffect(() => {
    setInitialData(data);
  }, [data]);
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex justify-content-between d-sm-flex flex-column flex-lg-row flex-md-row flex-xl-row">
        <h6 className="m-0 font-weight-bold text-primary text-center">
          {title}
        </h6>
        <div className="d-flex mt-3 mt-lg-0 mt-md-0 mt-xl-0">
          {refreshCallback !== null ? (
            <button
              onClick={async () => refreshCallback()}
              type="button"
              className="btn btn-sm"
            >
              <i className="fas fa-sync text-primary"></i>
            </button>
          ) : null}

          <div className="btn-group dropleft">
            <Dropdown>
              <Dropdown.Toggle
                variant="primary"
                className="bg-white border-0 me-3"
                id="xd"
              >
                <i className="fas fa-sliders-h text-primary"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {initialData !== undefined && initialData.length > 0
                  ? filtersConfig !== null
                    ? Object.entries(filtersConfig).map(([key, value]) => (
                        <Dropdown.Item
                          key={key}
                          type="button"
                          onClick={() => setSelectedFilter(key)}
                          className={`dropdown-item rounded ${
                            selectedFilter === key
                              ? `text-primary font-weight-bolder`
                              : `${selectedFilter === "None" ? "" : ""}`
                          }${hideColumns.includes(key) ? `d-none` : ``} `}
                        >
                          {value}
                        </Dropdown.Item>
                      ))
                    : Object.keys(initialData[0]).map((key) =>
                        renameHeaders !== null &&
                        Object.keys(renameHeaders).includes(key) ? (
                          <Dropdown.Item
                            key={key}
                            onClick={() => setSelectedFilter(key)}
                            type="button"
                            className={`dropdown-item rounded ${
                              selectedFilter === key
                                ? `text-primary fw-bold`
                                : `${selectedFilter === "None" ? "" : ""}`
                            }${hideColumns.includes(key) ? `d-none` : ``} `}
                          >
                            {renameHeaders[key]}
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            key={key}
                            onClick={() => setSelectedFilter(key)}
                            type="button"
                            className={`dropdown-item rounded ${
                              selectedFilter === key
                                ? `text-primary fw-bold`
                                : `${selectedFilter === "None" ? "" : ""}`
                            }${hideColumns.includes(key) ? `d-none` : ``} `}
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Dropdown.Item>
                        )
                      )
                  : null}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control border-0 small"
              placeholder={`${searchText} ${
                renameHeaders !== null &&
                Object.keys(renameHeaders).includes(selectedFilter)
                  ? renameHeaders[selectedFilter].toLowerCase()
                  : selectedFilter
              }`}
              onChange={(e) => searchOnData(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary btn-sm" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-hover"
            id={`dataTable${title.replace(" ", "-")}`}
            cellSpacing={0}
          >
            <thead>
              {initialData !== undefined && initialData.length > 0 ? (
                <tr key={initialData[0].id}>
                  {Object.keys(initialData[0]).map((e) =>
                    renameHeaders !== null &&
                    Object.keys(renameHeaders).includes(e) ? (
                      <th
                        key={e}
                        className={`${
                          selectedFilter.toLowerCase() === e
                            ? `text-primary text-uppercase `
                            : ``
                        }${
                          hideColumns.length > 0 && hideColumns.includes(e)
                            ? `d-none`
                            : ``
                        }`}
                      >
                        <div className="d-flex">
                          {renameHeaders[e]}{" "}
                          <button
                            onClick={() => sortData(e)}
                            className="btn  btn-sm btn-link mx-1 y border-0 text-primary px-1 py-0"
                          >
                            {selectedCol !== "" &&
                            order === "ASC" &&
                            selectedCol === e ? (
                              <i className="fas fa-sort-up "></i>
                            ) : (
                              <i className="fas fa-sort-down "></i>
                            )}
                          </button>
                        </div>
                      </th>
                    ) : (
                      <th
                        key={e}
                        className={`${
                          selectedFilter.toLowerCase() === e
                            ? `text-primary text-uppercase`
                            : ``
                        }${
                          hideColumns.length > 0 && hideColumns.includes(e)
                            ? `d-none`
                            : ``
                        }`}
                      >
                        <div className="d-flex">
                          {e.charAt(0).toUpperCase() + e.slice(1)}{" "}
                          <button
                            onClick={() => sortData(e)}
                            className="btn btn-sm btn-link mx-1 text-primary border-0 px-1 py-0"
                          >
                            {selectedCol !== "" &&
                            order === "ASC" &&
                            selectedCol === e ? (
                              <i className="fas fa-sort-up "></i>
                            ) : (
                              <i className="fas fa-sort-down "></i>
                            )}
                          </button>
                        </div>
                      </th>
                    )
                  )}
                  {actions === true ? <th>{actionsText}</th> : null}
                </tr>
              ) : (
                <tr>
                  <th>{emptyDataText}</th>
                </tr>
              )}
            </thead>
            <tbody>
              {initialData !== undefined && initialData.length > 0 ? (
                initialData.map((d) => (
                  <tr key={d.id}>
                    {Object.entries(d).map(([k, e]) => (
                      <td
                        className={`${
                          hideColumns.length > 0 && hideColumns.includes(k)
                            ? `d-none `
                            : ``
                        }`}
                        key={k}
                      >
                        {e}
                      </td>
                    ))}
                    {actions === true ? (
                      <td className="d-flex d-sm-flex flex-sm-column flex-column flex-lg-row flex-md-row flex-xl-row">
                        {buttons.map((b) => (
                          <button
                            key={b.key}
                            className={b.style}
                            onClick={() => b.click(d)}
                          >
                            <i className={b.fwicon}></i> {b.text}
                          </button>
                        ))}
                      </td>
                    ) : null}
                  </tr>
                ))
              ) : (
                <tr>
                  <td>{emptyDataText}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
