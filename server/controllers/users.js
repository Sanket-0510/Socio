import User from "../models/User.js";
//read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(400).json("friend not found");
  }
};
export const addRemoveFriend = async (req, res) => {
  try {
    const { Id, friendId } = req.params;
    const user = await User.findById(Id);
    const friend = await user.friends.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== Id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return {
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath,
          };
        }
      );
    }
    await user.save();
    await friend.save();
    res.status(200).json(formattedFriends)
  } catch (e) {
       res.status(400).json({message:err.message})                  
  }
};
