import os
import psycopg2
from flask import Flask, render_template
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

app = Flask(__name__)

@app.route('/')
def index():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute('''
        SELECT caption, sentimento1, sentimento, categorias1, categorias
        FROM media
        WHERE sentimento IS NOT NULL
        ORDER BY id DESC
        LIMIT 100
    ''')
    posts = [
        {
            'caption': row[0],
            'sentimento1': row[1],
            'sentimento': row[2],
            'categorias1': row[3],
            'categorias': row[4],
        }
        for row in cur.fetchall()
    ]
    cur.close()
    conn.close()
    return render_template('index.html', posts=posts)

if __name__ == '__main__':
    app.run(debug=True)
