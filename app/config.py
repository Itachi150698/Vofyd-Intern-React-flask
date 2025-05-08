import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", os.urandom(24).hex())
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root@localhost/user_management"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
