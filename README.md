# public-issue-reporting-portal
A production-ready Public Issue Reporting Portal built with a microservices architecture, enabling citizens to report and track civic issues while providing municipal administrators with secure workflows to review, manage, and resolve them efficiently.

Import packages

↓

Load environment variables

↓

Create app

↓

Register middleware

↓

Register routes

↓

Error handling middleware

↓

Start server


JSON Text

↓

express.json()

↓

JavaScript Object

↓

req.body

### connect to postgresql
Express App
      │
      ▼
database.js
      │
      ▼
PostgreSQL

## pool   it keeps a pool of reusable connections.
Pool

Connection 1

Connection 2

Connection 3

Connection 4

The actual connection is opened when you execute your first query, for example:

await pool.query("SELECT NOW()");

At that moment, pg:

Reads the configuration
Opens a TCP connection to PostgreSQL
Authenticates with the username and password
Executes the SQL query
Returns the result
Keeps the connection in the pool for reuse


1. created the server file 
2. connected the db in server file and pool in database file 
3. create an auth route register .This file only defines which endpoint calls which controller.
4. auth.controller  :The controller communicates with the client. it recideves req,extratcts data from req ,calles service , sends response  think it of manager 
client=> route-> controller->service->db-> controler(sends res)
5. login and jwt authentication implemented 
  create route login and contrlller which calls loginUser function in service file , that wull validate it . and controller will give back to answer 

6. all queries are in migration folder 

7. implement protected route so that server will verify the jwt  and person who is accessing the resources 
8. implement refresh token  create refresh token table ref migrations  
9. refresh token api : endpoint is called when access token has expired 

Login
   │
   ▼
Access Token (15 min)
Refresh Token (7 days)

↓

Access Token Expires

↓

POST /api/v1/auth/refresh

↓

Verify Refresh Token

↓

Generate New Access Token

↓

Return New Access Token

                 LOGIN REQUEST
                       │
                       ▼
             auth.routes.js
                       │
                       ▼
          auth.controller.js
                       │
                       ▼
            auth.service.js
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
   PostgreSQL                 JWT Library
          │                         │
          └────────────┬────────────┘
                       ▼
              Response to Client

  
  The server already knows who the user is.

There is no need to look in the database

# access token 
Client

↓

Access Token

↓

Every API Request

↓

jwt.verify()

↓

No Database



# refresh token 
  Client

↓

Refresh Token

↓

/refresh

↓

jwt.verify()

↓

Database Check

↓

Generate New Access Token


# real world  example 
Entering the Building (Login)
   You arrive at the reception.  receptionist asks  email ,pwd  , you  gave  , recptionsist checks db  if he finds he will  allow inside else not 
   now 
   # Security gives you TWO cards
     emp id card  (access token ) name ,em id , dept ,time 
     hr master card  (refresh token ) id , expires 7 days 

      to enter room  guard will look at your emp id if valid he will allow hr donot need  master card , 

      if card expeired ( verify ) then he checks is pass geniuine  (master card ) , does it exist in db then  call /refresh api   gererate new emp id card 

      on logout it completely destroyed the refresh token  hr card you  are removed from system .




ession-Based Authentication
Step 1: Login

You go to reception.

Email

Password

Reception verifies you.

Step 2: Reception creates a record

Instead of giving you a JWT, reception creates a record.

Session Database

----------------------------------

Session ID : abc123

User ID : 17

Expires : 6 PM

This record is stored on the server.

Step 3: You receive only a Session ID

The receptionist gives you a small slip:

Session ID

abc123

Usually it's stored in a browser cookie.

Step 4: Every request

You go to another room.

You show:

Session ID

abc123

Security cannot trust this slip alone.






#-------------------------------------------------------------------------------------------------------------------------
RBAC created  roles table  
insert default values 
create user roles table 

User Registers
      │
      ▼
Insert into users
      │
      ▼
Get user.id
      │
      ▼
Find "Citizen" role
      │
      ▼
Insert into user_roles
      │
      ▼
Registration Complete

 we used the client indtead of pool  so that all operation comes indide one tarnction with commit and rollback  properties 

 # authorization  middleware   
  before genrating token in login   fetch the roles  then gerate the token with ri\ole as well 
# after  RBAC 
  Client
   │
   ▼
Access Token
   │
   ▼
Authenticate Middleware who are u 
   │
   ▼
Authorize Middleware  what u are allowed to do 
   │
   ▼
Controller


 # refresh token  will be read  by controller from cookie not from body 
Frontend

↓

POST /refresh

↓

Browser/Postman

↓

Cookie

↓

Controller

↓

req.cookies.refreshToken

↓

Service

# refresh token rotation pending 

 #  global error managemant  pending 


# email verfication  pending  

# mobile verfication  create an otp table ref migrations 

users
------
phone_verification_tokens
-------------------------
id
user_id
phone
otp_hash
expires_at
attempts
created_at

# flow after OTP 
  BEGIN
    │
    ▼
Create User
    │
    ▼
Assign Citizen Role
    │
    ▼
Generate OTP
    │
    ▼
Hash OTP
    │
    ▼
Save OTP
    │
    ▼
COMMIT
    │
    ▼
Send OTP (SMS service)
    │
    ▼
Return User



 after sucseccfulll 

 Request
   │
   ▼
Validate phone & OTP
   │
   ▼
Find latest OTP
   │
   ▼
OTP exists?
   │
   ├── No → Error
   │
   ▼
Expired?
   │
   ├── Yes → Error
   │
   ▼
Compare OTP
   │
   ├── Wrong
   │      │
   │      ├── attempts + 1
   │      ├── if attempts == 5 → Delete OTP
   │      └── Return Error
   │
   ▼
Correct OTP
   │
   ▼
BEGIN
   │
   ▼
Update users.is_phone_verified
   │
   ▼
Delete OTP
   │
   ▼
COMMIT
   │
   ▼
Success


# forget password using phone otp done 
# reset password using otp

# chnage password pending 



now start the issue service  

✅ Create Issue

⬜ Upload Images (Cloudinary)

⬜ Get My Issues

⬜ Get Issue By Id

⬜ Update Issue

⬜ Delete Issue

⬜ Pagination

⬜ Search

⬜ Officer APIs

⬜ Admin APIs

⬜ Kafka Producer (IssueCreated)

⬜ Kafka Consumer (Notification Service)

create the issues table and other as well 
1. completed the create issue api 
2. now  image uplaod api 







officer module 