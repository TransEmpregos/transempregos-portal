const mongoose = require('mongoose');
const JobSchema = mongoose.Schema({
    name: String
});
const Job = mongoose.model('Job', JobSchema);
export default Job;