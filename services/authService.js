import AsyncStorage from "@react-native-async-storage/async-storage";

const logIn =  async(user) => {
    console.log("User info: ", user);

    const { username, password } = user;
    if(username === "Admin" &&  password == "Admin123"){
        AsyncStorage.setItem("user", JSON.stringify(user));
        return {
            status: "success",
            user: username, 
            message: "You are redirecting to Homepage"
        }
    }
};

const logOut = async() => {
    AsyncStorage.clear();

    return {
        status: "success",
        message: "You are logged out"
    }
};

export default { logIn, logOut };