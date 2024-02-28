// As per my understanding we are using another async function and not directly executing fn bcoz we need req,res and next
const asyncHandler = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

module.exports = asyncHandler