import PostModel from '../models/Post.js';
export const sortPopular = async (req, res) => {
  try {
    const posts =  await PostModel.find().sort({ "viewsCount" : "desc"}).populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось отсортировать',
    });
  }
  
}
export const sortNews = async (req, res) => {
  try {
    const posts =  await PostModel.find().sort({ "createdAt" : "desc"}).populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось отсортировать',
    });
  }
  
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags.split(','),
      user: req.userId,
    });
    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать пост',
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ "createdAt" : "desc"}).populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить посты',
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      
    ).populate("user").then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Пост не найден',
          });
        }
        res.json(doc);
      }).catch((error)=> {
        console.log(error);
        return res.status(404).json({
            message: 'Пост не найден',
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить посты',
    });
  }
};
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.findByIdAndRemove({
            _id: postId
        }).then((doc)=> {
            
            if(!doc){
                return res.status(404).json({
                    message: 'Пост не найден',
                  });
            }
            res.json({
                succes: true
            })
        }).catch((error)=> {
            console.log(error);
            res.status(500).json({
              message: 'Не удалось удалить пост',
            });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Не удалось удалить пост',
        });
    }
}
export const update = async (req, res)  => {
    try {
        const postId = req.params.id
        await PostModel.updateOne({
            _id: postId
        },{
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
        }).then(()=> res.json({succes: true})).catch((error) => {
            console.log(error);
            return res.status(500).json({
              message: 'Не удалось обновить статью',
            });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Не удалось обновить статью',
        });
    }
}
export const getLastTags = async(req, res) => {
  try {
    const posts = await PostModel.find().limit(5)
    const tags = posts.map(post => post.tags).flat().slice(0, 5)
    res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Не удалось получить теги',
    });
  }
}