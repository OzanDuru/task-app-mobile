from flask import Flask, jsonify, request #flask web uygulaması başlatmak için, jsonfy python veri tipini json formatına çevirmek için, request ise gelen istekleri işlemek için kullanılır
from models import db, Task #models.py dosyasından db ve Task modelini içe aktarır db -> SQLAlchemy örneği, Task -> veritabanı tablosu

app = Flask(__name__) #Flask uygulaması oluşturur
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db' #Veritabanı bağlantı dizesini ayarlar, proje dizininde tasks.db adlı SQLite veritabanını oluşturur

# Başka örnekler için:

# PostgreSQL: postgresql://user:pass@localhost/dbname

# MySQL: mysql+pymysql://user:pass@localhost/dbname

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False#SQLAlchemy izleme özelliklerini devre dışı bırakır, performansı artırır

db.init_app(app) #Flask uygulaması ile SQLAlchemy veritabanını başlatır

with app.app_context(): #Uygulama bağlamı içinde
    db.create_all() #Veritabanı tablolarını oluşturur


@app.route('/tasks', methods=['GET']) #/tasks endpoint'ine GET isteği yapıldığında
def get_tasks():
    tasks = Task.query.all() #Tüm kayıtları veritabanından alır her elaman bir task nesnesidir
    return jsonify([{
        'id': task.id,
        'title': task.title,
        'completed': task.completed,
        'created_at': task.created_at
    } for task in tasks]), 200 #JSON formatında döner ve HTTP 200 durum kodu ile başarılı olduğunu belirtir


# Yeni bir task oluşturmak için POST endpoint'i
@app.route('/tasks', methods=['POST'])
def create_task():
    # İstek body’sinden JSON verisini alıyoruz
    data = request.get_json()

    # Gönderilen title ile yeni bir Task nesnesi oluşturuyoruz
    new_task = Task(title=data['title'])

    # Bu yeni task'i veritabanı oturumuna ekliyoruz
    db.session.add(new_task)

    # Değişiklikleri veritabanına kaydediyoruz
    db.session.commit()

    # Oluşturulan kaydı JSON olarak geri döndürüyoruz + 201 CREATED
    return jsonify({
        'id': new_task.id,
        'title': new_task.title,
        'created_at': new_task.created_at

    }), 201


# Mevcut bir task'i güncellemek için PUT endpoint'i
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    # Güncellenmek istenen task'i ID'ye göre buluyoruz
    # Eğer yoksa otomatik olarak 404 döndürür
    # task = Task.query.get_or_404(id)
    task = Task.query.get_or_404(id)# task bir  SATIR Task TÜM TABLO

    # Gelen JSON verisini alıyoruz
    data = request.get_json()

    # Eğer title gönderilmişse günceller, gönderilmemişse eski değer kalır
    task.title = data.get('title', task.title) #titile varsa jsonda yoksa eski değeri koru

    # Aynı şekilde completed alanını güncelleriz
    task.completed = data.get('completed', task.completed)

    

    # Yapılan değişiklikleri veritabanına kaydederiz
    db.session.commit()

    # Güncellenmiş task'ı JSON formatında geri döndürürüz
    return jsonify({
        'id': task.id,
        'title': task.title,
        'completed': task.completed,
        'created_at': task.created_at
    }), 200


# Bir task'i silmek için DELETE endpoint'i
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    # Silinecek task'i ID'ye göre buluyoruz
    # Bulunamazsa 404 üretir
    task = Task.query.get_or_404(id)

    # Bu task'i veritabanı oturumundan siliyoruz
    db.session.delete(task)

    # Silme işlemini veritabanına kaydediyoruz
    db.session.commit()

    # Başarılı mesaj döndürüyoruz
    return jsonify({
        'message': 'Task successfully deleted'
    }), 200



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


