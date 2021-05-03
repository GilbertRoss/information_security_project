from tortoise import fields
from tortoise.models import Model 
from passlib.hash import bcrypt



class ForumUser(Model):
    id = fields.UUIDField(pk=True)
    username = fields.CharField(50, unique=True)
    password_hash = fields.TextField(pk=False)

    @classmethod
    async def get_user(cls, username):
        return cls.get(username=username)
    
    def verify_pass(self, password):
        return bcrypt.verify(password, self.password_hash)