# KMADOC

4rd year course work, NaUKMA, Faculty of Computer Sciences, Software Engineering, created by **Sergei Konoshenko**

Cite: ---

### Setup project
* Install Node.js and npm.
* Install MongoDb.
* Clone repository
* Intall requirements for server. In server directory run `npm install`.
* Intall requirements for client. In client directory run `npm install`.
* Create databases in MongoDb and configure server/app/config/db.config.js. Example:
```
HOST: 'localhost',
PORT: 27017,
DB: 'course_work_db',
SHARE_DOCUMENTS_DB: 'course_work_share_documents'
```
* Configure secret word for JWT in sever/app/config/auth.config.js. Example:
```
const secret = 'kma-course-work-secret-key'
export { secret }
```
* To run server write in console npm run dev
* To run client write in console npm start
* Open browser http://localhost:3000/
