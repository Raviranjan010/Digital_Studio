import { siteContent, siteSections } from "../data/siteContent.js";
import { HttpError } from "../utils/httpError.js";

export const getAllContent = (_req, res) => {
  res.json({
    success: true,
    sections: siteSections,
    data: siteContent,
  });
};

export const getSectionContent = (req, res, next) => {
  try {
    const section = req.params.section;
    if (!siteContent[section]) {
      throw new HttpError(404, `No content found for section "${section}".`);
    }

    res.json({
      success: true,
      section,
      data: siteContent[section],
    });
  } catch (error) {
    next(error);
  }
};
