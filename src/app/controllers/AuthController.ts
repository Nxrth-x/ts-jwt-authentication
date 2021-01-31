import { Request, response, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);

    const { email, password } = req.body;
    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401);
    }

    const token = jwt.sign({ id: user.id }, "password123", { expiresIn: "1d" });

    return res.json({
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  }
}

export default new AuthController();
