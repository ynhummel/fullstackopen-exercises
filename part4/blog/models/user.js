import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, minLength: 3 },
  name: String,
  passwordHash: { type: String },
  blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

export default mongoose.model('User', userSchema)


