import express from "express";
import { UserModel } from "../postgres/postgres.js";
import { where } from "sequelize";

export const allWorkers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    console.log(users);
    if (users.length === 0) {
      return res.status(400).json({ message: "No Users Found" });
    }

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export const addWorker = async (req, res) => {
  const { name, email, designation, empId } = req.body;
  try {
    const emp = await UserModel.findOne({ where: { empId } });
    if (emp === null) {
      //if there is no user in the db with this id, then create a new user with id
      await UserModel.create(req.body);
      return res.status(200).json({ message: "User created successfully" });
    }

    return res.status(400).json({ message: "User already exists" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!!");
  }
};

export const updateWorker = async (req, res) => {
  const empId = req.params.empId;
  try {
    const worker = await UserModel.update(req.body, { where: { empId } });
    if (worker[0] == 0) {
      return res.status(404).json({ message: "User doesnt exist!!" });
    }
    return res
      .status(200)
      .json({ message: "User details updated successfully!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteWorker = async (req, res) => {
  const empId = req.params.empId;
  try {
    const worker = await UserModel.findOne({ where: { empId } });

    if (worker === null) {
      return res.status(404).json({ message: "User doesnt exist!!" });
    }

    await worker.destroy();
    return res.status(200).json({ message: "User deleted successfully!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
