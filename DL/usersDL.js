const users = []


export function retriveDb() {
    return new Promise((resolve, reject) => {
        jsonFile.readFile("data/users.json", (err, obj) => {
            if (err) reject(err);
            else {
                users = obj.users;
                resolve();
            }
        });
    })
}

export function updateDb() {
    return jsonFile.writeFile("data/users.json", { users });
}