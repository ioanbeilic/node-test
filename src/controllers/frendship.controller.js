import { countUserFrends, getUserFrends } from "../services/frendship.service";

export async function getUserFrendsController(req, res) {
  const id = req.params.id;
  const friends = await getUserFrends(id);

  return res.status(200).send(friends);
}

export async function countUserFrendsController(req, res) {
  const id = req.params.id;
  console.log(req.params);
  const count = await countUserFrends(id);

  console.log(count);

  return res.status(200).send({ count });
}
