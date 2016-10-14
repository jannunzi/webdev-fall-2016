(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {username: 'alice', password: 'ewq', _id: 123, first: 'Alice', last: 'Wonderland'},
            {username: 'bob', password: 'ewq', _id: 234, first: 'Bob', last: 'Dylan'},
            {username: 'charlie', password: 'ewq', _id: 345, first: 'Charlie', last: 'Brown'}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById
        };
        return api;

        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }
    }
})();