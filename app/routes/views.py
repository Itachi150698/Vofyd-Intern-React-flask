from flask import Blueprint, render_template

views_bp = Blueprint('views', __name__, template_folder='templates')

@views_bp.route('/signup_page')
def signup_page():
    return render_template('signup.html')

@views_bp.route('/login_page')
def login_page():
    return render_template('login.html')


@views_bp.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')
