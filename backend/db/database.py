import os.path
import subprocess
import sqlite3


class DatabaseLoader(object): 

    def create_database(self):
        subprocess.Popen("sqlite3 products.db \"VACUUM;\"", shell=True, stdout=subprocess.PIPE).stdout.read()

    def create_table(self):
        if not os.path.exists('products.db'):
            self.create_database()
        connection = sqlite3.connect('products.db')
        cursor = connection.cursor()
        table = """
        CREATE TABLE IF NOT EXISTS PRODUCT (
        ID INTEGER PRIMARY KEY,
        NAME TEXT NOT NULL, 
        STATUS TEXT NOT NULL, 
        PRICE INTEGER,
        CONSTRAINT name_unique UNIQUE(name)
        );
        """
        cursor.execute(table)
        connection.close()
        

    def load_data(self):
        connection = sqlite3.connect('products.db')
        cursor = connection.cursor()
        with open('backend/db/data.sql', 'r') as data_file:
            content = data_file.read()
            cursor.executescript(content)
            connection.close()
