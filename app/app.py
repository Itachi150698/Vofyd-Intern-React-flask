from flask import Flask, redirect, url_for
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

db = SQLAlchemy()
bcrypt = Bcrypt()


def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)

    CORS(
        app,
        supports_credentials=True,
        resources={
            r"/*": {
                "origins": "http://localhost:5173",
                "methods": ["GET", "POST", "DELETE", "PUT"],
                "allow_headers": ["Content-Type", "Authorization"],
            }
        },
    )

    from app.models import User

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(id)

    # Register blueprints here
    from app.routes.auth import auth_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")

    from app.routes.admin import admin_bp

    app.register_blueprint(admin_bp, url_prefix="/admin")

    from app.routes.views import views_bp

    app.register_blueprint(views_bp, url_prefix="/views")

    @app.route("/")
    def home():
        return redirect(url_for("views.login_page"))

    migrate = Migrate(app, db)

    return app
