(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        // var users = [
        //     {username: 'alice', password: 'ewq', _id: 123, first: 'Alice', last: 'Wonderland'},
        //     {username: 'bob', password: 'ewq', _id: 234, first: 'Bob', last: 'Dylan'},
        //     {username: 'charlie', password: 'ewq', _id: 345, first: 'Charlie', last: 'Brown'}
        // ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findCurrentUser: findCurrentUser,
            createUser: createUser,
            updateUser: updateUser,
            unregisterUser: unregisterUser,
            login: login,
            checkLogin: checkLogin,
            checkAdmin: checkAdmin,
            logout: logout
        };
        return api;

        function logout() {
            return $http.post("/api/logout");
        }

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        function unregisterUser(uid) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            $http.put(url, user);
        }

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }
        
        function findCurrentUser() {
            var url = "/api/user";
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
            // for(var u in users) {
            //     user = users[u];
            //     if(user._id === userId) {
            //         return user;
            //     }
            // }
            // return null;
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
            // for(var u in users) {
            //     user = users[u];
            //     if(    user.username === username
            //         && user.password === password) {
            //         return user;
            //     }
            // }
            // return null;
        }
    }
})();