import { generateSocialPost } from '../services/social.service.js';

export const createPost = async (req, res) => {
  try {
    const post = await generateSocialPost(req.body);
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al generar el post" });
  }
};