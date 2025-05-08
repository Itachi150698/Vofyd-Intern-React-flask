from sqlalchemy import UniqueConstraint, ForeignKey
from app.app import db
from flask_login import UserMixin
import uuid


# Organization Model
class Organization(db.Model):
    __tablename__ = "organizations"
    organization_id = db.Column(
        db.String(50), primary_key=True, unique=True, default=lambda: str(uuid.uuid4())
    )
    organization_name = db.Column(db.String(100), nullable=False, unique=True)
    contact_email = db.Column(db.String(100), unique=True, nullable=False)
    contact_phone = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(50), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    country = db.Column(db.String(50), nullable=True)
    website = db.Column(db.String(100), nullable=True)

    # One-to-Many Relationship with User
    users = db.relationship(
        "User", backref="organization", lazy=True, cascade="all, delete"
    )

    def __repr__(self):
        return f"<Organization {self.organization_name}>"


# User Model
class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    organization_id = db.Column(
        db.String(50), ForeignKey("organizations.organization_id"), nullable=False
    )  # Updated ForeignKey
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(
        db.String(20), nullable=False, default="Super Admin"
    )  # Super Admin or Admin
    status = db.Column(db.String(10), default="Active")  # Active or Inactive

    def __repr__(self):
        return f"<User {self.username} - {self.role}>"

    def get_id(self):
        return self.id


# Branch Model (Linked to Organization)
class Branch(db.Model):
    __tablename__ = "branches"
    branch_id = db.Column(
        db.String(50), primary_key=True, unique=True, default=lambda: str(uuid.uuid4())
    )
    organization_id = db.Column(
        db.String(50), ForeignKey("organizations.organization_id"), nullable=False
    )
    branch_name = db.Column(db.String(100), nullable=False)
    branch_location = db.Column(db.String(255), nullable=False)
    person_in_charge = db.Column(db.String(100), nullable=False)
    contact_email = db.Column(db.String(100), unique=True, nullable=False)
    contact_phone = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Branch {self.branch_name}>"
