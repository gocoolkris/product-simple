import sqlite3
from typing import List
import json

class Product(object):

    def __init__(self, name: str, status: str, price: int):
        self.name = name
        self.status = status
        self.price = price


    name: str
    status: str
    price: int

    def __str__(self) -> str:
        return json.dumps({"name": self.name, "status": self.status, "price": self.price})
    
    def toJSON(self):
        return json.dumps({"name": self.name, "status": self.status, "price": self.price})

                
    def is_available(self) -> bool:
        return self.status == "Available"

class DatabaseConnector(object):
        

    def get_all(self):
        connection = sqlite3.connect("products.db")
        results = connection.cursor().execute("SELECT * FROM PRODUCT").fetchall()
        products = []
        for result in results:
            product = Product(result[1], result[2], result[3])
            products.append(product)
        connection.close()
        return products
    
    
    def search(self, name: str, status: str):
        connection = sqlite3.connect("products.db")
        if not name and not status:
            return self.get_all()
        elif not name:
            query_str = f"SELECT * FROM PRODUCT where status='{status}'".format(status=status)
        elif not status:
            query_str = f"SELECT * FROM PRODUCT where name='{name}'".format(name=name)
        else:
            query_str = f"SELECT * FROM PRODUCT where name='{name}' and status='{status}'".format(name=name, status=status)
        results = connection.execute(query_str).fetchall()
        products = []
        if results:
            for result in results:
                product = Product(result[1], result[2], result[3])
                products.append(product)
        connection.close()
        return products
    
    def add(self, name: str, status: str, price: int):
        add_str = f"INSERT INTO product(name, status, price) VALUES('{name}', '{status}', '{price}')".format(name=name, status=status, price=price)
        connection = sqlite3.connect("products.db")
        connection.cursor().execute(add_str)
        connection.commit()
        connection.close()
        

    
    def update(self, name: str, status: str, price: int):
        connection = sqlite3.connect("products.db")
        update_str = f"UPDATE PRODUCT SET status='{status}', price='{price}' WHERE name='{name}';".format(name=name, status=status, price=price)
        connection.cursor().execute(update_str)
        connection.commit()
        connection.close()
    

    def delete(self, name: str):
        connection = sqlite3.connect("products.db")
        delete_str = f"DELETE FROM PRODUCT WHERE NAME='{name}'".format(name=name)
        connection.cursor().execute(delete_str)
        connection.commit()
        connection.close()
                



