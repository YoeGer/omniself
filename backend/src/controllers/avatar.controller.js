import { generateAvatarImage } from '../services/avatar.service.js';

export const generateAvatar = async (req, res) => {
  try {
    const { gender, hairType, hairColor } = req.body;

    if (!gender || !hairType || !hairColor) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan parámetros biométricos" 
      });
    }

    const imageUrl = await generateAvatarImage({ gender, hairType, hairColor });

    res.json({
      success: true,
      data: { avatarUrl: imageUrl }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};