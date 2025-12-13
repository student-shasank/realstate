export const dashboard = (req, res) => {
  res.json({ message: "User Dashboard Access", user: req.user });
};
