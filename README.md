# Not App - Task Management Application

A full-stack task management application with Flask REST API backend and React Native frontend.

<img width="1170" height="2532" alt="IMG_5760" src="https://github.com/user-attachments/assets/ae2e2e9a-3357-4d0d-8236-3269461152ff" />
<img width="1170" height="2532" alt="IMG_5761" src="https://github.com/user-attachments/assets/46ac48ff-c162-49aa-bf20-92ab93ed6e61" />
<img width="1170" height="2532" alt="IMG_5762" src="https://github.com/user-attachments/assets/e5b0bc9e-cba9-468e-9672-5be8a68bd3be" />
<img width="1170" height="2532" alt="IMG_5763" src="https://github.com/user-attachments/assets/63111a0f-cd74-42f3-aa7a-05323135ea57" />


## 📋 Project Overview

This project consists of two main components:
- **Backend**: Flask REST API with SQLite database
- **Frontend**: React Native mobile application (Expo)

## 🛠️ Technologies

### Backend
- **Flask** - Python web framework
- **Flask-SQLAlchemy** - ORM for database operations
- **SQLite** - Database

### Frontend
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Native Gesture Handler** - Swipe gestures
- **Axios** - HTTP client

## 📁 Project Structure

```
not-app-restAPI/
├── not-uygulamasi/          # Flask Backend
│   ├── app.py               # Main Flask application
│   ├── models.py            # Database models
│   ├── instance/
│   │   └── tasks.db         # SQLite database
│   └── venv/                # Python virtual environment
└── not-app/                 # React Native Frontend
    ├── App.js               # Main React component
    ├── package.json         # Node dependencies
    └── assets/              # App assets
```

## 🚀 Getting Started

### Prerequisites

- Python 3.7+ (for backend)
- Node.js 14+ and npm (for frontend)
- Expo CLI (for React Native)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd not-uygulamasi
```

2. Create and activate a virtual environment:
```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5000` or `http://0.0.0.0:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd not-app
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `App.js`:
```javascript
const API_BASE_URL = "http://YOUR_IP_ADDRESS:5000";
```
Replace `YOUR_IP_ADDRESS` with your local IP address (e.g., `192.168.1.1`)

4. Start the Expo development server:
```bash
npm start
# or
expo start
```

5. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## 📡 API Endpoints

### Get All Tasks
```
GET /tasks
```
Returns a list of all tasks.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Task title",
    "completed": false,
    "created_at": "2024-01-01T00:00:00"
  }
]
```

### Create Task
```
POST /tasks
```
Creates a new task.

**Request Body:**
```json
{
  "title": "New task title"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "New task title",
  "created_at": "2024-01-01T00:00:00"
}
```

### Update Task
```
PUT /tasks/<id>
```
Updates an existing task.

**Request Body:**
```json
{
  "title": "Updated title",
  "completed": true
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated title",
  "completed": true,
  "created_at": "2024-01-01T00:00:00"
}
```

### Delete Task
```
DELETE /tasks/<id>
```
Deletes a task.

**Response:**
```json
{
  "message": "Task successfully deleted"
}
```

## 🎯 Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as completed/not completed
- ✅ Swipe to delete tasks
- ✅ Long press to open task options menu
- ✅ Edit task titles
- ✅ Real-time task status display

## 📱 App Usage

1. **Add Task**: Enter a task title in the input field and press "Add"
2. **View Tasks**: All tasks are displayed in a scrollable list
3. **Complete Task**: Long press a task → Select "✅ Done"
4. **Uncomplete Task**: Long press a task → Select "⏳ Not done"
5. **Edit Task**: Long press a task → Select "✏️ Edit" → Modify title → Press "Kaydet"
6. **Delete Task**: Swipe left on a task → Press "Delete"

## 🔧 Configuration

### Backend Configuration

The backend uses SQLite by default. To change the database:

Edit `app.py`:
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
```

For PostgreSQL:
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/dbname'
```

For MySQL:
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user:pass@localhost/dbname'
```

### Frontend Configuration

Update the API base URL in `App.js`:
```javascript
const API_BASE_URL = "http://YOUR_IP_ADDRESS:5000";
```

## 🐛 Troubleshooting

### Backend Issues

- **Port already in use**: Change the port in `app.py`:
  ```python
  app.run(debug=True, host='0.0.0.0', port=5001)
  ```

- **Database errors**: Delete `instance/tasks.db` and restart the server to recreate the database

### Frontend Issues

- **Connection refused**: 
  - Ensure backend is running
  - Check that API_BASE_URL matches your backend IP address
  - Verify both devices are on the same network
  - Check firewall settings

- **Expo issues**: Clear cache and restart:
  ```bash
  expo start -c
  ```

## 📝 License

This project is open source and available for personal use.

## 👤 Author:Ozan Duru

Created as a learning project for full-stack mobile development.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

