import express, { Express, Request, Response } from "express";
import Todo from "../models/todo.model";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
interface JwtPayload {
  id: string;
}

const getuser = async (token: string) => {
  if (!token) {
    return "Access Denied";
  }
  const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  if (!user) {
    return "Invalid Token";
  }

  const userData = await User.findById(user.id).select([
    "-password",
    "-otp",
    "-isVerified",
  ]);

  if (!userData) {
    return "User not found";
  }

  return userData;
};

export async function addTodo(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }
    const user = await getuser(token!);
    if (typeof user === "string") {
      return res.status(401).json({ message: user });
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }
    const todo = new Todo({
      title,
      description,
      userId: user._id,
    }) as any;
    await todo.save();
    user.todos.push(todo);
    await user.save();
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getTodos(req: Request, res: Response) {
  try {
    const token = await req.headers.authorization?.split(" ")[1];
    const user = (await getuser(token!)) as any;
    const todos = await Todo.find({ userId: user._id });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateTodo(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const user = (await getuser(token!)) as any;
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Access Denied" });
    }
    todo.status = true;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const user = (await getuser(token!)) as any;
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Access Denied" });
    }
     await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
