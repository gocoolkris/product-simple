import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import apiClient from "./http-common";

function App() {
  

  const search_name = useRef(null);
  const search_status = useRef(null);

  const post_name = useRef(null);
  const post_status = useRef(null);
  const post_price = useRef(null);

  const put_name = useRef(null);
  const put_status = useRef(null);
  const put_price = useRef(null);

  const delete_name = useRef(null);

  const [loadResult, setLoadResult] = useState(null);
  const [getResult, setGetResult] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [putResult, setPutResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function loadData() {
    try {
      const res = await apiClient.post("/setup", {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173'
        }
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setLoadResult(fortmatResponse(result.data));
    } catch (err) {
      setLoadResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function getAllData() {
    try {
      const res = await apiClient.get("/products", {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173'
        }
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setGetResult(fortmatResponse(result.data));
    } catch (err) {
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function searchData() {
    const searchData = {
      name: search_name.current.value,
      status: search_status.current.value,
    };

    try {
      const res = await apiClient.post("/products/search", searchData,);

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setSearchResult(fortmatResponse(result.data));
      console.log(result);
    } catch (err) {
      setSearchResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function postData() {
    const postData = {
      name: post_name.current.value,
      status: post_status.current.value,
      price: post_price.current.value
    };

    try {
      const res = await apiClient.post("/products", postData,);

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(fortmatResponse(err.response?.data || err));
    }
  }

  async function putData() {
    const name = put_name.current.value;

    if (name) {
      const putData = {
        status: put_status.current.value,
        price: put_price.current.value,
      };

      try {
        const res = await apiClient.put(`/products/${name}`, putData,);

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  async function deleteDataByName() {
    const name = delete_name.current.value;

    if (name) {
      try {
        const res = await apiClient.delete(`/products/${name}`);

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setDeleteResult(fortmatResponse(result));
      } catch (err) {
        setDeleteResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
    setSearchResult(null);
  };


  const clearPostOutput = () => {
    setPostResult(null);
  };

  const clearPutOutput = () => {
    setPutResult(null);
  };

  const clearDeleteOutput = () => {
    setDeleteResult(null);
  };

  const clearLoadOutput = () => {
    setLoadResult(null);
  };

  return (
    <>
      <div className="loaddata">
        <h3 className="getall-header">LoadData Area</h3>
        <div>
          <button className="btn btn-sm btn-primary" onClick={loadData}>LoadData</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearLoadOutput}>Clear</button>
        </div>
        { loadResult && <div className="getall-display-area" role="alert"><pre>{loadResult}</pre></div> }
      </div>

      <div className="product-all">
        <h3 className="getall-header">Product GetAll/Search Area</h3>
        <div className="getall-body">
          <div className="getall-display">
            <div>
            <button className="btn btn-sm btn-primary" onClick={getAllData}>Get All</button>
            </div>
            <input type="text" ref={search_name} className="form-control ml-2" placeholder="Name" />
            <input type="text" ref={search_status} className="form-control ml-2" placeholder="Status" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={searchData}>Get by Name and/or Status</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>
          </div>   
          
          { getResult && <div className="getall-display-area" role="alert"><pre>{getResult}</pre></div> }
          { searchResult && <div className="search-display-area" role="alert"><pre>{searchResult}</pre></div> }
        </div>
      </div>

      <div className="product-create">
        <h3 className="create-header">Product Create Area</h3>
        <div className="create-body">
          <div className="create-display">
            <input type="text" ref={post_name} className="form-control ml-2" placeholder="Name" />
            <input type="text" ref={post_status} className="form-control ml-2" placeholder="Status" />
            <input type="text" ref={post_price} className="form-control ml-2" placeholder="Price" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={postData}>Create</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>
          </div>   
          
          { postResult && <div className="create-display-area" role="alert"><pre>{postResult}</pre></div> }
        
        </div>
      </div>

      <div className="product-update">
        <h3 className="update-header">Product Update Area</h3>
        <div className="update-body">
          <div className="update-display">
            <input type="text" ref={put_name} className="form-control ml-2" placeholder="Name" />
            <input type="text" ref={put_status} className="form-control ml-2" placeholder="Status" />
            <input type="text" ref={put_price} className="form-control ml-2" placeholder="Price" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={putData}>Update</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearPutOutput}>Clear</button>
          </div>   
          
          { putResult && <div className="update-display-area" role="alert"><pre>{putResult}</pre></div> }
        
        </div>
      </div>

      <div className="product-delete">
        <h3 className="delete-header">Product Delete Area</h3>
        <div className="delete-body">
          <div className="delete-display">
            <input type="text" ref={delete_name} className="form-control ml-2" placeholder="Name" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={deleteDataByName}>Delete</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearDeleteOutput}>Clear</button>
          </div>   
          
          { deleteResult && <div className="delete-display-area" role="alert"><pre>{deleteResult}</pre></div> }
        
        </div>
      </div>

    </>
  )
}

export default App
