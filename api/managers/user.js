const Model = require("../models/user");
const uuid = require("uuid").v4;

const Manager = {
  getAll: async (keyword) => {
    let query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
      type: "user",
    };

    let t = await Model.find(query).sort({ createdAt: -1 });
    return t;
  },
  updateName: async (id, newName) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        name: newName,
      },
      {
        new: true,
      }
    );

    return t ? t : false;
  },
  getById: async (id) => {
    let user = await Model.findById(id);
    return user;
  },
  getByEmail: async (email) => {
    const t = await Model.findOne({ email: email });
    return t ? t : false;
  },
  create: async (t) => {
    let user = new Model(t);
    user = await user.save();
    return user ? user : false;
  },
  updatePassword: async (id, obj) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        password: obj.password,
      },
      {
        new: true,
      }
    );
    return t ? t : false;
  },
  updateActiveStatus: async (id, newStatus) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        active: newStatus,
      },
      {
        new: true,
      }
    );

    return t ? t : false;
  },
  setTempPassword: async (email) => {
    const tempPassword = uuid();
    await Model.findOneAndUpdate(
      { email: email },
      {
        tempPassword: tempPassword,
      },
      {
        new: true,
      }
    );

    return tempPassword;
  },
  getByTempPassword: async (token) => {
    return await Model.findOne({ tempPassword: token });
  },
  delete: async (id) => {
    let t = await Model.findByIdAndDelete(id);
    return t ? true : false;
  },
  addFavourite: async (id, data) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        $addToSet: { favourites: data },
      },
      { new: true }
    );
    return t ? t : false;
  },
  removeFavourite: async (id, data) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        $pull: { favourites: data },
      },
      { new: true }
    );

    return t ? t : false;
  },
  updateTags: async (id, tags) => {
    return await Model.findByIdAndUpdate(
      id,
      {
        tags: tags,
      },
      {
        new: true,
      }
    );
  },
  updateLevel: async (id, level) => {
    return await Model.findByIdAndUpdate(
      id,
      {
        level: level,
      },
      {
        new: true,
      }
    );
  },
  addRoadmap: async (id, data) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        $push: { roadmaps: data },
      },
      { new: true }
    );
    return t ? t : false;
  },
  removeRoadmap: async (id, uid) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        $pull: { roadmaps: { id: uid } },
      },
      { new: true }
    );

    return t ? t : false;
  },
  updateRoadmap: async (id, arr) => {
    let t = await Model.findByIdAndUpdate(
      id,
      {
        roadmaps: arr,
      },
      { new: true }
    );

    return t ? t : false;
  },
};

module.exports = Manager;
