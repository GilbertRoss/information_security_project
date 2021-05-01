
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

threads = [
     {
    "title": "How to hack this lol?",
    "numberComments": "2",
    "date": "Sat, 01 May 2021 19:38:20 GMT",
    "threadId": "1",
    "nameAvatar": "Sadman Bhuiyan",
    "urlAvatar": "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
    },
    {
    "title": "How to hack this lol?",
    "numberComments": "2",
    "date": "Sat, 01 May 2021 19:38:20 GMT",
    "threadId": "2",
    "nameAvatar": "Sadman Bhuiyan",
    "urlAvatar": "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
    },
     {
    "title": "How to hack this lol?",
    "numberComments": "2",
    "date": "Sat, 01 May 2021 21:38:20 GMT",
    "threadId": "3",
    "nameAvatar": "Sadman Bhuiyan",
    "urlAvatar": "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
    },
     {
    "title": "How to hack this lol?",
    "numberComments": "4",
    "date": "Sat, 01 May 2021 19:38:20 GMT",
    "threadId": "3",
    "nameAvatar": "Sadman Bhuiyan",
    "urlAvatar": "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
    }
]


@app.get("/threads", tags=["threads"])
async def get_threads() -> dict:
    return { "data": threads }