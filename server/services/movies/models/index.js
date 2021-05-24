const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Movie {
  
  static movies() {
    return getDatabase().collection('Movies')
  }

  static findAll() {
    return this.movies().find().toArray()
  }

  static findOne(id) {
    return this.movies().findOne({_id: ObjectId(id)})
  }

  static create(data) {
    return this.movies().insertOne(data);
  }

  static update(id, dataUpdate) {
    // create a filter for a movie to update
    const target = { _id: ObjectId(id) }

    // this option instructs the method to create a document if no documents match the filter
    // const options = { upsert: true }

    return this.movies().updateOne(target,{$set: dataUpdate})
  }

  static delete(id){
    const target = { _id: ObjectId(id) }
    return this.movies().deleteOne(target)
  }

}

module.exports = Movie
