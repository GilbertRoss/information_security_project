
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
from tortoise import fields
from tortoise.models import Model 
from db_query import query_POST, query_GET
import uuid






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

class ForumUserNew(BaseModel): 
    username: str
    password_hash: str

class CreateThreadModel(BaseModel):
    title: str
    user_id: str
    text: str

class CreatePostModel(BaseModel):
    post_text: str
    user_id: str






oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')


def verify_pass(user, password):
        return bcrypt.verify(password, user['password_hash'])

async def authentiate_user(username: str, password:str):
    query = "SELECT * FROM forumuser where username = " + "'" + username + "'"
    #select * from forumuser WHERE username = 'chiara'
    user = await query_GET(query)

    if not user:
        return False
    if not verify_pass(user[0], password):
        return False
    return user[0]

@app.get("/threads")
async def get_threads() -> dict:
    query = "SELECT threads.thread_id, threads.title, threads.date, forumuser.username FROM threads, forumuser WHERE threads.user_id = forumuser.user_id"
    threads = await query_GET(query)
    print(threads)
    json_output = []
    for thread in threads:
        json_output.append({"id": thread['thread_id'], "title": thread['title'], "date": str(thread['date']), "username": thread['username']})    

    #threads = await Threads.all().select_related("username_id")
    return { "data": threads }

@app.get("/posts")
async def get_threads() -> dict:
    query = "SELECT posts.post_id,posts.date, posts.post_text, forumuser.username, threads.title FROM posts ,forumuser, threads WHERE  posts.user_id = forumuser.user_id AND posts.thread_id = threads.thread_id"
    posts = await query_GET(query)
    
    print(posts)
    json_output = []
    for post in posts:
        json_output.append({"id": post['post_id'], "title": post['title'], "date": str(post['date']), "username": post['username'], "post_text": post['post_text']})    

    #threads = await Threads.all().select_related("username_id")
    return { "data": json_output }

@app.post('/token')
async def generate_token(data: LoginModel, response: Response):
    user = await authentiate_user(data.username, data.password)

    if not user:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return {'error' : 'invalid credentials'}
    
    user_obj = {"exp": datetime.datetime.now() + datetime.timedelta(minutes=30), 'username': user['username'], 'password_hash': user['password_hash'], 'id':user['user_id']}
    token = jwt.encode(user_obj, 'un1bzinfoS3c')

    response.set_cookie(key='auth', value= token, max_age=1800, httponly=False, expires=1800)
    response.status_code = status.HTTP_200_OK

    return {'access_token': token , 'token_type' : 'bearer' }


@app.post('/createthread', response_model=CreateThreadModel)
async def create_thread(thread:CreateThreadModel, response: Response):
    date =  str(datetime.datetime.now())
    query_insert_thread = "INSERT INTO threads (thread_id, title, date,user_id) values (" + "'" + str(uuid.uuid4()) + "'," + "'" + thread.title +"'" + "," + "'" + date + "'" + "," + "'" + thread.user_id + "'" + ")"
    query_get_threadID = "SELECT thread_id FROM threads where title = " + "'" + thread.title + "'"
    print("outside try")

    try:
        thread_obj = await query_POST(query_insert_thread)
        thread_id = await query_GET(query_get_threadID)
        query_insert_post = "INSERT INTO posts (post_id, post_text, date, thread_id, user_id) values (" + "'" + str(uuid.uuid4()) + "'," + "'" + thread.text +"'" + "," + "'" + date + "'" + "," + "'" + thread_id[0]['thread_id'] + "'," + "'" + thread.user_id + "')"
        post_obj = await query_POST(query_insert_post)
    except Exception as e:
        print(e)

    return thread_obj

@app.post('/createpost', response_model=CreatePostModel)
async def create_post(post:CreatePostModel, response: Response):
        date =  str(datetime.datetime.now())
        query = "INSERT INTO posts (post_id, post_text, date, thread_id, user_id) values (" + "'" + str(uuid.uuid4()) + "'," + "'" + post.text +"'" + "," + "'" + date + "'" + "," + "'" + post.thread_id + "'" + ")"




        return


@app.post('/users', response_model=ForumUserNew)
async def create_user(user:ForumUserNew, response: Response):

    hashed_password = bcrypt.hash(user.password_hash)


    print(hashed_password + " " + user.password_hash)

    query = ("INSERT INTO forumuser (user_id, username, password_hash) VALUES (" + "'" + str(uuid.uuid4()) + "'," + "'" + user.username +"'" + "," + "'" + hashed_password + "'" + ")")

    try: 
        response = await query_POST(query)
    except:
        response = {"message": "some type of error"}

    return response

