import { UserModel } from "./user.model.js";
import { BaseDataLayerFunctions } from "../../utils/BaseDataLayerFunctions.js";

const baseFunctions = BaseDataLayerFunctions(UserModel);

// FIND BY REGEX
async function findUsersByRegex(fullname) {
    const user = await UserModel.find(
        { fullname: { $regex: new RegExp(fullname), $options: "i" } },
        "about fullname profilePicture",
    );
    return user;
}

// FIND BY EMAIL
async function findUserByEmail(email) {
    const user = await UserModel.findOne({ email }, "-password -__v");
    return user;
}

// INSERT IN FOLLOWING
async function insertInFollowing(myID, myFollowerID) {
    const updatedUser = await UserModel.findByIdAndUpdate(
        myID,
        {
            $push: { following: myFollowerID },
        },
        { new: true },
    );
    return updatedUser;
}

// INSERT IN FOLLOWERS
async function insertInFollowers(myID, myFollowerID) {
    const updatedUser = await UserModel.findByIdAndUpdate(
        myFollowerID,
        {
            $push: { followers: myID },
        },
        { new: true },
    );
    return updatedUser;
}

// REMOVE FROM FOLLOWING
async function removeFromFollowing(myID, followingID) {
    const updatedUser = await UserModel.findByIdAndUpdate(
        myID,
        {
            $pull: { following: followingID },
        },
        { new: true },
    );
    return updatedUser;
}

// REMOVE FROM FOLLOWERS
async function removeFromFollowers(myID, followingID) {
    const updatedUser = await UserModel.findByIdAndUpdate(
        followingID,
        {
            $pull: { followers: myID },
        },
        { new: true },
    );
    return updatedUser;
}

export const usersDB = {
    findUserById: baseFunctions.findById,
    updateUser: baseFunctions.updateData,
    insertNewUser: baseFunctions.insertData,
    deleteUser: baseFunctions.deleteData,
    findUserByEmail,
    insertInFollowers,
    insertInFollowing,
    removeFromFollowers,
    removeFromFollowing,
    findUsersByRegex,
};
