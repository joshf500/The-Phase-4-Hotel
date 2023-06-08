from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    bookings =  db.relationship("Booking", back_populates="user")
    rooms = association_proxy("bookings","room")
    
    serialize_only = ("email", "username", "_password_hash")
    serialize_rules = ("-rooms.users", "-bookings.user")

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'


class Room(db.Model, SerializerMixin):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    price_per_night = db.Column(db.Integer)
    room_number = db.Column(db.String, unique=True, nullable=False)
    sleeps = db.Column(db.Integer)
    queen_beds = db.Column(db.Integer)
    couch_pullout_beds = db.Column(db.Integer)
    special_view = db.Column(db.String)
    image_url = db.Column(db.String)
    available = db.Column(db.Boolean)

    bookings =  db.relationship("Booking", back_populates="room")
    users = association_proxy("bookings","user")

    serialize_rules = ("-users.rooms", "-bookings.room")

    def __repr__(self):
            return f"<Room {self.room_number}, ID: {self.id}>"

class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Integer)
    people = db.Column(db.Integer)
    check_in = db.Column(db.Date)
    check_out = db.Column(db.Date)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    room_id = db.Column(db.Integer, db.ForeignKey("rooms.id"))

    user = db.relationship("User", back_populates="bookings")
    room = db.relationship("Room", back_populates="bookings")

    serialize_rules = ("-user.bookings", "-room.bookings")

    def __repr__(self):
        return f"<Booking {self.id}>"

