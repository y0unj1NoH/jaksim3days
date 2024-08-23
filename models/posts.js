let db;

class Posts {
  static async init(_db) {
    if (db) return;
    try {
      db = _db;
    } catch (e) {
      console.error("db 연결 실패", e);
    }
  }

  static async getAll() {
    return await db.collection("posts").find().sort({ _id: -1 }).toArray();
  }

  static async getOne(id) {
    return await db.collection("posts").findOne({ _id: id });
  }

  static async create(reqBody) {
    return await db.collection("posts").insertOne({
      title: reqBody.title,
      goalDate: reqBody.goalDate,
      createDate: reqBody.createDate,
      detail: reqBody.detail
    });
  }

  static async delete(id) {
    return await db.collection("posts").deleteOne({ _id: id });
  }

  static async update(id, reqBody) {
    return await db.collection("posts").updateOne(
      {
        _id: id
      },
      {
        $set: {
          title: reqBody.title,
          goalDate: reqBody.goalDate,
          createDate: reqBody.createDate,
          detail: reqBody.detail
        }
      }
    );
  }
}

export default Posts;
