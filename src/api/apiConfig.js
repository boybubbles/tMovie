const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "488f3ed2e42f3035102ba3282a37a8dc",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
