from app import app, db, flask_login, login_manager
from app.models.User import User
from app.utils import password
from flask import request, abort, json, session

#does this one do anything?
@login_manager.request_loader
def load_from_request(request):
    token = request.headers.get('token')
    if token:
        return token


@login_manager.token_loader
def load_token(token):

    print "load_token token: " + token
    #Find the User
    data = token
    user = User.get(data)

    return user
 
    #Check Password and return user or None
    #if user and data[1] == user.password:
    #    return user
    #return None

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

login_manager.login_view = "app.login"


#-------------------------------temp
@app.route('/api/protected', methods=["GET"])
@flask_login.login_required
def protected():
    return 'Logged in as: ' + flask_login.current_user.email

@app.route("/api/user/create", methods=["POST"])
def createUser():
    try:
        newUser = User(request.get_json())
        db.session.add(newUser)
        db.session.commit()
        return json.jsonify({"userid": str(newUser.id)})
    except Exception, e:
        return json.jsonify({"errorMessage" : "Could not create user: %s" % (e)}), 500

@app.route("/api/user/<int:userId>", methods=["GET"])
def getUser(userId):
    user = User.query.filter_by(id=userId).first()
    if not user:
        return json.jsonify({"errorMessage" : "No matching user found"}), 422
    else:
        return json.jsonify(user.toDict())

@app.route("/api/user/<int:userId>/verify/<activationCode>", methods=["GET"])
def verifyUser(userId, activationCode):
    user = User.query.filter_by(id=userId).first()
    if not user:
        return json.jsonify({
                "verified" : False,
                "errorMessage" : "No matching user found"
                }), 422
    else:
        if user.verification == activationCode:
            user.verified = True
            try:
                db.session.commit()
                return json.jsonify({"verified" : True,
                                         "email": user.email})
            except e:
                return json.jsonify({
                    "verified" : False,
                    "errorMessage" : "Could not verify user"
                    }), 500
        else:
            return json.jsonify({
                    "verified": False,
                    "errorMessage": "Invalid activation code"
                    }), 403

@app.route("/api/user/<int:userId>/completeSignup", methods=["POST"])
def completeSignup(userId):
    user = User.query.filter_by(id=userId).first()
    if not user:
        return json.jsonify({
                "errorMessage" : "No matching user found"
                }), 422
    else:
        userInfo = request.get_json()
        user.forename = userInfo['forename']
        user.surname = userInfo['surname']
        user.password = password.hashPassword(userInfo['password'])
        user.number = userInfo['number']
        try:
            db.session.commit()
            return json.jsonify(user.toDict())
        except Exception, e:
            return json.jsonify({
                "errorMessge" : "Could not complete signup",
                "error": e
                }), 500



@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        pw = data['password'] 
        user = User.query.filter_by(email=email).first()

        if not user:
            return json.jsonify({
                "errorMessage" : "No such user"
                }), 422

        if not password.checkPassword(user.password, pw):
            return json.jsonify({
                "errorMessage" : "Incorrect password"
                }), 403

        flask_login.login_user(user)

        return getUser(user.id)

@app.route('/api/logout')
def logout():
    # remove the username from the session if it's there
    flask_login.logout_user()
    return redirect(url_for('index'))

@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized'

