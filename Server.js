const express = require("express");

const app = express();
const PORT = 3000;
app.use(express.json());

let users = [
    {
        id: 1,
        name: "Srikanta",
        email: "srikanta@example.com",
        age: 23
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com",
        age: 24
    }
];

app.get("/", (req, res) => {
    res.json({
        message: "User REST API is running successfully"
    });
});

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

app.post("/api/users", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
        return res.status(400).json({
            message: "Name, email and age are required"
        });
    }

    const newUser = {
        id: users.length > 0
            ? users[users.length - 1].id + 1
            : 1,
        name,
        email,
        age
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

app.put("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, email, age } = req.body;

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.age = age ?? user.age;

    res.json({
        message: "User updated successfully",
        user
    });
});

app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(userIndex, 1);

    res.json({
        message: "User deleted successfully",
        user: deletedUser[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});