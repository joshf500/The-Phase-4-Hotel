from sqlalchemy.ext.hybrid import hybrid_property
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin



db = SQLAlchemy()

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    image_url = db.Column(db.String)
    bio = db.Column(db.String)
    _password_hash = db.Column(db.String)

    bookings =  db.relationship("Booking", back_populates="user")
    rooms = association_proxy("bookings","room")

    serialize_rules = ("-rooms.users", "-bookings.user")

    def __repr__(self):
            return f"<User {self.username}, ID: {self.id}>"


class Room(db.Model, SerializerMixin):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    price_per_night = db.Column(db.Integer)
    room_number = db.Column(db.String, unique=True, nullable=False)
    sleeps = db.Column(db.Integer)
    beds = db.Column(db.Integer)
    view = db.Column(db.String)
    image_url = db.Column(db.String)

    bookings =  db.relationship("Booking", back_populates="room")
    users = association_proxy("bookings","user")

    serialize_rules = ("-users.rooms", "-bookings.room")

    def __repr__(self):
            return f"<Room {self.room_number}, ID: {self.id}>"

class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    room_id = db.Column(db.Integer, db.ForeignKey("rooms.id"))

    user = db.relationship("User", back_populates="bookings")
    room = db.relationship("Room", back_populates="bookings")

    serialize_rules = ("-user.bookings", "-room.bookings")

     def __repr__(self):
            return f"<Booking {self.id}>"

