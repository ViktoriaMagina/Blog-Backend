import { body } from "express-validator";

export const registerValidation = [
    body("email", "Неверный email").isEmail(),
    body("password", "Длина пароля меньше 5 символов").isLength({min: 5}),
    body("fullName", "Длина имени меньше 3 символов").isLength({min: 3}),
    body("avatarUrl", "Неверная ссылка").optional().isURL(),
]
export const loginValidation = [
    body("email", "Неверный email").isEmail(),
    body("password", "Длина пароля меньше 5 символов").isLength({min: 5}),
]
export const postCreateValidation = [
    body("title", "Введите заголовок").isLength({min: 3}).isString(),
    body("text", "Введите текст").isLength({min: 1}).isString(),
    body("tags", "Неверный формат тегов").optional().isString(),
]