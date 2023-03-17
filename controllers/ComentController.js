import CommentModel from "../models/Comment.js"

export const create = async (req, res) => {
    try {
        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
        });
        const comment = await doc.save();
        res.json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Не удалось создать комментарий',
        });
    }
}