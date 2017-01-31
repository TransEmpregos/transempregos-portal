import { Schema, model, Document, Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { secretKey } from '../config';
import { adminPassword } from '../config';

const saltWorkFactor = 10;
const UserSchema = new Schema({
    userName: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isRecruiter: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, required: true, default: false }
});
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const salt = await genSalt(saltWorkFactor);
        const theHash = await hash(user.password, salt);
        user.password = theHash;
        next();
    } catch (err) {
        return next(err);
    }
});
// tslint:disable-next-line:max-line-length
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
async function loginAsync(user: { userNameOrEmail: string, password: string }) {
    const User = <UserModel>this;
    let dbUser: UserDocument;
    if (user.userNameOrEmail.match(regexEmail)) {
        dbUser = await User.findOne({ email: user.userNameOrEmail });
    } else {
        dbUser = await User.findOne({ userName: user.userNameOrEmail });
    }
    const isMatch = await compare(user.password, dbUser.password);
    if (isMatch) {
        const simpleUser = <UnsafeUser>dbUser.toObject({ versionKey: false });
        delete simpleUser['password'];
        return {
            user: <SafeUser>simpleUser, // TODO: CHECK!! Can we decode the token on the client? Do we want to?
            token: sign(
                {
                    user: simpleUser,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 1 day
                },
                secretKey)
        };
    }
    return null;
};

async function findOneSafe(conditions?: Object) {
    const User = <UserModel>this;
    const user = await User.findOne(conditions);
    if (!user) return null;
    const safeUser = user.toSafe();
    return safeUser;
}

async function seed() {
    const User = <UserModel>this;
    let admin = await User.findOne({ $or: [{ userName: 'admin' }, { email: 'admin@transempregos.com.br' }] });
    if (admin) return;
    log('Creating admin user...');
    admin = new User({
        userName: 'admin',
        email: 'admin@transempregos.com.br',
        password: adminPassword,
        name: 'admin',
        isRecruiter: true,
        isAdmin: true
    });
    await admin.save();
    log('Admin user created.');
}

function toSafe() {
    const self = <UserDocument>this;
    const fullUser = <UnsafeUser>self.toObject();
    const safeUser: SafeUser = { ...fullUser };
    delete (<UnsafeUser>safeUser).password;
    return <Readonly<UnsafeUser>>safeUser;
}
export interface SafeUser {
    userName: string;
    email: string;
    name: string;
    isRecruiter: boolean;
    isAdmin: boolean;
}
interface UnsafeUser extends SafeUser {
    password: string;
}
interface UserDocument extends Document, UnsafeUser {
    toSafe: typeof toSafe;
}
interface UserModel extends Model<UserDocument> {
    loginAsync: typeof loginAsync;
    findOneSafe: typeof findOneSafe;
    seed: typeof seed;
}
UserSchema.statics.loginAsync = loginAsync;
UserSchema.statics.findOneSafe = findOneSafe;
UserSchema.statics.seed = seed;
UserSchema.methods.toSafe = toSafe;
export const User = model<UserDocument, UserModel>('User', UserSchema);