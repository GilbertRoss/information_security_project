import psycopg2
import psycopg2.extras
import json
import re

async def query_POST(query, data):
    try: 
        conn = psycopg2.connect("dbname='forum' user='admin' host='db' password='un!bz1nf0S3c'")
        print('connected to db')
    except Exception as e:
        print(e)

    cur = conn.cursor()
    try:
        cur.execute(query, data)
        print('query executed')
    except Exception as e:
        print("Error in executing query")
        print(e)

    conn.commit()
    cur.close()
    conn.close()



async def query_GET(query, data):
    try: 
        conn = psycopg2.connect("dbname='forum' user='admin' host='db' password='un!bz1nf0S3c'")
        print('connected to db')
    except Exception as e:
        print(e)
        return {"message": "error in excuting query"}

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        cur.execute(query, data)
        print(query)
        rows = cur.fetchall()
        print(rows)
        print('query executed')
    except Exception as e:
        print("Error in executing query")
        print(e)
        return {"message": "error in executing query"}

    conn.commit()
    cur.close()
    conn.close()

    if(len(rows) < 1):
        return None
    
    return rows

