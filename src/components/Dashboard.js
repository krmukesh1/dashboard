import { useEffect, useState } from "react";

const Dashboard = () => {
  const [record, setRecord] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [userId, setUserId] = useState(null);
  const [button, setButton] = useState();

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resposne) => resposne.json())
      .then((res) => {
        setRecord(res);
        setName(res[0].name);
        setEmail(res[0].email);
        setUsername(res[0].username);
        setWebsite(res[0].website);
        setUserId(res[0].id);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function editProduct(Id) {
    console.log("productId", record[Id - 1]);
    let item = record[Id - 1];
    setName(item.name);
    setEmail(item.email);
    setUsername(item.username);
    setWebsite(item.website);
    setUserId(item.id);
    setButton(true)
  }
  function updateUser(e) {
    e.preventDefault();
    let item = { name, email, username, website, userId };
    console.log(item, "mukesh...........");
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(item),
    })
      .then((resposne) => resposne.json())
      .then((res) => {
        console.log(res);
        getData();
        setButton(false)
      });
  }

  return (
    <div className="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Library</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>

      <div className="row ">
        {button && (
          <div className="col-lg-6 col-md-6 col-sm-12">
            <p>Edit Form</p>
            <form onSubmit={updateUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="website">Website</label>
                  <input
                    type="text"
                    className="form-control"
                    value={website}
                    id="website"
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Website"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        ) }
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">
            Check Records of Employees Related to C
          </h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Column</th>
                  <th>Record Data</th>
                  <th>Acion</th>
                </tr>
              </thead>
              <tbody>
                {record
                  .filter(
                    (data) =>
                      data.name.split(" ")[0][0] === "C" ||
                      data.name.split(" ")[0][0] === "P" ||
                      data.name.split(" ")[0][0] === "E"
                  )
                  .slice(0, 5)
                  .map((output) => (
                    <tr key={output.id}>
                      <td>{output.id}</td>
                      <td>{output.name}</td>
                      <td>{output.email}</td>
                      <td>{output.username}</td>
                      <td>{output.website}</td>
                      <td>
                        <i
                          className="fa fa-edit fa-1x"
                          onClick={
                            (() => editProduct(output.id))
                          }
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">
            Check Records of Employees Related to B
          </h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Column</th>
                  <th>Record Data</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {record
                  .filter(
                    (data) =>
                      data.name.split(" ")[0][0] === "K" ||
                      data.name.split(" ")[0][0] === "M"
                  )
                  .slice(0, 5)
                  .map((output) => (
                    <tr>
                      <td>{output.id}</td>
                      <td>{output.name}</td>
                      <td>{output.email}</td>
                      <td>{output.username}</td>
                      <td>{output.website}</td>
                      <td>
                        <i
                          className="fa fa-edit fa-1x"
                          onClick={() => editProduct(output.id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">All Records of Employees</h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Column</th>
                  <th>Record Data</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {record.map((output) => (
                  <tr>
                    <td>{output.id}</td>
                    <td>{output.name}</td>
                    <td>{output.email}</td>
                    <td>{output.username}</td>
                    <td>{output.website}</td>
                    <td>
                      <i
                        className="fa fa-edit fa-1x"
                        onClick={() => editProduct(output.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
