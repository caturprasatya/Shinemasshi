const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Tvserie {

  static tvseries() {
    return getDatabase().collection('TvSeries')
  }

  static findAll() {
    return this.tvseries().find().toArray()
  }

  static findOne(id) {
    return this.tvseries().findOne({_id: ObjectId(id)})
  }

  static create(data) {
    return this.tvseries().insertOne(data);
  }

  static async update(id, dataUpdate) {
    // create a filter for a movie to update
    const target = { title: await this.findOne(id) }

    // this option instructs the method to create a document if noaw documents match the filter
    // const options = { upsert: true }

    return await this.tvseries().updateOne(target, { $set: dataUpdate })
  }

  static delete(id){
    const target = { _id: ObjectId(id) }
    
    return this.tvseries().deleteOne(target)
  }

}

module.exports = Tvserie