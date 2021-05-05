
from fastapi import FastAPI, Depends, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
import jwt
import datetime
from pydantic import BaseModel
from db_models import ForumUser, Threads
from passlib.hash import bcrypt




app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:8080",
    "localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



class LoginModel(BaseModel):
    username: str
    password: str

register_tortoise(
    app,
    db_url = 'postgres://admin:un!bz1nf0S3c@db:5432/forum',
    modules ={'models': ['db_models']},
    generate_schemas = True,
    add_exception_handlers = True,
    )

User_Pydantic =  pydantic_model_creator(ForumUser, name='User')
UserIn_Pydantic = pydantic_model_creator(ForumUser, name='UserIn', exclude_readonly=True)
Thread_Pydantic = pydantic_model_creator(Threads, name="Thread")
ThreadIn_Pydantic = pydantic_model_creator(Threads, name="ThreadIn", exclude_readonly=True)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')




async def authentiate_user(username: str, password:str):
    user = await ForumUser.get(username = username)
    if not user:
        return False
    if not user.verify_pass(password):
        return False
    return user

@app.get("/threads", tags=["threads"])
async def get_threads() -> dict:
    threads = await Threads.all()
    print(threads)
    return { "data": threads }

@app.post('/token')
async def generate_token(data: LoginModel, response: Response):
    user = await authentiate_user(data.username, data.password)

    if not user:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return {'error' : 'invalid credentials'}
    user_obj = await User_Pydantic.from_tortoise_orm(user)
    user_obj = {"exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30), 'username': user_obj.username, 'password_hash': user_obj.password_hash}
    token = jwt.encode(user_obj, 'un1bzinfoS3c')

    response.set_cookie(key='auth', value= token, max_age=1800, httponly=False, expires=1800)
    response.status_code = status.HTTP_200_OK

    return {'access_token': token , 'token_type' : 'bearer' }


@app.post('/createthread', response_model=Thread_Pydantic)
async def create_thread(thread:ThreadIn_Pydantic, response: Response):
    thread_obj = Threads(title=thread.title, username_id=thread.username_id)
    await thread_obj.save()

    return response.status_code

@app.post('/users', response_model=User_Pydantic)
async def create_user(user:UserIn_Pydantic, response: Response):
    user_obj = ForumUser(username=user.username, password_hash=bcrypt.hash(user.password_hash))
    await user_obj.save()
    
    return response.status_code