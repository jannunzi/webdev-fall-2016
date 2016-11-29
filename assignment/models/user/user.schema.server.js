module.exports = function() {
    var mongoose = require("mongoose");
    // var WebsiteSchema = require("../website/website.schema.server")();
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        first: String,
        last: String,
        email: String,
        google: {
            id: String,
            token: String,
            email: String
        },
        role: {type: String, default: "STUDENT", enum: ['ADMIN', 'STUDENT', 'FACULTY']},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}]
        // websites: [WebsiteSchema],
    }, {collection: "user"});
    return UserSchema;
};

/*

    var user = {
        username: 'alice',
        websites: [
            {_id: "123", name: 'facebook.com'},
            {_id: "234", name: 'twitter.com'}
        ]
    };

 */