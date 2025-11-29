from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):#db.Model ile SQLAlchemy modelini tanımlar ve Task adında bir tablo oluşturur veritabanında
    id  = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f""