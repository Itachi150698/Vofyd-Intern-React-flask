from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.app import db, bcrypt
from app.models import Organization, User

admin_bp = Blueprint("admin", __name__)


# Add Admin User
@admin_bp.route("/add_user", methods=["POST"])
@login_required
def add_user():
    if current_user.role != "Super Admin":
        return jsonify({"message": "Unauthorized"}), 403

    data = request.json
    organization = Organization.query.get(current_user.organization_id)
    if not organization:
        return jsonify({"message": "Organization not found"}), 404

    existing_user = User.query.filter_by(
        email=data["email"], organization_id=current_user.organization_id
    ).first()

    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    new_user = User(
        full_name=data["full_name"],
        username=data["username"],
        email=data["email"],
        phone_number=data["phone_number"],
        # organization_name=organization_name,  # Ensure this is set
        organization_id=current_user.organization_id,
        password_hash=hashed_password,
        role="Admin",
        status=data.get("status", "Active"),
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Admin User added successfully"}), 201


# List All Users (Super Admin should only see their organization's users)
@admin_bp.route("/list_users", methods=["GET"])
@login_required
def list_users():

    # Fetch only users belonging to the current Super Admin's organization
    users = User.query.filter_by(
        role="Admin", organization_id=current_user.organization_id
    ).all()

    user_list = [
        {
            "id": user.id,
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number,
            "role": user.role,
            "status": user.status,
        }
        for user in users
    ]
    return jsonify({"users": user_list}), 200


# Update Admin User
@admin_bp.route("/update_user/<int:user_id>", methods=["PUT"])
@login_required
def update_user(user_id):
    if current_user.role != "Super Admin":
        return jsonify({"message": "Unauthorized"}), 403

    user = User.query.get(user_id)

    if not user:
        print(f"User with ID {user_id} not found.")  # Debug log
        return jsonify({"message": "User not found"}), 404

    data = request.json

    user.full_name = data.get("full_name", user.full_name)
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.phone_number = data.get("phone_number", user.phone_number)
    user.status = data.get("status", user.status)

    db.session.commit()

    return jsonify({"message": "Admin user updated successfully"}), 200


@admin_bp.route("/delete_user/<int:user_id>", methods=["DELETE"])
@login_required
def delete_user(user_id):
    if current_user.role != "Super Admin":
        return jsonify({"message": "Unauthorized"}), 403

    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    if user.role != "Admin":
        return jsonify({"message": "Super Admin can only delete Admin users"}), 403

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "Admin user deleted successfully"}), 200


# View Super Admin Details
@admin_bp.route("/super_admin", methods=["GET"])
@login_required
def view_super_admin():
    if current_user.role != "Super Admin":
        return jsonify({"message": "Unauthorized"}), 403

    # Access the organization details through organization_id
    organization = Organization.query.get(current_user.organization_id)

    return (
        jsonify(
            {
                "id": current_user.id,
                "full_name": current_user.full_name,
                "username": current_user.username,
                "email": current_user.email,
                "phone_number": current_user.phone_number,
                "organization_name": (
                    organization.organization_name if organization else None
                ),
                "organization_id": current_user.organization_id,
                "role": current_user.role,
                "status": current_user.status,
            }
        ),
        200,
    )
