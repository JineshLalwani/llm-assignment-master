from pymongo import MongoClient

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['file_storage']

# Save file info to MongoDB
def save_file_info(filename, user_id):
    db.files.insert_one({
        'filename': filename,
        'user_id': user_id
    })

# Retrieve files for a user from MongoDB
def get_user_files(user_id):
    return db.files.find({'user_id': user_id})
