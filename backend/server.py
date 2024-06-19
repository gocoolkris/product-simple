from flask import Flask, request
from flask_cors import cross_origin
from database_connector import DatabaseConnector
from db.database import DatabaseLoader
import json
 
# Initializing flask app
app = Flask(__name__)
db_connector = DatabaseConnector()


@app.route("/setup", methods=["POST"])
@cross_origin()
def setup():
    loader = DatabaseLoader()
    loader.create_table()
    loader.load_data()
    return {"status": "success"} 

@app.route('/products', methods=["GET"])
@cross_origin()
def get_all():
    # Returning an api for showing in  reactjs
    return {"products": [json.loads(str(product)) for product in db_connector.get_all()]}
 

@app.route("/products/search", methods=["POST"])
@cross_origin()
def search():
    name, status = request.json.get('name', ''), request.json.get('status', '')
    return {"products": [json.loads(str(product)) for product in db_connector.search(name=name, status=status)]}


@app.route("/products", methods=["POST"])
@cross_origin()
def create():
    name, status, price = request.json.get('name', ''), request.json.get('status', ''), request.json.get('price', 0)
    if not name or not status:
        return "Invalid name or status", 400
    db_connector.add(name=name, status=status, price=price)
    return {"status": "success"}


@app.route("/products/<name>", methods=["PUT"])
@cross_origin()
def update(name: str):
    product = db_connector.search(name=name, status='')[0]
    status, price = request.json.get('status', product.status), request.json.get('price', product.price)
    db_connector.update(name=name, status=status, price=price)
    return {"status": "success"}

@app.route("/products/<name>", methods=["DELETE"])
@cross_origin()
def delete(name: str):
    db_connector.delete(name=name)
    return {"status": "success"}


# Running app
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)