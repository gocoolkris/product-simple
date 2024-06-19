# Demo Project
This project is mainly written in python in the backend and React in the front end. It is mainly a _Products_ database with a ability add, search, update, and delete records from database.

## Stack
It uses the following stack
* python along with sqlite3, flask for the backend.
* React with _axios_ for making RESTful API calls to the backend.
* Additional helper scripts to create and load dummy data.

## Getting started

### Install dependencies
* Make sure to install python dependencies
```python
pip install flask flask-cors
```
* Make sure to install npm dependencies
```node
npm install axios
```

### Start services/server.
* On one terminal, you can start the backend flask server using `python3 backend/server.py`. It should start the flask server on port 5000 listening on all local network interfaces.
* On another terminal, you can start the React bundle frontend server (vite) using `npm install && npm run dev`.


### Load Test Data
* This can be achieved by simply clicking `LoadData` button, once you're able to reach `http://localhost:5173`.


### Overview of the page
Please refer to `assets/preview.png` to see how the page would look like. The page contains

* `LoadData` - used to load the sample data located in `backend/db/data.sql`
* `Product GetAll/Search Area` - used to search for records.
* `Product Create Area` - to create new records.
* `Product Update Area` - to update existing records.
* `Product Delete Area` - delete records.
