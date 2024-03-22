"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
class AuthUser {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    passwordMatches(password) {
        return this.password.value === password.value;
    }
}
exports.AuthUser = AuthUser;
//# sourceMappingURL=AuthUser.js.map